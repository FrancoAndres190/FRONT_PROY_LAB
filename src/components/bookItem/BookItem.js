import { useState } from "react";

import "./BookItem.css";

import BookCard from "../bookCard/BookCard";
import DateRead from "../dateRead/DateRead";

const BookItem = ({ onBookDelete, title, author, dateRead, pageCount }) => {
  const [bookTitle, setBookTitle] = useState(title);
  //const [bookAuthor, setBookAuthor] = useState("");

  const clickChangeTitleHandler = () => {
    console.log("clicked");
    setBookTitle("Actualizado!");
  };

  const deleteBookHandler = (event) => {
    const bookDelete = {
      bookTitle: title,
      author: {authorName: author},
      date: dateRead,
      amountPages: pageCount,
    };

    onBookDelete(bookDelete);
  
  };

  return (
    <BookCard>
      <h2>{bookTitle}</h2>
      <h3>{author}</h3>
      <DateRead dateRead={dateRead} />
      <p>{pageCount} páginas</p>
      <button onClick={clickChangeTitleHandler}>Cambiar titulo</button>
      <button onClick={deleteBookHandler}>Eliminar libro</button>
    </BookCard>
  );
};

export default BookItem;
