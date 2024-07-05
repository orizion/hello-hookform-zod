import { configureStore } from "@reduxjs/toolkit";
import { saveCardFormReducer } from "./reducers/card-reducers";

export const store = configureStore({
    reducer: saveCardFormReducer,
  })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch