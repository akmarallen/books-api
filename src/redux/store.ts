import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./books/bookSlice";

export const store = configureStore({
  reducer: {
    books: bookSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
