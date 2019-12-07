import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Opportunity from '../Opportunity/Opportunity';

const Favorites = ({ routeProps }) => {

  const opportunities = useSelector((state) => state.favorites);
  console.log('opportunities', opportunities)

  return (
    <div className="opportunities">
      <h2>Favorites</h2>
      {opportunities.map((each) => (
        <Opportunity routeProps={routeProps} oppState={each} />
      ))}
    </div>
  );
};

export default Favorites;
