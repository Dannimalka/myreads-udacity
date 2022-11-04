import React from "react";
import Shelf from "./Shelf";

const Shelves = ({ books, updateShelf }) => {
  const currentlyReading = books.filter(
    (book) => book.shelf === "currentlyReading"
  );
  const wantToRead = books.filter((book) => book.shelf === "wantToRead");
  const read = books.filter((book) => book.shelf === "read");

  return (
    <div>
      <Shelf
        title="Currently Reading"
        bookSection={currentlyReading}
        updateShelf={updateShelf}
      />
      <Shelf
        title="Want to read"
        bookSection={wantToRead}
        updateShelf={updateShelf}
      />
      <Shelf title="Read" bookSection={read} updateShelf={updateShelf} />
    </div>
  );
};

export default Shelves;
