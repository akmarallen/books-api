import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBooks } from "./reducer";

interface IVolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks: {
    thumbnail: string;
  };
}

export interface IBook {
  id: string;
  volumInfo: IVolumeInfo;
}

interface BookState {
  books: IBook[];
  error: any;
  status: "idle" | "loading" | "succeed" | "failed";
}

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
