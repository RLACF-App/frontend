import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import { Route, withRouter, Switch } from 'react-router-dom';
import Axios from 'axios';
import Feed from './components/Feed/Feed';
import OppInfo from './components/OppInfo/OppInfo';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import {
  startfetching, endfetching, addopportunities, end, addfavorites, adduser, logout,
} from './redux/actions';
import Favorites from './components/Favorites/Favorites';
import Login from './components/Login/Login';
import CTA from './components/CTA/CTA';

function App() {
  const tempState = useSelector((state) => state);
  const shouldShowCTA = useSelector((state) => state.showCTA);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [newUser, setNewUser] = useState(false);

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
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const requestConfig = {
      headers: {
        Authorization: localStorage.getItem('rlacf-jwt'),
      },
    };
    dispatch(startfetching());
    Axios
      .get(`${process.env.REACT_APP_ENDPOINT}/api/secure/favorites`, requestConfig)
      .then((res) => {
        dispatch(addfavorites(res.data.favorites));
        dispatch(endfetching());
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
  }, [dispatch, user]);

  useEffect(() => {
    const token = localStorage.getItem('rlacf-jwt');
    if (!token) {
      dispatch(logout());
      localStorage.clear();
      return;
    }
    const requestConfig = {
      headers: {
        Authorization: localStorage.getItem('rlacf-jwt'),
      },
    };
    Axios
      .get(`${process.env.REACT_APP_ENDPOINT}/api/secure/checkuser`, requestConfig)
      .then((res) => {
        dispatch(adduser(true));
      })
      .catch(() => {
        dispatch(logout());
        localStorage.clear();
      });
  }, [dispatch]);

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
        } else {
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
      <Header setNewUser={setNewUser} />
      <Helmet>
        <title>Volunteer | RLACF</title>
      </Helmet>
      <div className="wrapper">
        {shouldShowCTA && <CTA />}
        <Switch>
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
            path="/login"
            render={(routeProps) => (
              <Login routeProps={routeProps} newUser={newUser} setNewUser={setNewUser} />
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
          <Route
            path="/favorites/"
            render={(routeProps) => (
              <Favorites
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
