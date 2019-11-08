import React from 'react';
import Opportunities from '../Opportunities/Opportunities';

const Feed = ({...props}) => {
  return (
    <div className="feedContainer">
      Welcome to your volunteer feed.
      <Opportunities {...props} />
    </div>
  );
};


export default Feed;
