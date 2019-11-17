import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import { Route, withRouter, Switch } from 'react-router-dom';
import Axios from 'axios';
import Feed from './components/Feed/Feed';
import OppInfo from './components/OppInfo/OppInfo';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import Test from './components/Test/Test';
import { startfetching, endfetching, addopportunities, end } from './redux/actions';

function App() {

  const tempState = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startfetching());
    Axios
      .get(`${process.env.REACT_APP_ENDPOINT}/api/opportunities`)
      .then((res) => {
        dispatch(endfetching());
        dispatch(addopportunities(res.data));
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
  }, []);

  const handleLoadMoreClick = () => {
    dispatch(startfetching());
    Axios
      .get(`${process.env.REACT_APP_ENDPOINT}/api/opportunities`, {
        params: {
          length: tempState.opportunities.length,
        },
      })
      .then((res) => {
        if (res.data.length === 0) {
          dispatch(end());
          dispatch(endfetching());
        }
        else {
          dispatch(addopportunities(res.data));
          dispatch(endfetching());
        }
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
  };

  window.onscroll = () => {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;
    if ((offset + 700) >= height && !tempState.fetching && !tempState.end) {
      dispatch(startfetching());
      handleLoadMoreClick();
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <Switch>
          <Route path="/test" component={Test} />
          <Route
            exact
            path="/"
            render={(routeProps) => (
              <Feed
                routeProps={routeProps}
              />
            )}
          />
          <Route
            path="/opportunity/:id"
            render={(routeProps) => (
              <OppInfo
                routeProps={routeProps}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
