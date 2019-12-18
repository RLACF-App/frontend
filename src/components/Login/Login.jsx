import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { adduser } from '../../redux/actions';
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

  const [submitState, setSubmitState] = useState({
    loading: false,
  });

  const [errors, setErrors] = useState(false);

  const handleRecatchaChange = (e) => {
    setLoginState({
      ...loginState,
      recaptcha: e,
    });
  };

  const checkPasswords = () => {
    if (loginState.password !== loginState.confirmPassword) {
      setErrors("Passwords Don't Match");
    } else {
      setErrors(false);
    }
  };

  const handleChanges = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setSubmitState({ loading: true });
    if (loginState.recaptcha.length > 0) {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/api/auth/volunteer/login`, loginState)
        .then((response) => {
          setLoginState({
            username: '',
            password: '',
            confirmPassword: '',
            recaptcha: '',
          });
          setSubmitState({ loading: false });
          if (!response.data.message === 'login successful') {
            localStorage.clear();
          } else {
            localStorage.setItem('rlacf-jwt', `JWT ${response.data.token}`);
            dispatch(adduser(true));
            routeProps.history.push('/');
          }
        })
        .catch(() => {
          setErrors('Email or Password Incorrect');
          setLoginState({
            username: '',
            password: '',
            confirmPassword: '',
            recaptcha: '',
          });
          setSubmitState({ loading: false });
          recaptchaRef.current.reset();
        });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setSubmitState({ loading: true });
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
          setSubmitState({ loading: false });
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setErrors('Email already in use.');
          } else {
            setErrors('Server error, please try again.');
          }
          setLoginState({
            username: '',
            password: '',
            confirmPassword: '',
            recaptcha: '',
          });
          setSubmitState({ loading: false });
          recaptchaRef.current.reset();
        });
    }
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
          <form onSubmit={handleRegister} className="loginForm">
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
            {submitState.loading ? <Loader className="buttonLoader" height="40" type="Oval" color="#7a1501" /> : <button type="submit">Register</button>}

          </form>
        </div>
      ) : (
        <div className="loginContainer">
          <h2>Login</h2>
          <div onClick={handleRegisterClick}>New User? <span className="login">Register.</span></div>
          <form onSubmit={handleLogin} className="loginForm">
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
            {submitState.loading ? <Loader className="buttonLoader" height="40" type="Oval" color="#7a1501" /> : <button type="submit">Login</button>}
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
