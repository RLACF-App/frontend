import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './opportunity.scss';
import { selectOpportunity } from '../../redux/actions';

const Opportunity = ({ routeProps, opp }) => {
  // const setOpp = useContext(DVOContext).setState;
  const dispatch = useDispatch();
  const [oppState, setOppState] = useState(opp);
  const [clickState, setClickState] = useState(false);

  useEffect(() => {
    if (oppState.description.length > 259) {
      setOppState({ ...oppState, shortDescription: `${opp.description.substring(0, 260)}...` });
    }
  }, []);

  const handleClick = () => {
    dispatch(selectOpportunity(oppState));
    routeProps.history.push(`/opportunity/${opp.id}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      dispatch(selectOpportunity(oppState));
      routeProps.history.push(`/opportunity/${opp.id}`);
    }
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const copyUrl = document.createElement('textarea');
    document.body.appendChild(copyUrl);
    copyUrl.value = window.location.href + 'opportunity/' + opp.id;
    copyUrl.select();
    copyUrl.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(copyUrl);
    setClickState(true);
  };

  const handleMouseLeave = () => {
    setClickState(false);
  };
  return (
    <div role="button" tabIndex="0" onClick={handleClick} onKeyPress={handleKeyPress} className="opportunity-wrapper">
      <div className="opportunity">
        <div className="image-container">
          <img src={oppState.img} alt="" />
        </div>
        <div className="opportunity-name"><h2>{oppState.name}</h2></div>
        <p className="opportunity-description">{oppState.shortDescription}</p>
        <div className="fade" />
      </div>
      <div className="share">
        <div className="tooltip"><span onMouseOut={handleMouseLeave} onClick={handleShareClick}>Share {clickState ? <span className="tooltiptext">Copied link to clipboard</span> : <span />} </span></div>
      </div>
    </div>
  );
};

export default Opportunity;
