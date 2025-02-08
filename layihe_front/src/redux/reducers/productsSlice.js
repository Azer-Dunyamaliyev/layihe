import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// { GET ALL NAME}
export const getCategoryThunk = createAsyncThunk(
  "api/products/name/category",
  async ({ name }) => {
    try {
      const response = await axios.get(`http://localhost:5500/products/${name}`);
      return response.data;
    } catch (error) {
      console.error("Backend error:", error);  
      throw error;
    }
  }
);

// // { GET CATEGORY JACKET}
// export const getCategoryJacketThunk = createAsyncThunk(
//   "category/getCategoryJacket", 
//   async ({ category, subcategory }, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5500/products/category/${category}/subcategory/${subcategory}`
//       );
//       return { category, subcategory, products: response.data };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // { GET NAME}
      .addCase(getCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getCategoryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

    //   // { GET JACKET CATEGORY SUBCATEGORY}
    //   .addCase(getCategoryJacketThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.products = action.payload.products;
    //     state.error = null;
    //   })
    //   .addCase(getCategoryJacketThunk.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getCategoryJacketThunk.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload || "An error occurred";
    //   });
  },
});

export default productsSlice.reducer;
