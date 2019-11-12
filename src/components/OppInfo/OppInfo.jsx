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

  const handleShareClick = () => {
    const copyUrl = document.createElement('textarea');
    document.body.appendChild(copyUrl);
    copyUrl.value = window.location.href;
    copyUrl.select();
    document.execCommand('copy');
    document.body.removeChild(copyUrl);
  };
  return (
    <div className="oppinfo">
      <div className="image-container">
        <img src={currentOpp.img} alt="" />
      </div>
      <div className="opportunity-name"><h2>{currentOpp.name}</h2></div>
      <p className="opportunity-description">{currentOpp.description}</p>
      <div className="fade" />
      <div className="share"><span onClick={handleShareClick} href="#">Share</span></div>
    </div>
  );
};

export default OppInfo;
