import React, { useContext } from 'react';
import { DVOContext } from '../../contexts/DVOContext';
import Opportunity from '../Opportunity/Opportunity';

const Opportunities = ({ routeProps, opp }) => {
  const opportunities = useContext(DVOContext).state.opportunities;

  return (
    <div className="opportunities">
      <h2>Opportunities</h2>
      {opportunities.map((each) => (
        <Opportunity routeProps={routeProps} opp={each} />
      ))}
    </div>
  );
};

export default Opportunities;
