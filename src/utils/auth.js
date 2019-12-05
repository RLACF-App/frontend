import axios from 'axios';
import store from './jwt-store';

const auth = () => {

  const setHeader = (token) => {
    // set authorization header for all future axios requests
    axios.defaults.headers.common.authorization = token;
  };

  const logout = () => {
    store.remove();
  };

  const login = async ({ tokenId: token }) => {
    try {
      setHeader(token);
      const { data: { message: authorization } } = await axios
        .post(`${process.env.REACT_APP_ENDPOINT}/api/auth/login`);

      if (authorization !== 'success auth') {
        throw new Error({ message: 'Unsuccessful Authentication' });
      }

      store.add(token);
    } catch (error) {
      logout();
      throw new Error(error);
    }
  };

  const fail = (res) => {
    console.log(res); // eslint-disable-line
  };

  return {
    login,
    logout,
    fail,
  };
};

export default auth;
