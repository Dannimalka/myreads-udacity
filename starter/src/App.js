import "./App.css";
import { useEffect, useState } from "react";
import Shelves from "./components/Shelves";
import Search from "./components/Search";
import * as BooksAPI from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await BooksAPI.getAll();
      setBooks(response);
    };
    fetchBooks();
  }, []);

  const updateShelf = (book, moveBook) => {
    let newBook = true;
    const updateBook = books.map((eachBook) => {
      if (eachBook.id === book.id) {
        newBook = false;
        return { ...eachBook, shelf: moveBook };
      }
      return eachBook;
    });
    if (newBook) {
      updateBook.push({ ...book, shelf: moveBook });
    }
    setBooks(updateBook);
    BooksAPI.update(book, moveBook);
  };

  const saveData = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf);
    setBooks((oldArray) => {
      return [...oldArray, book];
    });
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <Search updateShelf={updateShelf} saveData={saveData} books={books} />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Shelves books={books} updateShelf={updateShelf} />
          </div>
          <div className="open-search">
            <button onClick={() => setShowSearchpage(!showSearchPage)}>
              Add a book
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
