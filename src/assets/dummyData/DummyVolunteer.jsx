import React from 'react';

const DummyVolunteer = () => {

  const opportunities = [
    {
      name: 'new opportunity',
      description: 'This is a new opportunity. Come do it.',
    },
  ];
  return (
    <div className="dummyVolunteer">
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

export default DummyVolunteer;
