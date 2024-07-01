import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./books/bookSlice";

export const store: any = configureStore({
  reducer: {
    books: bookSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
