import React, { useContext } from 'react';
import { DVOContext } from '../../contexts/DVOContext';
import './opportunity.scss';

const Opportunity = ({ routeProps, opp }) => {
  const setOpp = useContext(DVOContext).setState;

  const handleClick = () => {
    routeProps.history.push(`/opportunity/${opp.id}`);
    setOpp((prevState) => ({
      ...prevState,
      selectedOpportunity: opp,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      routeProps.history.push(`/opportunity/${opp.id}`);
      setOpp((prevState) => ({
        ...prevState,
        selectedOpportunity: opp,
      }));
    }
  };
  return (
    <div className="opportunity-wrapper">
      <div role="button" tabIndex="0" onClick={handleClick} onKeyPress={handleKeyPress} className="opportunity">
        <div><strong>{opp.name}</strong></div>
        <p>{opp.description}</p>
        <div className='fade'></div>
      </div>
      {/* <div className="share"><a href="#">Share</a></div> */}
    </div>
  );
};

export default Opportunity;
