import React, { useState } from "react";
import { search } from "../BooksAPI";
import Book from "./Book";

const Search = ({ updateShelf, saveData, books }) => {
  const [searchValue, setSearchValue] = useState([]);
  const [searchArray, setSearchArray] = useState([]);

  const inputValue = async (event) => {
    let isActive = true;
    const searchText = event.target.value;
    setSearchValue(event.target.value);
    if (searchText.length === 0) {
      setSearchArray([]);
      return;
    }
    const searchBookResult = await search(searchText);
    if (searchBookResult.error) {
      setSearchArray([]);
      return;
    }
    if (searchBookResult instanceof Array) {
      return setSearchArray(
        searchBookResult.map((result) => {
          const existingBook = books.find((book) => book.id === result.id);
          if (existingBook) {
            return { ...result, shelf: existingBook.shelf };
          }

          return result;
        })
      );
    }
    if (isActive) {
      setSearchArray(searchBookResult);
    }
    return setSearchArray([]);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" href="/">
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            value={searchValue}
            onChange={inputValue}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchArray &&
            searchArray.map((eachBook) => (
              <li key={eachBook.id}>
                <Book book={eachBook} updateShelf={updateShelf} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
