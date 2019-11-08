import React, { useContext } from 'react';
import { DVOContext } from '../../contexts/DVOContext';
import dummyOpportunities from '../../assets/dummyData/DummyVolunteer';

const Opportunity = ({ opp }) => {
  const selectedOpportunity = useContext(DVOContext).opportunities.selectedOpportunity

  const setOpp = useContext(DVOContext).setOpportunites;

  const handleClick = () => {
    console.log(selectedOpportunity)
    setOpp((prevState) => ({
      ...prevState,
      selectedOpportunity: opp,
    }));
    // eslint-disable-next-line no-restricted-globals
    history.push('/opportunity')
  };

  return (
    <div onClick={handleClick} className="opportunity">
      <div><strong>Name: {opp.name}</strong></div>
      <div>Description: {opp.description}</div>
    </div>
  );
};

export default Opportunity;
