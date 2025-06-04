import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "./apiUtils";

// Async thunks

// GET /api/items
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await apiCall("/item");
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// GET /api/items/:id
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const result = await apiCall(`/item/${productId}`);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST /api/items
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const result = await apiCall("/item", {
        method: "POST",
        body: JSON.stringify(productData),
      });
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT /api/items/:id
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const result = await apiCall(`/item/${productId}`, {
        method: "PUT",
        body: JSON.stringify(productData),
      });
      return { productId, ...result };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// DELETE /api/items/:id
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const result = await apiCall(`/item/${productId}`, {
        method: "DELETE",
      });
      return { productId, ...result };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
};

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    // Get all products
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get product by ID
    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentProduct = null;
      });

    // Add product
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.item) {
          state.products.push(action.payload.item);
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, item } = action.payload;
        const index = state.products.findIndex((p) => p.id === productId);
        if (index !== -1 && item) {
          state.products[index] = item;
        }
        if (
          state.currentProduct &&
          state.currentProduct.id === productId &&
          item
        ) {
          state.currentProduct = item;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const { productId } = action.payload;
        state.products = state.products.filter((p) => p.id !== productId);
        if (state.currentProduct && state.currentProduct.id === productId) {
          state.currentProduct = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
