import React, { useContext } from "react";
import { DVOContext } from '../../contexts/DVOContext';
import Opportunity from "../Opportunity";

const Opportunities = ({...props}) => {

  const opportunities = useContext(DVOContext).state.dummyOpportunities;

  return (
    <div className="opportunities">
      <h2>Opportunities</h2>
      {opportunities.map((each) => (
        <Opportunity {...props} opp={each} />
      ))}
    </div>
  );
};

export default Opportunities;
