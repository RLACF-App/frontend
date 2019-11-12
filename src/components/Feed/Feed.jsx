import React from 'react';
import Opportunities from '../Opportunities/Opportunities';

const Feed = ({ routeProps, opp, handleLoadMoreClick, setSelectedOpportunity }) => (
  <div className="feedContainer">
    <Opportunities routeProps={routeProps} opp={opp} handleLoadMoreClick={handleLoadMoreClick} setSelectedOpportunity={setSelectedOpportunity} />
  </div>
);

export default Feed;
