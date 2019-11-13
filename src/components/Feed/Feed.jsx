import React from 'react';
import Opportunities from '../Opportunities/Opportunities';

const Feed = ({ routeProps, opp, handleLoadMoreClick, setSelectedOpportunity, fetching, end }) => (
  <div className="feedContainer">
    <Opportunities routeProps={routeProps} opp={opp} handleLoadMoreClick={handleLoadMoreClick} setSelectedOpportunity={setSelectedOpportunity} fetching={fetching} end={end} />
  </div>
);

export default Feed;
