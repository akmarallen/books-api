import BookCard from "../BookCard/BookCard";
import styles from "./BookSearch.module.scss";
import { useState } from "react";


interface IVolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    thumbnail?: string;
  };
}

interface Book {
  id: string;
  volumeInfo: IVolumeInfo;
}

function BookSearch() {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.REACT_APP_BOOK_API;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleSearch = async () => {
    try {
      const response = await fetch(`${baseUrl}?q=${query}&key=${apiKey}`);
      const data = await response.json();
      setBooks(data.items);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

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
          onClick={handleSearch}
          className={styles.searchForm__form__button}
        >
          Search
        </button>
      </div>

      {error && <p>{error}</p>}
      <ul className={styles.searchForm__ul}>
        {books.map(({ id, volumeInfo }: Book) => (
          <li key={id} className={styles.searchForm__ul__li}>
            <BookCard
              title={volumeInfo.title}
              authors={volumeInfo.authors || []}
              description={volumeInfo.description}
              imageLinks={
                volumeInfo.imageLinks ? volumeInfo.imageLinks : undefined
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookSearch;
