import BookItem from "../bookItem/BookItem";

const Books = ({ onBookDelete, books, yearFiltered }) => {

  const deleteBookHandler = (bookDelete) => {
   
    onBookDelete(bookDelete);
  
  };

  const booksMapped =
    yearFiltered === ""
      ? books.map((book) => (
          <BookItem
          onBookDelete={deleteBookHandler}
            key={book.id}
            title={book.bookTitle}
            author={book.author.authorName}
            pageCount={book.amountPages}
            dateRead={book.date}
          />
        ))
      : books
          .filter(
            (book) => book.date.getFullYear().toString() === yearFiltered
          )
          .map((book) => (
            <BookItem
            onBookDelete={deleteBookHandler}
            key={book.id}
            title={book.bookTitle}
            author={book.author.authorName}
            pageCount={book.amountPages}
            dateRead={book.date}
            />
          ));

  return (
    <div className="books">
      {booksMapped.length === 0 ? (
        <p>No hay lecturas disponibles para el año {yearFiltered}</p>
      ) : (
        booksMapped
      )}
    </div>
  );
};

export default Books;
