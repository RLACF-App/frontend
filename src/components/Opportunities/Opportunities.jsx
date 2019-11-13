import React, { useContext } from 'react';
import Loader from 'react-loader-spinner';
import { DVOContext } from '../../contexts/DVOContext';
import Opportunity from '../Opportunity/Opportunity';
import './opportunities.scss';

const Opportunities = ({ routeProps, opp, handleLoadMoreClick, setSelectedOpportunity, fetching, end }) => {
  const opportunities = useContext(DVOContext).state.opportunities;

  return (
    <div className="opportunities">
      <h2>Opportunities</h2>
      {fetching ? <div><Loader type="BallTriangle" color="#7a1501" /></div> : (
        opportunities.map((each) => (
          <Opportunity routeProps={routeProps} opp={each} setSelectedOpportunity={setSelectedOpportunity} />
        ))
      )}
    </div>
  );
};

export default Opportunities;
