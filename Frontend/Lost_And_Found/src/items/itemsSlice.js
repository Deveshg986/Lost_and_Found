import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllItemsAPI, searchItemsAPI, getUserPostsAPI, getPendingItemsAPI } from "./itemsAPI";

// 1. Fetch ALL items once
export const getAllItems = createAsyncThunk(
  "items/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await getAllItemsAPI();
      return res.data.items;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch items");
    }
  }
);

// 2. Search (backend)
export const searchItems = createAsyncThunk(
  "items/search",
  async (filters, thunkAPI) => {
    try {
      const res = await searchItemsAPI(filters);
      return res.data.items;
    } catch (err) {
      return thunkAPI.rejectWithValue("Search failed");
    }
  }
);

// 3. User Posts
export const getUserPosts = createAsyncThunk(
  "items/getUserPosts",
  async (_, thunkAPI) => {
    try {
      const res = await getUserPostsAPI();
      return res.data.items;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch user posts");
    }
  }
);

// 4. Pending items (for staff dashboard)
export const getPendingItems = createAsyncThunk(
  "/items/pending",
  async (_, thunkAPI) => {
    try {
      const res = await getPendingItemsAPI();
      return res?.data?.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
)

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    allItems: [],     // master data
    visibleItems: [], // what UI shows
    loading: false,
    error: null,
  },
  reducers: {
    // local filtering (NO API)
    filterByStatus: (state, action) => {
      const status = action.payload;

      if (!status) {
        state.visibleItems = state.allItems;
      } else {
        state.visibleItems = state.allItems.filter(
          (item) => item.status === status
        );
      }
    },

    // reset to all items
    resetItems: (state) => {
      state.visibleItems = state.allItems;
    },
  },
  
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(getAllItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.loading = false;
        state.allItems = action.payload;
        state.visibleItems = action.payload; // initial display
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SEARCH (overrides visible items ONLY)
      .addCase(searchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.visibleItems = action.payload;
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // USER POSTS (overrides visible items ONLY)
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.visibleItems = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PENDING ITEMS (for staff) (overrides visible items ONLY)
      .addCase(getPendingItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPendingItems.fulfilled, (state, action) => {
        state.loading = false;
        state.visibleItems = action.payload;
      })
      .addCase(getPendingItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { filterByStatus, resetItems } = itemsSlice.actions;
export default itemsSlice.reducer;