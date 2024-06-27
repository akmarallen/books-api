import axios from "axios";
import BookCard from "../BookCard/BookCard";
import styles from "./BookSearch.module.scss";
import { useState } from "react";

interface IVolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    thumbnail: string;
  };
}

interface IBook {
  id: string;
  volumeInfo: IVolumeInfo;
}

const apiKey = import.meta.env.local.VITE_APP_BOOK_API;
const baseUrl = import.meta.env.local.VITE_APP_BASE_URL;

function BookSearch() {
  const [search, setSearch] = useState<string>("");
  const [books, setBooks] = useState<IBook[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () =>
    axios
      .get(`${baseUrl}?q=${search}&key=${apiKey}`)
      .then((res) => {
        console.log(apiKey);
        if (res.data.items) {
          setBooks(res.data.items);
        } else {
          setBooks([]);
          setError("No books found. Please try again.");
        }
        console.log("Response:", res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Failed to fetch books. Please try again.");
      });

  return (
    <div className={styles.searchForm}>
      <div className={styles.searchForm__form}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for books"
          className={styles.searchForm__form__input}
        />
        <button
          onClick={handleSearch}
          className={styles.searchForm__form__button}
        >
          Search
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.searchForm__ul}>
        {books.map(({ id, volumeInfo }: IBook) => (
          <li key={id} className={styles.searchForm__ul__li}>
            <BookCard
              title={volumeInfo.title}
              authors={volumeInfo.authors || []}
              description={volumeInfo.description}
              // thumbnail={volumeInfo.imageLinks?.thumbnail}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default BookSearch;
