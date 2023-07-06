import { useEffect, useState } from "react";

import NewBook from "../NewBook/NewBook";
import BooksFilter from "../bookFilter/BookFilter";
import Books from "../books/Books";


const Dashboard = () => {

  const [books, setBooks] = useState([]);
  const [yearFiltered, setYearFiltered] = useState("2023");

  useEffect(() => {

      //Send Request GetAll, arrived all books
    fetch("http://localhost:8080/book/getall", {
      headers: {
        Accept: "application/json",
      },
    })
        //response convert to JSON
      .then((response) => response.json())

        //mapping books and set in book list
      .then((bookData) => {
        const booksMapped = bookData.map((book) => ({
          ...book,
          date: new Date(book.date),
        }));
        setBooks(booksMapped);
      })

        // if error, show me
      .catch((error) => console.log(error));

  }, []);

  const handleFilterChange = (year) => {
    setYearFiltered(year);
  };

  const deleteBookHandler = (book) => {

    fetch("http://localhost:8080/book/delete", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
       book
      }),
    })
      .then((response) => {
        if (response.ok) {
          //const newBooksArray = [...books, book];
          //setBooks(newBooksArray);
          alert("Libro borrado correctamente.");
          return response.json();
        }
        else {
          alert("No se pudo borrar el libro.")
        }
      })
  
      .catch((error) => console.log(error));
  };

  const addBookHandler = (book) => {
    const dateString = book.date.toISOString().slice(0, 10);

    fetch("http://localhost:8080/book/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        bookTitle: book.bookTitle,
        author: book.author,
        date: dateString,
        amountPages: parseInt(book.amountPages, 10),
      }),
    })
      .then((response) => {
        if (response.ok) {
          const newBooksArray = [...books, book];
          setBooks(newBooksArray);
          alert("Libro agregado correctamente.");
          return response.json();
        }
        else {
          alert("No se pudo agregar el libro.")
        }
      })
  
      .catch((error) => console.log(error));

  };

  

  return (
    <>
      <h1>Books Champion App!</h1>
      <h3>¡Quiero leer libros!</h3>
      <NewBook onBookAdded={addBookHandler} />
      <BooksFilter
        yearFiltered={yearFiltered}
        onYearChange={handleFilterChange}
      />
      <Books onBookDelete={deleteBookHandler} yearFiltered={yearFiltered} books={books} />
    </>
  );
};

export default Dashboard;
