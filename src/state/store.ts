import {configureStore} from '@reduxjs/toolkit'
import machineReducer from './machines/machinesSlice'
import uiReducer from "./ui/filterSlice";

export const store = configureStore({
  reducer: {
    machines: machineReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch