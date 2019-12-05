import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Opportunity from '../Opportunity/Opportunity';

const Favorites = ({ routeProps }) => {

  const opportunities = useSelector((state) => state.favorites);

  return (
    <div style={{marginTop: '150px'}}>
      {opportunities.map((each) => (
        <div><Opportunity routeProps={routeProps} opp={each} /></div>
      ))}
    </div>
  );
}
 
export default Favorites;
