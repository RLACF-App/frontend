import React, { useContext } from "react";
import { DVOContext } from '../../contexts/DVOContext';

const Opportunities = () => {

  const opportunities = useContext(DVOContext);
  console.log(opportunities)

  return (
    <div className="opportunities">
      <h2>Opportunities</h2>
      {opportunities.map((each) => (
        <>
          <div><strong>Title: {each.name}</strong></div>
          <div>Description: {each.description}</div>
        </>
      ))}
    </div>
  );
};

export default Opportunities;
