import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetPortfolioApi } from "../../Api_Requests/Api_Requests";

export const fetchPortfolios = createAsyncThunk("fetch-Portfolio", async () => {
  try {
    const response = await GetPortfolioApi();
    console.log(response.data);
    return response.data.data.payload;
  } catch (error) {
    console.log(error);
  }
  return [];
});

const PortfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPortfolios.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPortfolios.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchPortfolios.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default PortfolioSlice.reducer;
