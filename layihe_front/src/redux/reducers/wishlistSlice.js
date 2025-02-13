import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Favori ürün durumunu almak için
export const wishlistStatus = createAsyncThunk(
  "wishlist/status",
  async ({ productId, selectedColor }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isFavorite = favorites.some(fav => fav.productId === productId && fav.selectedColor === selectedColor);
      return isFavorite;  // Token yoksa localStorage'dan kontrol et
    }

    try {
      const response = await axios.get(`http://localhost:5500/favorites/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { selectedColor }, // selectedColor ile birlikte gönder
      });
      return response.data.isFavorite;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

// Favori eklemek için
export const addFavoriteThunk = createAsyncThunk(
  "favorites/addFavorite",
  async ({ productId, selectedColor }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5500/favorites", 
        { productId, selectedColor },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );
    
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Favori silmek için
export const deleteFavoriteThunk = createAsyncThunk(
  "favorites/deleteFavorite",
  async ({ productId, selectedColor }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(`http://localhost:5500/favorites/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { selectedColor },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Redux slice
export const wishListSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    status: {},  // favori durumları (productId, selectedColor)
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
        const { productId, selectedColor } = action.meta.arg;
        state.status[`${productId}-${selectedColor}`] = action.payload;  // favori durumu key olarak productId ve selectedColor
      })
      .addCase(wishlistStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // { POST } - favori ekleme
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
      // { DELETE } - favori silme
      .addCase(deleteFavoriteThunk.fulfilled, (state, action) => {
        const { productId, selectedColor } = action.payload;
        state.favorites = state.favorites.filter(
          (favorite) => favorite.productId !== productId || favorite.selectedColor !== selectedColor
        );
        state.status[`${productId}-${selectedColor}`] = false;  // Favori silindiğinde status güncelleme
      })
      .addCase(deleteFavoriteThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFavoriteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishListSlice.reducer;
