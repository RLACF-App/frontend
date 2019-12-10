import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showCTA } from '../../redux/actions';
import './cta.scss';

const CTA = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div onClick={() => dispatch(showCTA(false))} className="CTA-overlay" />
      <div className="CTA-wrapper">
        <i onClick={() => dispatch(showCTA(false))} className="CTA-close fas fa-times fa-2x" />
        <h3>Login or sign up.</h3>
        <p><Link onClick={() => dispatch(showCTA(false))} className="login" to="/login">Log in</Link> or <Link onClick={() => dispatch(showCTA(false))} className="login" to="login">sign up </Link>to save your favorites and to sign up for volunteer opportunities with one click!</p>
      </div>
    </>
  );
};

export default CTA;
