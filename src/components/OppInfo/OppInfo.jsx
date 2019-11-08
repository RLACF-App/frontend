import React from 'react';

const OppInfo = (props) => {
  console.log(props.opp)
  return (
    <div className='oppinfo'>
      {props.opp}
    </div>
  );
};

export default OppInfo;
