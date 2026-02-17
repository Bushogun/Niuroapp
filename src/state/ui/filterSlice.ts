import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  fromDate: string | null;
  toDate: string | null;
  filterNDays: number | null;
}

const initialState: UIState = {
  fromDate: null,
  toDate: null,
  filterNDays: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setFromDate: (state, action: PayloadAction<string>) => {
      state.fromDate = action.payload;
    },
    setToDate: (state, action: PayloadAction<string>) => {
      state.toDate = action.payload;
    },
    setFilterNDays: (state, action: PayloadAction<number | null>) => {
      state.filterNDays = action.payload;
    },
  },
});

export const { setFromDate, setToDate, setFilterNDays } = uiSlice.actions;
export default uiSlice.reducer;
