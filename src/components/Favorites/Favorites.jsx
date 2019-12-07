import React from 'react';
import { useSelector } from 'react-redux';
import Opportunity from '../Opportunity/Opportunity';

const Favorites = ({ routeProps }) => {
  const opportunities = useSelector((state) => state.favorites);

  return (
    <div className="opportunities">
      <h2>Favorites</h2>
      {opportunities.map((each) => (
        <Opportunity routeProps={routeProps} opp={each} />
      ))}
    </div>
  );
};

export default Favorites;
