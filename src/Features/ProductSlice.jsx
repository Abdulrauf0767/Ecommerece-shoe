import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to load wishlist from localStorage
const loadWishlistFromStorage = () => {
  try {
    const serializedWishlist = localStorage.getItem('wishlist');
    if (serializedWishlist === null) {
      return [];
    }
    return JSON.parse(serializedWishlist);
  } catch (err) {
    console.error("Could not load wishlist from localStorage", err);
    return [];
  }
};

// Helper function to save wishlist to localStorage
const saveWishlistToStorage = (wishlist) => {
  try {
    const serializedWishlist = JSON.stringify(wishlist);
    localStorage.setItem('wishlist', serializedWishlist);
  } catch (err) {
    console.error("Could not save wishlist to localStorage", err);
  }
};

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data.products;
  }
);

export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (id) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    list: [],
    productDetails: null,
    wishlist: loadWishlistFromStorage(), // Initialize from localStorage
    status: 'idle',
    error: null
  },
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishlist.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.wishlist.push(action.payload);
        saveWishlistToStorage(state.wishlist); // Save to localStorage
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(item => item.id !== action.payload);
      saveWishlistToStorage(state.wishlist); // Save to localStorage
    },
    clearWishlist: (state) => {
      state.wishlist = [];
      saveWishlistToStorage(state.wishlist); // Save to localStorage
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = productSlice.actions;
export default productSlice.reducer;