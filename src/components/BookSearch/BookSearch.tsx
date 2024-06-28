import axios from "axios";
import styles from "./BookSearch.module.scss";
import { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

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

const apiKey = import.meta.env.VITE_APP_BOOK_API;
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

function BookSearch() {
  const [search, setSearch] = useState<string>("");
  const [books, setBooks] = useState<IBook[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios(`${baseUrl}?q=${search}&key=${apiKey}`);
        if (response.data.items) {
          setBooks(response.data.items);
        } else {
          setBooks([]);
          setError("No books found. Please try again.");
        }
        console.log("Response:", response.data.items);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch books. Please try again.");
      }
    };

    if (search.trim()) {
      handleSearch();
    }
  }, [search]);

  return (
    <div className={styles.searchForm}>
      <div className={styles.searchForm__form}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for books"
          className={styles.searchForm__form__input}
        />
        <button
          onClick={() => setSearch(search)}
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
              imageLinks={volumeInfo.imageLinks}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookSearch;
