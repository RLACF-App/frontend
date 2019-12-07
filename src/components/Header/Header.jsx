import React from 'react';
import './header.scss';
import logo from '../../assets/images/header-img.png';
import Login from '../Login/Login';

const Header = () => {
  const handleClick = () => {
    document.querySelector('.hamburger1').classList.toggle('change1');
    document.querySelector('.hamburger2').classList.toggle('change2');
    document.querySelector('.hamburger3').classList.toggle('change3');
    document.querySelector('.header').classList.toggle('expandNav');
  };

  return (
    <div className="headerWrapper">
      <div className="header">
        <a href="/">
          <img alt="rlacf logo" src={logo} />
        </a>
        <nav onClick={handleClick} className="hamburger-nav hidden-hamburger-nav">
          <div className="hamburger hamburger1" />
          <div className="hamburger hamburger2" />
          <div className="hamburger hamburger3" />
        </nav>
        <div className="menuitemwrapper">
          <div className="menuitem"><a rel="noopener noreferrer" target="_blank" href="http://www.rlacf.org/">Home</a></div>
          <div className="menuitem"><a rel="noopener noreferrer" target="_blank" href="http://www.rlacf.org/donate/">Donate</a></div>
          <div className="menuitem"><a rel="noopener noreferrer" target="_blank" href="http://www.rlacf.org/who-we-are/">About Us</a></div>
          <div className="menuitem"><a rel="noopener noreferrer" target="_blank" href="http://www.rlacf.org/latest-news/">News</a></div>
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Header;
