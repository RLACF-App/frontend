import React from 'react';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { DVOContext } from '../../contexts/DVOContext';
import Opportunity from '../Opportunity/Opportunity';
import './opportunities.scss';

const Opportunities = ({ routeProps }) => {
  const newFetching = useSelector((state) => state.fetching);
  const opportunities = useSelector((state) => state.opportunities);

  return (
    <div className="opportunities">
      <h2>Opportunities</h2>
      {opportunities.map((each) => (
        <Opportunity routeProps={routeProps} opp={each} />
      ))}
      {newFetching ? <div className="loader"><Loader type="BallTriangle" color="#7a1501" /></div> : <span></span>}
    </div>
  );
};

export default Opportunities;
