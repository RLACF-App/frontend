import React, { useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Feed from './components/Feed';

function App() {
  useEffect(() => {
    Axios
      .get(`${process.env.REACT_APP_ENDPOINT}/`)
      .then((res) => {
        console.log(res.data); // eslint-disable-line
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
  }, []);

  return (
    <div className="App">
      <header className="header-wrapper">
        <h1>RLACF App</h1>
        <h5>Coming soon...</h5>
      </header>
      <div className="wrapper">
        <Feed />
      </div>
    </div>
  );
}

export default App;
