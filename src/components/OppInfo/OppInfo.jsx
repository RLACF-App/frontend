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
        <img src={currentOpp.img} />
      </div>
      <div className="opportunity-name"><h2>{currentOpp.name}</h2></div>
      <p className="opportunity-description">{currentOpp.description}</p>
      <div className="fade" />
      <div className="share"><a href="#">Share</a></div>
    </div>
  );
};

export default OppInfo;
