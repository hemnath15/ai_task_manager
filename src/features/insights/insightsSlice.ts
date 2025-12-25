import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchInsightsAPI } from "./insightsAPI";

export const fetchInsights = createAsyncThunk(
  "insights/fetch",
  async () => {
    return await fetchInsightsAPI();
  }
);

const insightsSlice = createSlice({
  name: "insights",
  initialState: {
    data: "",
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsights.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.insights;
      })
      .addCase(fetchInsights.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load AI insights";
      });
  },
});

export default insightsSlice.reducer;
