import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [loginState, setLoginState] = useState({
    username: '',
    password: '',
    recaptcha: '123',
  });

  const handleChanges = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginState);
    if (loginState.recaptcha.length > 0) {
      const user = axios
        .post(`${process.env.REACT_APP_ENDPOINT}/api/auth/volunteer/login`, loginState)
        .then((response) => {
          if (!response.data.message === 'login successful') {
            localStorage.clear();
          } else {
            localStorage.setItem('rlacf-jwt', `JWT ${response.data.token}`);
            axios.defaults.headers.common.Authorization = localStorage.getItem('rlacf-jwt');
            console.log(axios.defaults.headers.common);
            // axios.defaults.headers.common['Authorization'] = 'test'
          }
          console.log(response);
          setLoginState({
            username: '',
            password: '',
            recaptcha: '123',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(loginState);
    if (loginState.recaptcha.length > 0) {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/api/auth/volunteer/register`, loginState)
        .then(() => {
          setLoginState({
            username: '',
            password: '',
            recaptcha: '123',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <form>
        <input
          // required
          onChange={handleChanges}
          value={loginState.username}
          type="text"
          name="username"
        />
        <input
          // required
          onChange={handleChanges}
          value={loginState.password}
          type="password"
          name="password"
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
        <button onClick={() => localStorage.clear()}>Logout</button>
      </form>
    </div>
  );
};

export default Login;
