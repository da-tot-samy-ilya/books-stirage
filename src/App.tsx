import React, {useEffect, useState} from 'react';
import BooksStorage from "./components/BooksStorage/BooksStorage";


function App() {
    useEffect(() => {

    }, [])


  return (
    <div className="App">
      <div className="fit_container">
            <BooksStorage/>

      </div>
    </div>
  );
}

export default App;
