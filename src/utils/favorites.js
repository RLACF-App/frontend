import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { addfavorites, removefavorite, showCTA } from '../redux/actions';
import Axios from 'axios';


const requestConfig = {
  headers: {
    Authorization: localStorage.getItem('rlacf-jwt'),
  },
};

const addFavorite = (id) => {
  return Axios
    .post(`${process.env.REACT_APP_ENDPOINT}/api/secure/favorites/addfavorite`, { id }, requestConfig)
    .then((res) => {
      // dispatch(addfavorites([oppState]));
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

const removeFavorite = (e) => {
  console.log(e + "unfavorited");
};


export {
  addFavorite,
  removeFavorite,
};
