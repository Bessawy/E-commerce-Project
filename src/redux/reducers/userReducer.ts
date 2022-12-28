import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "inspector";
import { useAppSelector } from "../../reduxhook/hooks";
import { CreateUserType, UserOptionalType, UserType } from "../../Types/user";

export const userinttialstate: UserType = {
  id: 0,
  name: "Guest",
  role: "customer",
  email: "",
  password: "",
  avatar: ""
};

export const modifyUserData = createAsyncThunk(
  "modifyUserData",
  async (tomodify: UserOptionalType) => {
    try {
      const user = useAppSelector((state) => state.userReducer);
      const userURL = "https://api.escuelajs.co/api/v1/users/" + user.id;
      const response = await axios.put(userURL, tomodify);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (e) {
      throw new Error("Cannot modify user");
    }
  }
);

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
      console.log(e);
      throw new Error("Cannot add new user");
    }
  }
);

export const UserLogin = createAsyncThunk(
  "UserLogin",
  async (user: {email: string, password: string}) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        user
      );
      const data = await response.data
      localStorage.setItem('JWT', data)
      const userResponse = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", 
      {headers:{
        Authorization: `Bearer ${data.access_token}`
      }
      })
      const newUser = await userResponse.data
      return newUser;
    } catch (e) {
      console.log(e);
      throw new Error("Login failed");
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: userinttialstate,
  reducers: {
    logUser: (state, action: PayloadAction<UserType>) => {
      return action.payload
    },
  },
  extraReducers: (build) => {
    build.addCase(modifyUserData.fulfilled, (state, action) => {
      return action.payload;
    });
    build.addCase(createUser.fulfilled, (state, action) => {
      return action.payload;
    });
    build.addCase(UserLogin.fulfilled, (state,action)=>{
      return action.payload
    })
  },
});

const userReducer = userSlice.reducer;
export const { logUser } = userSlice.actions;
export default userReducer;
