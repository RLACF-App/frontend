import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import './opportunity.scss';
import { selectOpportunity, addfavorites, removefavorite } from '../../redux/actions';

const Opportunity = ({ routeProps, opp }) => {
  const dispatch = useDispatch();
  const [oppState, setOppState] = useState(opp);
  const [clickState, setClickState] = useState(false);
  const favorites = useSelector((state) => state.favorites);

  const ids = favorites.map((each) => each.id);


  useEffect(() => {
    if (oppState.description.length > 259) {
      setOppState({ ...oppState, shortDescription: `${opp.description.substring(0, 260)}...` });
    } else {
      setOppState({ ...oppState, shortDescription: opp.description });
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
    copyUrl.value = `${window.location.href}opportunity/${opp.id}`;
    copyUrl.select();
    copyUrl.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(copyUrl);
    setClickState(true);
    if (navigator.share) {
      navigator.share({
        title: opp.name,
        url: window.location.href,
      });
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    console.log('favorited!');
    console.log(oppState.id);
    const requestConfig = {
      headers: {
        Authorization: localStorage.getItem('rlacf-jwt'),
      },
    };
    Axios
      .post(`${process.env.REACT_APP_ENDPOINT}/api/secure/favorites/addfavorite`, { id: oppState.id }, requestConfig)
      .then((res) => {
        dispatch(addfavorites([oppState]));
        console.log(res);
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
  };

  const handleUnfavoriteClick = (e) => {
    e.stopPropagation();
    console.log('unfavorited!');
    console.log(oppState.id);
    const requestConfig = {
      headers: {
        Authorization: localStorage.getItem('rlacf-jwt'),
      },
    };
    Axios
      .delete(`${process.env.REACT_APP_ENDPOINT}/api/secure/favorites/removefavorite/${oppState.id}`, requestConfig)
      .then((res) => {
        dispatch(removefavorite(oppState));
        console.log(res);
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
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
      <div className="iconcontainer">
        <div className="moreinfo">
          <div>More Info <i className="fas fa-info" /></div>
        </div>
        <div className="share">
          <div className="tooltip">
            <span onMouseOut={handleMouseLeave} onClick={handleShareClick}>Share
              <i className="fas fa-share" />
              {clickState ? <span className="tooltiptext">Copied link to clipboard</span> : <span />}
            </span>
          </div>
        </div>
        <div className="share">
          <div className="tooltip">
            {ids.includes(oppState.id) ? <span onClick={handleUnfavoriteClick}>Unsave<i className="fas fa-heart" /></span> : <span onClick={handleFavoriteClick}>Save<i className="far fa-heart" /></span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opportunity;
