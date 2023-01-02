import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useAppSelector } from "../../reduxhook/hooks";
import { CreateUserType, UserOptionalType, UserType } from "../../Types/user";

export const userinttialstate: UserType = {
  id: 0,
  name: "Guest",
  role: "customer",
  email: "",
  password: "",
  avatar: "",
};

export const createUser = createAsyncThunk(
  "addUser",
  async (user: CreateUserType) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        user
      );
      return response.data;
    } catch (e) {
      throw new Error("Cannot add new user");
    }
  }
);

export const JWTLogin = createAsyncThunk("tokenLogin", async () => {
  const access_token = localStorage.getItem("JWT");
  const userResponse = await axios.get(
    "https://api.escuelajs.co/api/v1/auth/profile",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const newUser = await userResponse.data;
  return newUser;
});

export const UserLogin = createAsyncThunk(
  "UserLogin",
  async (user: { email: string; password: string }, { dispatch }) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        user
      );
      const data = await response.data;
      localStorage.setItem("JWT", data.access_token);
      await dispatch(JWTLogin());
    } catch (e) {
      throw new Error("Login failed");
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: userinttialstate,
  reducers: {
    logUser: (state, action: PayloadAction<UserType>) => {
      return action.payload;
    },
    signOutUser: (state) => {
      localStorage.removeItem("JWT");
      return userinttialstate;
    },
  },
  extraReducers: (build) => {
    build.addCase(createUser.fulfilled, (state, action) => {
      return action.payload;
    });
    build.addCase(JWTLogin.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

const userReducer = userSlice.reducer;
export const { logUser, signOutUser } = userSlice.actions;
export default userReducer;
