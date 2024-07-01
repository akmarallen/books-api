import styles from "./BookSearch.module.scss";
import { useState } from "react";
import BookCard from "../BookCard/BookCard";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../redux/books/reducer";

function BookSearch() {
  const [search, setSearch] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const { books, error, status } = useSelector(
    (state: RootState) => state.books
  );

  const handleSearch = () => {
    if (search.trim()) {
      dispatch(getBooks(search));
    }
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
        {books.map(({ id, book }) => (
          <li key={id} className={styles.searchForm__ul__li}>
            <BookCard
              title={book.title}
              authors={book.authors || []}
              description={book.description}
              imageLinks={book.imageLinks}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookSearch;
