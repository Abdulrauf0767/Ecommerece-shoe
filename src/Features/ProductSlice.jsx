import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper functions for localStorage
const loadWishlistFromStorage = () => {
  try {
    const serializedWishlist = localStorage.getItem('wishlist');
    return serializedWishlist ? JSON.parse(serializedWishlist) : [];
  } catch (err) {
    console.error("Could not load wishlist from localStorage", err);
    return [];
  }
};

const saveWishlistToStorage = (wishlist) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  } catch (err) {
    console.error("Could not save wishlist to localStorage", err);
  }
};

// Thunks
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

export const searchProducts = createAsyncThunk(
  'product/searchProducts',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    list: [],
    productDetails: null,
    searchResults: [],
    searchQuery: '',
    searchStatus: 'idle',
    wishlist: loadWishlistFromStorage(),
    status: 'idle',
    error: null
  },
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishlist.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.wishlist.push(action.payload);
        saveWishlistToStorage(state.wishlist);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(item => item.id !== action.payload);
      saveWishlistToStorage(state.wishlist);
    },
    clearWishlist: (state) => {
      state.wishlist = [];
      saveWishlistToStorage(state.wishlist);
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
      state.searchStatus = 'idle';
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
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
      })
      .addCase(searchProducts.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.error = action.payload || action.error.message;
        state.searchResults = [];
      });
  }
});

export const { 
  addToWishlist, 
  removeFromWishlist, 
  clearWishlist, 
  clearSearchResults,
  setSearchQuery
} = productSlice.actions;
export default productSlice.reducer;