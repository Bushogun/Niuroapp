import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  fromDate: string | null;
  toDate: string | null;
}

const initialState: UIState = {
  fromDate: null,
  toDate: null,
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
  },
});

export const { setFromDate, setToDate } = uiSlice.actions;
export default uiSlice.reducer;
