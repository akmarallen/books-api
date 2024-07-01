import { createSlice } from "@reduxjs/toolkit";
import { getBooks } from "./reducer";
import { BookState } from "src/interfaces";


const initialState: BookState = {
  books: [],
  error: null,
  status: "idle",
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.fulfilled, (state, { payload }) => {
        state.books = payload;
      })

      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getBooks.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "No books.. Please try again..";
      });
  },
});

export default bookSlice;
