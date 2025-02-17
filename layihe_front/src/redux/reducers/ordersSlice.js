import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const successOrderThunk = createAsyncThunk(
  'order/succesOrder',
  async ({ orderData }, { rejectWithValue }) => {
    console.log(orderData);
    
    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        return rejectWithValue("Token bulunamadı.");
      }

      const response = await axios.post('http://localhost:5500/success/orders/', {
        order: orderData, 
      }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);


// Sipariş yaratmaq
export const createOrderThunk = createAsyncThunk(
  'order/createOrder',
  async ({ orderData, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5500/orders', {
        order: orderData,
        userId: userId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);

// Isdifadeci siparişlerini getirmek
export const getUserOrdersThunk = createAsyncThunk(
  "order/getUserOrders",
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      return rejectWithValue("Token bulunamadı.");
    }

    try {
      const response = await axios.get(`http://localhost:5500/orders/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);


// ID'ye göre sipariş getirmek
export const getOrderByIdThunk = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5500/orders/order/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);

// Sipariş veziyyetini güncellemek
export const updateOrderStatusThunk = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5500/orders/order/${orderId}`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);

// Sipariş silmek
export const deleteOrderThunk = createAsyncThunk(
  "order/deleteOrder",
  async (itemId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(`http://localhost:5500/orders/order/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  }
);





export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    orderDetails: null,
    succesOrders: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //POST
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(successOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(successOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.succesOrders.push(action.payload);
      })
      .addCase(successOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //GET
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //GET USERID
      .addCase(getOrderByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //PUT
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(order => order._id === updatedOrder._id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //DELETE
      .addCase(deleteOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(order => order._id !== action.payload.orderId);
      })
      .addCase(deleteOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default ordersSlice.reducer;
