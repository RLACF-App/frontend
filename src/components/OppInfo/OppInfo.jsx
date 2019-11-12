import React, { useState, useEffect } from 'react';
import './oppinfo.scss';

const OppInfo = ({ routeProps, opp }) => {
  const [currentOpp, setCurrentOpp] = useState(false);

  useEffect(() => {
    opp.forEach((each) => {
      if (each.id === parseInt(routeProps.match.params.id, 10)) {
        setCurrentOpp(each);
      }
    });
  });
  return (
    <div className="oppinfo">
      <div className="image-container">
        <img src="https://images.unsplash.com/photo-1557660559-42497f78035b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2230&q=80" />
      </div>
      <div className="opportunity-name"><h2>{currentOpp.name}</h2></div>
      <p className="opportunity-description">{currentOpp.description}</p>
      <div className="fade" />
      <div className="share"><a href="#">Share</a></div>
    </div>
  );
};

export default OppInfo;
