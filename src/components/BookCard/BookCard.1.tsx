import React from "react";
import styles from "./BookCard.module.scss";
import { BookCardProps } from "./BookCard";

export const BookCard: React.FC<BookCardProps> = ({
  title,
  authors,
  description,
  imageLinks,
}) => {
  const { thumbnail } = imageLinks;
  return (
    <div className={styles.bookСard}>
      <img src={thumbnail} alt={title} className={styles.bookСard__img} />
      <div className={styles.bookСard__details}>
        <h2>{title}</h2>
        <p>Авторы:</p>
        <span className={styles.bookСard__details__description}>
          {description}
        </span>
        <ul>
          {authors?.map((author, index) => (
            <li key={index}>{author}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
