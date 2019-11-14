import React from 'react';
import Opportunities from '../Opportunities/Opportunities';

const Feed = ({ routeProps }) => (
  <div className="feedContainer">
    <Opportunities routeProps={routeProps} />
  </div>
);

export default Feed;
