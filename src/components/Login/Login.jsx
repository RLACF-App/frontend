import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { adduser, addfavorites } from '../../redux/actions';
import './login.scss';

const Login = ({ newUser, setNewUser, closeMenu }) => {

  const dispatch = useDispatch();
  console.log(newUser)
  const [loginState, setLoginState] = useState({
    username: '',
    password: '',
    recaptcha: '123',
  });


  // const [isNewUser, setIsNewUser] = useState(newUser);

  // useEffect(() => {
  //   setIsNewUser(newUser);
  // }, []);

  const handleChanges = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginState.recaptcha.length > 0) {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/api/auth/volunteer/login`, loginState)
        .then((response) => {
          if (!response.data.message === 'login successful') {
            localStorage.clear();
          } else {
            console.log(response.data)
            localStorage.setItem('rlacf-jwt', `JWT ${response.data.token}`);
            axios.defaults.headers.common.Authorization = localStorage.getItem('rlacf-jwt');
            dispatch(adduser(response.data));
            closeMenu();
            const requestConfig = {
              headers: {
                Authorization: localStorage.getItem('rlacf-jwt'),
              },
            };
            axios
              .get(`${process.env.REACT_APP_ENDPOINT}/api/secure/favorites`, requestConfig)
              .then((res) => {
                dispatch(addfavorites(res.data.favorites));
              })
              .catch((err) => {
                console.log(err); // eslint-disable-line
              });
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

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
  }

  return (
    <>
      {!newUser ? (
        <div className="loginContainer">
          <h2>Login</h2>
          <div onClick={() => setNewUser(!newUser)}>New User?</div>
          <form className="loginForm"> 
            Email: <input
              // required
              onChange={handleChanges}
              value={loginState.username}
              type="email"
              name="username"
            />
            Password: <input
              // required
              onChange={handleChanges}
              value={loginState.password}
              type="password"
              name="password"
            />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      ) : (
        <div className="loginContainer">
          <h2>Register</h2>
          <div onClick={() => setNewUser(!newUser)}>Already have an account?</div>
          <form className="loginForm"> 
            Email: <input
              // required
              onChange={handleChanges}
              value={loginState.username}
              type="email"
              name="username"
            />
            Password: <input
              // required
              onChange={handleChanges}
              value={loginState.password}
              type="password"
              name="password"
            />
            Confirm Password: <input
              // required
              onChange={handleChanges}
              value={loginState.password}
              type="password"
              name="password"
            />
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
