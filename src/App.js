import React from 'react';
import Axios from 'axios';

const convert = require("xml-js");

const apiKey = process.env.REACT_APP_API_KEY;



class App extends React.Component {

  state = {
    books: []
  };


  componentDidMount() {
    //ping our api endpoint
    //update state
    const searchText = "9781250118004";
    const requestUri =
      `https://cors-anywhere.herokuapp.com/` +
      `https://www.goodreads.com/book/isbn/${searchText}?key=${apiKey}`;

    Axios.get(requestUri)
      .then((res) => {
        const data = JSON.parse(
          convert.xml2json(res.data, { compact: true, spaces: 2 })
        );
        console.log(data);
        this.setState({
          books: data.GoodreadsResponse.book
        });
      }, (error) => {
        console.log(error);
      });
  };



  render() {
    //update ui with data
    return (
      <div className="App" >
        <h1>My Book!</h1>
      </div>
    );
  }
}


export default App;
