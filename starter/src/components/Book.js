import React from "react";

const Book = ({ book, updateShelf }) => {
  const bookURL = book.imageLinks.thumbnail;
  const bookTitle = book.title;
  const bookAuthor = book.authors;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: book.imageLinks
              ? `url(${book.imageLinks.thumbnail})`
              : "",
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={book.shelf}
            onChange={(event) => updateShelf(book, event.target.value)}
          >
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{bookTitle}</div>
      <div className="book-authors">{bookAuthor}</div>
    </div>
  );
};

export default Book;
