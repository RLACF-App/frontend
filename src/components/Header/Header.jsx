import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/images/header-img.png';
import Login from '../Login/Login';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [newUser, setNewUser] = useState(false);

  const user = useSelector((state) => state.user);

  const handleClick = () => {
    document.querySelector('.hamburger1').classList.toggle('change1');
    document.querySelector('.hamburger2').classList.toggle('change2');
    document.querySelector('.hamburger3').classList.toggle('change3');
    document.querySelector('.header').classList.toggle('expandNav');
    document.querySelector('.loginContainer').classList.toggle('hidden');

    if (loginMenuOpen === true) {
      setLoginMenuOpen(false);
      document.querySelector('.header').classList.remove('expandNavToLogin');
    }
  };

  const handleLoginClick = (e) => {
    if (loginMenuOpen === false) {
      setLoginMenuOpen(true);
      document.querySelector('.header').classList.add('expandNavToLogin');
    } 
    if (e.target.classList.contains('signup')) {
      setNewUser(true);
    } else {
      setNewUser(false);
    }
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
          <Link onClick={handleClick} className="menuitem" to="/">Opportunity Feed</Link>
          <div className="menuitem"><a rel="noopener noreferrer" target="_blank" href="http://www.rlacf.org/">RLACF Home</a></div>
          {/* <div className="menuitem"><a rel="noopener noreferrer" target="_blank" href="http://www.rlacf.org/donate/">Donate</a></div>
          <div className="menuitem"><a rel="noopener noreferrer" target="_blank" href="http://www.rlacf.org/who-we-are/">About Us</a></div>
          <div className="menuitem"><a rel="noopener noreferrer" target="_blank" href="http://www.rlacf.org/latest-news/">News</a></div> */}
          {!user ? (
            <>
              <div onClick={handleLoginClick} className="menuitem login">Login</div>
              <div onClick={handleLoginClick} className="menuitem signup">Sign Up</div>
            </>
          ) : (
            <>
              <Link onClick={handleClick} className="menuitem" to="/favorites">Favorites</Link>
              <div className="menuitem" onClick={() => localStorage.clear()}>Logout</div>
            </>
          )}
          <Login newUser={newUser} setNewUser={setNewUser} closeMenu={handleClick} loginMenuOpen={loginMenuOpen} />
        </div>
      </div>
    </div>
  );
};

export default Header;
