import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Convert from 'xml-js';


// SOURCES
// https://www.npmjs.com/package/xml-js
// https://gist.github.com/brentirwin/6b0121d7482b57a7de0fb4623d33929e

const apiKey = process.env.REACT_APP_API_KEY;

const App = ({ isbn }) => {

  const [books, setBooks] = useState([])

  useEffect(() => {
    //ping our api endpoint
    //update state
    const isbn = "9781250118004";
    const requestUri =
      `https://cors-anywhere.herokuapp.com/` +
      `https://www.goodreads.com/book/isbn/${isbn}?key=${apiKey}`;
    Axios.get(requestUri)
      .then((res) => {
        const data = JSON.parse(
          Convert.xml2json(res.data, { compact: true, spaces: 2 })
        );
        console.log(data.GoodreadsResponse.book);
        setBooks(() => [...books, data.GoodreadsResponse.book]);
      }, (error) => {
        console.log(error);
      });

    return () => {
      //just before unmounting
    }

  }, [isbn])


  //update ui with data
  return (
    <article className="book-cont">
      {books.map((book, index) => {
        return (
          <div key={JSON.stringify(book)}>
            <div className="book-img"></div>
            <div className="book-desc">
              <h3 className="bk-title">{book.title._cdata}</h3>
            </div>
            <h4 className="author">By: {book.authors.author.name._text}</h4>
            <span className="bk-desc" dangerouslySetInnerHTML={{ __html: book.description._cdata }} />
            <div className="retailers">
              <ul className="buy-links">
                <li><a className="button" href={"https://www.amazon.com/dp/" + book.isbn._cdata} target="_blank" rel="noopener noreferrer">Amazon</a></li>
                <li><a className="button" href={"http://www.barnesandnoble.com/s/" + book.isbn13._cdata} target="_blank" rel="noopener noreferrer">B&N</a></li>
                <li><a className="button" href={"https://www.booksamillion.com/product/" + book.isbn13._cdata} target="_blank" rel="noopener noreferrer">BAM</a></li>
                <li><a className="button" href={"https://www.indiebound.org/book/" + book.isbn13._cdata} target="_blank" rel="noopener noreferrer">IndieBound</a></li>
                <li><a className="button" href={"https://www.powells.com/book/-" + book.isbn13._cdata} target="_blank" rel="noopener noreferrer">Powells</a></li>
              </ul>
            </div>
          </div>
        );
      })
      }
    </article >
  );
}


export default App;
