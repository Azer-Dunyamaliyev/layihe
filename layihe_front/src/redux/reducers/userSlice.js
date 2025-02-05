import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//{ USER }
export const getUserThunk = createAsyncThunk("api/users", async () => {
  const response = await axios.get("http://localhost:5500/users");
  return response.data;
});

//{ REGISTER }
export const postRegisterThunk = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/users/register",
        userData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

//{ LOGIN }
export const postLoginThunk = createAsyncThunk(
  "api/users/login",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/users/login",
        data
      );
      const { token, username } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

//{ LOGOUT }

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  dispatch(setUser(null));
};

export const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: null,
    users: [],
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      state.token = null;
      state.username = null;
    },
    setUser: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // { USER }
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // { USER REGISTER }
      .addCase(postRegisterThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postRegisterThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(postRegisterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // { USER LOGIN }
      .addCase(postLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.username = action.payload.username;
      })
      .addCase(postLoginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(postLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logoutUser,setUser } = userSlice.actions;
export default userSlice.reducer;
