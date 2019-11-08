import React, { useContext } from "react";
import { DVOContext } from '../../contexts/DVOContext';
import Opportunity from "../Opportunity";

const Opportunities = () => {

  const opportunities = useContext(DVOContext).opportunities.dummyOpportunities;

  return (
    <div className="opportunities">
      <h2>Opportunities</h2>
      {opportunities.map((each) => (
        <Opportunity opp={each} />
      ))}
    </div>
  );
};

export default Opportunities;
