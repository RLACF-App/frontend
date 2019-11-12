import React from 'react';
import Opportunities from '../Opportunities/Opportunities';

const Feed = ({ routeProps, opp, handleLoadMoreClick }) => (
  <div className="feedContainer">
    <Opportunities routeProps={routeProps} opp={opp} handleLoadMoreClick={handleLoadMoreClick} />
  </div>
);

export default Feed;
