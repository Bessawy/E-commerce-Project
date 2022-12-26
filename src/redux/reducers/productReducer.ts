import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { modifyProductType, ProductType } from "../../Types/product";

const intialstate: ProductType[] = [];
export const fetchAllProduct = createAsyncThunk("fetchProducts", async () => {
  try {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    const data = await response.data;
    return data;
  } catch (e: any) {
    throw new Error(e.message);
  }
});

export const addProduct = createAsyncThunk(
  "addProduct",
  async (product: ProductType) => {
    try {
      const response: AxiosResponse<ProductType, ProductType> =
        await axios.post("https://api.escuelajs.co/api/v1/products/", product);
      return response.data;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: intialstate,
  reducers: {
    addItems: (state, action) => {
      return action.payload;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    modifyItem: (state, action: PayloadAction<modifyProductType>) => {
      state[action.payload.index] = action.payload.update;
    },
    sortProducts: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.sort((a, b) => a.title.localeCompare(b.title));
      } else if (action.payload === "desc") {
        state.sort((a, b) => b.title.localeCompare(a.title));
      }
    },
  },

  extraReducers: (build) => {
    build.addCase(fetchAllProduct.fulfilled, (state, action) => {
      if (action.payload && "message" in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
    build.addCase(fetchAllProduct.rejected, (state, action) => {
      return state;
    });
    build.addCase(fetchAllProduct.pending, (state, action) => {
      console.log("Data is loading....");
      return state;
    });
    build.addCase(addProduct.fulfilled, (state, action) => {
      if (action.payload) {
        return state.push(action.payload);
      } else {
        return state;
      }
    });
  },
});

const productReducer = productSlice.reducer;
export const { deleteItem } = productSlice.actions;
export default productReducer;
