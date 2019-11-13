import React, { useState, useEffect } from 'react';
import './App.scss';
import { Route, withRouter } from 'react-router-dom';
import Axios from 'axios';
import { DVOContext } from './contexts/DVOContext';
import Feed from './components/Feed/Feed';
// import dummyOpportunities from './assets/dummyData/DummyVolunteer';
import OppInfo from './components/OppInfo/OppInfo';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';

function App() {
  const [state, setState] = useState({
    opportunities: [],
    selectedOpportunity: false,
    fetching: true,
    end: false,
  });

  useEffect(() => {
    setState(() => ({
      ...state, fetching: true,
    }));
    Axios
      .get(`${process.env.REACT_APP_ENDPOINT}/api/opportunities`)
      .then((res) => {
        setState({ opportunities: res.data, fetching: false });
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
  }, []);

  const setSelectedOpportunity = (opp) => {
    setState((prevState) => ({
      ...prevState,
      selectedOpportunity: opp,
    }));
  };

  const handleLoadMoreClick = () => {
    setState(() => ({
      ...state, fetching: true,
    }));
    Axios
      .get(`${process.env.REACT_APP_ENDPOINT}/api/opportunities`, {
        params: {
          length: state.opportunities.length,
        },
      })
      .then((res) => {
        setState((prevState) => ({
          opportunities: [...prevState.opportunities, ...res.data],
          fetching: false,
        }));
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
  };

  window.onscroll = () => {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;
    if (offset >= height && !state.fetching) {
      setState((prevState) => ({
        ...prevState, fetching: true,
      }));
      handleLoadMoreClick();
    }
  };

  return (
    <DVOContext.Provider value={{ state, setState }}>
      <div className="App">
        <Header />
        <div className="wrapper">
          <Route
            exact
            path="/"
            render={(routeProps) => (
              <Feed
                routeProps={routeProps}
                handleLoadMoreClick={handleLoadMoreClick}
                setSelectedOpportunity={setSelectedOpportunity}
                fetching={state.fetching}
                end={state.end}
              />
            )}
          />
          <Route
            path="/opportunity/:id"
            render={(routeProps) => (
              <OppInfo
                routeProps={routeProps}
                opp={state.opportunities}
                selectedOpportunity={state.selectedOpportunity}
              />
            )}
          />
          <Route path="*" component={NotFound} />
        </div>
      </div>
    </DVOContext.Provider>
  );
}

export default withRouter(App);
