import React from 'react';
import Opportunities from '../Opportunities/Opportunities';

const Feed = ({ routeProps, opp }) => (
  <div className="feedContainer">
    Welcome to your volunteer feed.
    <Opportunities routeProps={routeProps} opp={opp} />
  </div>
);

export default Feed;
