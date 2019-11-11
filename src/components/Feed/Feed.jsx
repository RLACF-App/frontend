import React from 'react';
import Opportunities from '../Opportunities/Opportunities';

const Feed = ({ routeProps, opp }) => (
  <div className="feedContainer">
    <Opportunities routeProps={routeProps} opp={opp} />
  </div>
);

export default Feed;
