import React from 'react';
import './header.scss';
import logo from '../../assets/images/header-img.png';

const Header = () => (
  <div className="header">
    <a href="/">
      <img alt="rlacf logo" src={logo} />
    </a>
    <div className="nav-links">
      <a href="/">Home</a>
      <a href="/">Login</a>
      <a href="/">Signup</a>
    </div>
  </div>
);

export default Header;
