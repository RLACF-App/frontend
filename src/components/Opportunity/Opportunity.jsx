import React, { useContext } from 'react';
import { DVOContext } from '../../contexts/DVOContext';

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
    <div role="button" tabIndex="0" onClick={handleClick} onKeyPress={handleKeyPress} className="opportunity">
      <div><strong>Name: {opp.name}</strong></div>
      <div>Description: {opp.description}</div>
    </div>
  );
};

export default Opportunity;
