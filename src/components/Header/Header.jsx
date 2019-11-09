import React from 'react';
import './header.scss';
import logo from '../../assets/images/header-img.png';

const Header = () => (
  <div className="header">
    <img alt="rlacf logo" src={logo} />
    <div className="nav-links">
      <a href="#">Feed</a>
      <a href="#">Login</a>
      <a href="#">Signup</a>
    </div>
  </div>
);

export default Header;
