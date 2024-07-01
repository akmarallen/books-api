import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_APP_BOOK_API;
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getBooks: any = createAsyncThunk(
  "books/getBooks",
  async (search: string) => {
    const response = await axios.get(`${baseUrl}`, {
      params: {
        search,
      },
    });

    return await response.data?.items;
  }
);
