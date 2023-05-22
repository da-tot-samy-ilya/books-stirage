import React, {useState} from 'react';
import BooksStorage from "./components/BooksStorage/BooksStorage";
import BooksListItem from "./components/BooksList/BooksListItem/BooksListItem";
import {Book} from "./types/Book";

function App() {
  return (
    <div className="App">
      <div className="fit_container">
            <BooksStorage/>

      </div>
    </div>
  );
}

export default App;
