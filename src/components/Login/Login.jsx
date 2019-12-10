import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { adduser, addfavorites, logout } from '../../redux/actions';
import './login.scss';

const Login = ({ routeProps, newUser, setNewUser }) => {

  const recaptchaRef = useRef();

  const dispatch = useDispatch();
  const [loginState, setLoginState] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    recaptcha: '',
  });

  const [errors, setErrors] = useState(false);

  useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  const handleRecatchaChange = (e) => {
    setLoginState({
      ...loginState,
      recaptcha: e,
    });
  };

  const checkPasswords = () => {
    if (loginState.password !== loginState.confirmPassword) {
      setErrors("Passwords Don't Match");
    }
    else {
      setErrors(false)
    }
  }

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
            localStorage.setItem('rlacf-jwt', `JWT ${response.data.token}`);
            axios.defaults.headers.common.Authorization = localStorage.getItem('rlacf-jwt');
            dispatch(adduser(response.data));
            routeProps.history.push('/');
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
                setErrors(err.response.status);
              });
          }
          setLoginState({
            username: '',
            password: '',
            confirmPassword: '',
            recaptcha: '',
          });
        })
        .catch((err) => {
          setErrors('Username or Password Incorrect');
          setLoginState({
            username: '',
            password: '',
            confirmPassword: '',
            recaptcha: '',
          });
          recaptchaRef.current.reset();
        });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (loginState.recaptcha.length > 0 && loginState.password === loginState.confirmPassword) {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/api/auth/volunteer/register`, loginState)
        .then((response) => {
          if (!response.data.message === 'login successful') {
            localStorage.clear();
          } else {
            localStorage.setItem('rlacf-jwt', `JWT ${response.data.token}`);
            dispatch(adduser(response.data));
            routeProps.history.push('/');
          }
          setLoginState({
            username: '',
            password: '',
            confirmPassword: '',
            recaptcha: '',
          });
        })
        .catch((err) => {
          setErrors('Username or Password Incorrect');
          setLoginState({
            username: '',
            password: '',
            confirmPassword: '',
            recaptcha: '',
          });
          recaptchaRef.current.reset();
        });
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.clear();
  };

  const handleRegisterClick = () => {
    setLoginState({
      username: '',
      password: '',
      confirmPassword: '',
      recaptcha: '',
    });
    recaptchaRef.current.reset();
    setNewUser(!newUser);
  };

  return (
    <>
      {newUser === true ? (
        <div className="loginContainer">
          <h2>Register</h2>
          <div onClick={handleRegisterClick}>Already have an account? <span className="login">Login.</span></div>
          <form className="loginForm"> 
            Email: <input
              required
              onChange={handleChanges}
              value={loginState.username}
              type="email"
              name="username"
            />
            Password: <input
              required
              onChange={handleChanges}
              value={loginState.password}
              type="password"
              name="password"
            />
            Confirm Password: <input
              required
              onChange={handleChanges}
              onBlur={checkPasswords}
              value={loginState.confirmPassword}
              type="password"
              name="confirmPassword"
            />
            {errors && <div className="error">{errors}</div>}

            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              theme="dark"
              onChange={handleRecatchaChange}
              ref={recaptchaRef}
            />
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      ) : (
        <div className="loginContainer">
          <h2>Login</h2>
          <div onClick={handleRegisterClick}>New User? <span className="login">Register.</span></div>
          <form className="loginForm"> 
            Email: <input
              required
              onChange={handleChanges}
              value={loginState.username}
              type="email"
              name="username"
            />
            Password: <input
              required
              onChange={handleChanges}
              value={loginState.password}
              type="password"
              name="password"
            />
            {errors && <div className="error">{errors}</div>}
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              theme="dark"
              ref={recaptchaRef}
              onChange={handleRecatchaChange}
            />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
