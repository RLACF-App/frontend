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
      {opportunities.map((each) => (
        <Opportunity routeProps={routeProps} opp={each} setSelectedOpportunity={setSelectedOpportunity} />
      ))}
      {fetching ? <div className="loader"><Loader type="BallTriangle" color="#7a1501" /></div> : <span></span>}
    </div>
  );
};

export default Opportunities;
