import React, { useEffect, useState, useContext } from 'react';
import { DVOContext } from '../../contexts/DVOContext';
import './opportunity.scss';

const Opportunity = ({ routeProps, opp }) => {
  // const setOpp = useContext(DVOContext).setState;

  const [oppState, setOppState] = useState(opp);

  useEffect(() => {
    if (oppState.description.length > 259) {
      setOppState({ ...oppState, description: `${opp.description.substring(0, 260)}...` });
    }
  }, []);

  const handleClick = () => {
    routeProps.history.push(`/opportunity/${opp.id}`);
    // setOpp((prevState) => ({
    //   ...prevState,
    //   selectedOpportunity: opp,
    // }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      routeProps.history.push(`/opportunity/${opp.id}`);
      // setOpp((prevState) => ({
      //   ...prevState,
      //   selectedOpportunity: opp,
      // }));
    }
  };
  return (
    <div role="button" tabIndex="0" onClick={handleClick} onKeyPress={handleKeyPress} className="opportunity-wrapper">
      <div className="opportunity">
        <div className="image-container">
          <img src="https://images.unsplash.com/photo-1557660559-42497f78035b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2230&q=80" />
        </div>
        <div className="opportunity-name"><strong>{oppState.name}</strong></div>
        <p className="opportunity-description">{oppState.description}</p>
        <div className="fade" />
      </div>
      <div className="share"><a href="#">Share</a></div>
    </div>
  );
};

export default Opportunity;
