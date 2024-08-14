import styles from "./BookSearch.module.scss";
import { useState } from "react";
import { AppDispatch, RootState } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "src/redux/books/reducer";
import { IBook } from "src/interfaces";
import BookCard from "components/BookCard/BookCard";

function BookSearch() {
  const [search, setSearch] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const { books = [], error, status } = useSelector(
    (state: RootState) => state.books
  );

  const handleSearch = () => {
    if (search.trim()) dispatch(getBooks(search));
  };

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
          onClick={handleSearch}
          className={styles.searchForm__form__button}
        >
          Search
        </button>
      </div>
      {status === "loading" && <p>Loading...</p>}
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
