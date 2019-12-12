import Axios from 'axios';

const getConfig = () => {
  const requestConfig = {
    headers: {
      Authorization: localStorage.getItem('rlacf-jwt'),
    },
  };
  return requestConfig;
};

const addFavorite = (id) => Axios
  .post(`${process.env.REACT_APP_ENDPOINT}/api/secure/favorites/addfavorite`, { id }, getConfig())
  .then((res) => res)
  .catch((err) => {
    console.log(err); // TODO
  });

const removeFavorite = (e) => {
  console.log(`${e}unfavorited`);
};


export {
  addFavorite,
  removeFavorite,
};
