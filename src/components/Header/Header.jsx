import React from 'react';
import './header.scss';
import logo from '../../assets/images/header-img.png';

const Header = () => {
  return (
    <div className='header'>
      <img src={logo}></img>
      <div className='nav-links'>
        <a href='#'>Feed</a>
        <a href='#'>Login</a>
        <a href='#'>Signup</a>
      </div>
    </div>
  );
};

export default Header;
