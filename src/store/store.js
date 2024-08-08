import { configureStore } from "@reduxjs/toolkit";
import PortfolioSlice from "./Slices/PortfolioSlice";

export const store = configureStore({
  reducer: {
    PortfolioState: PortfolioSlice,
  },
});
