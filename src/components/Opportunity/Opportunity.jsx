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
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      routeProps.history.push(`/opportunity/${opp.id}`);
    }
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const copyUrl = document.createElement('textarea');
    document.body.appendChild(copyUrl);
    copyUrl.value = window.location.href + 'opportunity/' + opp.id;
    copyUrl.select();
    document.execCommand('copy');
    document.body.removeChild(copyUrl);
  };
  return (
    <div role="button" tabIndex="0" onClick={handleClick} onKeyPress={handleKeyPress} className="opportunity-wrapper">
      <div className="opportunity">
        <div className="image-container">
          <img src={oppState.img} alt="" />
        </div>
        <div className="opportunity-name"><h2>{oppState.name}</h2></div>
        <p className="opportunity-description">{oppState.description}</p>
        <div className="fade" />
      </div>
      <div className="share"><span onClick={handleShareClick}>Share</span></div>
    </div>
  );
};

export default Opportunity;
