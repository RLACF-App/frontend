import React, { useContext } from 'react';
import { DVOContext } from '../../contexts/DVOContext';

const Opportunity = ({...props}) => {
  const selectedOpportunity = useContext(DVOContext).state.opportunities;
  console.log(props)

  const setOpp = useContext(DVOContext).setState;

  const handleClick = () => {
    console.log(selectedOpportunity); //eslint-disable-line
    props.history.push(`/opportunity/${props.opp.id}`)
    setOpp((prevState) => ({
      ...prevState,
      selectedOpportunity: props.opp,
    }));
  };

  return (
    <div onClick={handleClick} className="opportunity">
      <div><strong>Name: {props.opp.name}</strong></div>
      <div>Description: {props.opp.description}</div>
    </div>
  );
};

export default Opportunity;
