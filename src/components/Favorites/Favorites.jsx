import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Opportunity from '../Opportunity/Opportunity';

const Favorites = ({ routeProps }) => {
  const opportunities = useSelector((state) => state.favorites);

  useEffect(() => {
    if (routeProps.history.location.state && routeProps.history.location.state.fromNav) {
      window.scroll(0, 0);
      routeProps.history.replace();
    }
  }, [routeProps.history]);

  return (
    <div className="opportunities">
      <h2>Favorites</h2>
      {opportunities.map((each) => (
        <Opportunity key={each.id} routeProps={routeProps} oppState={each} />
      ))}
    </div>
  );
};

export default Favorites;
