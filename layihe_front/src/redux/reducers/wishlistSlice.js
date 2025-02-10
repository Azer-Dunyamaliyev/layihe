import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const wishlistStatus = createAsyncThunk(
  "wishlist/status",
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      return favorites.includes(productId);
    }

    try {
      const response = await axios.get(`http://localhost:5500/favorites/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.isFavorite;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);


// { POST WISHLIST }
export const addFavoriteThunk = createAsyncThunk(
  "favorites/addFavorite",
  async ({ productId }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "http://localhost:5500/favorites", 
          { productId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Token'ı burada gönderiyoruz
            }
          }
        );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// { DELETE WISHLIST}
export const deleteFavoriteThunk = createAsyncThunk(
    "favorites/deleteFavorite",
    async ({ userId, productId }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
  
        const response = await axios.delete(`http://localhost:5500/favorites/delete/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { userId, productId },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const wishListSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    status: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

    .addCase(wishlistStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(wishlistStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status[action.meta.arg] = action.payload;
      })
      .addCase(wishlistStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    // { POST}
      .addCase(addFavoriteThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites.push(action.payload);
      })
      .addCase(addFavoriteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavoriteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // { DELETE }

      .addCase(deleteFavoriteThunk.fulfilled, (state, action) => {
        const { productId } = action.payload;
      
        state.favorites = state.favorites.filter(
          (favorite) => favorite.productId !== productId
        );
      })
      .addCase(deleteFavoriteThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFavoriteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default wishListSlice.reducer;
