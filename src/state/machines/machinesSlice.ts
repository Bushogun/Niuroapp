import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Machine } from "../../interfaces/IMachine";
import data from "../../Data/data.json";
import type { MachineState } from "../../interfaces/IMachineState";

const initialState: MachineState = {
  machines: [],
  loading: false,
  error: null,
};

export const fetchMachines = createAsyncThunk<Machine[]>(
  "machines/fetchMachines",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data.machines as Machine[];
  }
);

const machineSlice = createSlice({
  name: "machines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMachines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMachines.fulfilled, (state, action) => {
        state.loading = false;
        state.machines = action.payload;
      })
      .addCase(fetchMachines.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Error loading machines";
      });
  },
});

export default machineSlice.reducer;