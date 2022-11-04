import React, { useState } from "react";
import { search } from "../BooksAPI";

const Search = ({ updateShelf, saveData }) => {
  const [searchValue, setSearchValue] = useState([]);
  const [searchArray, setSearchArray] = useState([]);

  const inputValue = async (event) => {
    setSearchValue(event.target.value);
    const searchBookResult = await search(event.target.value);
    if (searchBookResult instanceof Array) {
      return setSearchArray(searchBookResult);
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
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: eachBook.imageLinks
                          ? `url(${eachBook.imageLinks.thumbnail})`
                          : "",
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select
                        value={eachBook.shelf}
                        onChange={(event) =>
                          saveData(eachBook, event.target.value)
                        }
                      >
                        <option value="none" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{eachBook.Title}</div>
                  <div className="book-authors">{eachBook.Author}</div>
                </div>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
