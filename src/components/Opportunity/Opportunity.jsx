import React, { useContext } from 'react';
import { DVOContext } from '../../contexts/DVOContext';

const Opportunity = ({ ...props }) => {
  console.log('here', props)
  const selectedOpportunity = useContext(DVOContext).state.opportunities;

  const setOpp = useContext(DVOContext).setState;

  const handleClick = () => {
    props.history.push(`/opportunity/${props.opp.id}`);
    setOpp((prevState) => ({
      ...prevState,
      selectedOpportunity: props.opp,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      props.history.push(`/opportunity/${props.opp.id}`);
      setOpp((prevState) => ({
        ...prevState,
        selectedOpportunity: props.opp,
      }));
    }

  }

  return (
    <div role="button" tabIndex="0" onClick={handleClick} onKeyPress={handleKeyPress} className="opportunity">
      <div><strong>Name: {props.opp.name}</strong></div>
      <div>Description: {props.opp.description}</div>
    </div>
  );
};

export default Opportunity;
