import React, { useContext } from 'react';
import { DVOContext } from '../../contexts/DVOContext';
import Opportunity from '../Opportunity/Opportunity';
import './opportunities.scss';

const Opportunities = ({ routeProps, opp, handleLoadMoreClick, setSelectedOpportunity }) => {
  const opportunities = useContext(DVOContext).state.opportunities;

  return (
    <div className="opportunities">
      <h2>Opportunities</h2>
      {opportunities.map((each) => (
        <Opportunity routeProps={routeProps} opp={each} setSelectedOpportunity={setSelectedOpportunity} />
      ))}
      <div className="button-container">
        <button onClick={handleLoadMoreClick}>Load More</button>
      </div>
    </div>
  );
};

export default Opportunities;
