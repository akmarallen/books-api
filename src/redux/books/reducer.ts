import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_APP_BOOK_API;
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (search: string) => {
    try {
      const response = await axios.get(`${baseUrl}?q=${search}&key=${apiKey}`);
      return await response.data?.items;
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
);
