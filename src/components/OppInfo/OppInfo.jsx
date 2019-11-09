import React, { useState, useEffect } from 'react';

const OppInfo = ({ routeProps, opp }) => {
  const [currentOpp, setCurrentOpp] = useState(false);

  useEffect(() => {
    opp.map((each) => {
      if (each.id === parseInt(routeProps.match.params.id, 10)) {
        setCurrentOpp(each);
      }
    });
  });
  return (
    <div className="oppinfo">
      <div><strong>{currentOpp.name}</strong></div>
      <div>{currentOpp.description}</div>

    </div>
  );
};

export default OppInfo;
