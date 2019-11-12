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
    <div role="button" tabIndex="0" onClick={handleClick} onKeyPress={handleKeyPress} className="opportunity-wrapper">
      <div className="opportunity">
        <div className="opportunity-name"><strong>{opp.name}</strong></div>
        <div className="image-container">
          <img src="https://images.unsplash.com/photo-1557660559-42497f78035b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2230&q=80" />
        </div>
        <p className="opportunity-description">{opp.description}</p>
        <div className="fade" />
      </div>
      <div className="share"><a href="#">Share</a></div>
    </div>
  );
};

export default Opportunity;
