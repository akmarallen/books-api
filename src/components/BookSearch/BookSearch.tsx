import axios from "axios";
import BookCard from "../BookCard/BookCard";
import styles from "./BookSearch.module.scss";
import { useState } from "react";
import { log } from "console";

interface IVolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks: {
    thumbnail: string;
  };
}

interface IBook {
  id: string;
  volumeInfo: IVolumeInfo;
}

function BookSearch() {
  // const [query, setQuery] = useState<string>("");
  // const [books, setBooks] = useState<IBook[]>([]);
  // const [error, setError] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_APP_BOOK_API;

  require("dotenv").config();

  // const apiKey = import.meta.env.VITE_APP_BOOK_API;

  // async function searchBooks(query: string) {
  // const url = `${baseUrl}?q=${encodeURIComponent(query)}&key=${apiKey}`;

  const axios = require("axios").default;
  axios
    .get(baseUrl)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

// const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//   if (event.key === "Enter") {
//     searchBooks(query);
//   }
// };

return (
  <div className={styles.searchForm}>
    <div className={styles.searchForm__form}>
      <input
        type="text"
        value={query}
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
        className={styles.searchForm__form__input}
      />
      <button
        onClick={() => searchBooks(query)}
        className={styles.searchForm__form__button}
      >
        Search
      </button>
    </div>
    {error && <p>{error}</p>} {}
    <ul className={styles.searchForm__ul}>
      {books.map(({ id, volumeInfo }: IBook) => (
        <li key={id} className={styles.searchForm__ul__li}>
          <BookCard
            title={volumeInfo.title}
            authors={volumeInfo.authors || []}
            description={volumeInfo.description}
            // imageLinks={volumeInfo.imageLinks?.thumbnail}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default BookSearch;
