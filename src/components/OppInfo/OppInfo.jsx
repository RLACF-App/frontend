import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const OppInfo = (props) => {

  const [currentOpp, setCurrentOpp] = useState(false)

  useEffect(() => {
    console.log('mounted', props.match.params.id);
    const opportunity = props.opp.map((each) => {
      console.log('here', each);
      if (each.id === parseInt(props.match.params.id)) {
        console.log('match');
        setCurrentOpp(each)
      }
    });
  });
  console.log(props.opp)
  return (
    <div className='oppinfo'>
      <div><strong>{currentOpp.name}</strong></div>
      <div>{currentOpp.description}</div>

    </div>
  );
};

export default OppInfo;
