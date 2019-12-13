import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../redux/actions';
import auth from '../../utils/auth';
import './header.scss';
import logo from '../../assets/images/header-img.png';

const Header = ({ setNewUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
    document.querySelector('.hamburger1').classList.toggle('change1');
    document.querySelector('.hamburger2').classList.toggle('change2');
    document.querySelector('.hamburger3').classList.toggle('change3');
    document.querySelector('.header').classList.toggle('expandNav');
    // document.querySelector('.loginContainer').classList.toggle('hidden');

    if (loginMenuOpen === true) {
      setLoginMenuOpen(false);
      document.querySelector('.header').classList.remove('expandNavToLogin');
    }
  };

  const handleLoginClick = (e) => {
    if (loginMenuOpen === false) {
      setLoginMenuOpen(true);
      // document.querySelector('.header').classList.add('expandNavToLogin');
    }
    if (e.target.classList.contains('signup')) {
      setNewUser(true);
    } else {
      setNewUser(false);
    }
    history.push('/login');
    handleClick();
  };

  const handleLogout = () => {
    auth().logout();
    dispatch(logout());
    handleClick();
  };

  const returnLocationState = () => {
    return history.location.pathname === '/favorites' ? '' : { fromNav: true };
  };

  return (
    <>
      {menuOpen && <div onClick={handleClick} className="blurwrapper" />}
      <div className="headerWrapper">
        <div className="header">
          <a href="/">
            <img tabIndex="-1" alt="rlacf logo" src={logo} />
          </a>
          <nav onClick={handleClick} className="hamburger-nav hidden-hamburger-nav">
            <div className="hamburger hamburger1" />
            <div className="hamburger hamburger2" />
            <div className="hamburger hamburger3" />
          </nav>
          <div className="menuitemwrapper">
            <Link tabIndex="-1" onClick={handleClick} className="menuitem" to="/">Opportunity Feed</Link>
            <a tabIndex="-1" className="menuitem" rel="noopener noreferrer" target="_blank" href="http://www.rlacf.org/">RLACF Home</a>
            {/* <div className="menuitem"><a rel="noopener noreferrer" target="_blank" href="http://www.rlacf.org/donate/">Donate</a></div>
            <div className="menuitem"><a rel="noopener noreferrer" target="_blank" href="http://www.rlacf.org/who-we-are/">About Us</a></div>
            <div className="menuitem"><a rel="noopener noreferrer" target="_blank" href="http://www.rlacf.org/latest-news/">News</a></div> */}
            {!user ? (
              <>
                <Link tabIndex="-1" onClick={handleLoginClick} to="/login" className="menuitem login">Login</Link>
                <Link tabIndex="-1" onClick={handleLoginClick} to="/login" className="menuitem signup">Sign Up</Link>
              </>
            ) : (
              <>
                <Link tabIndex="-1" onClick={handleClick} className="menuitem" to={{ pathname: '/favorites', state: returnLocationState() }}>Favorites</Link>
                <Link tabIndex="-1" className="menuitem" onClick={handleLogout} to="/">Logout</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
