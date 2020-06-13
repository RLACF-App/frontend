import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { addFavorite } from '../../utils/favorites';
import './opportunity.scss';
import {
  selectOpportunity, addfavorites, removefavorite, showCTA,
} from '../../redux/actions';

const Opportunity = ({ routeProps, oppState }) => {
  const dispatch = useDispatch();
  const [clickState, setClickState] = useState(false);
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);

  const ids = favorites.map((each) => each.id);

  const handleClick = () => {
    dispatch(selectOpportunity(oppState));
    routeProps.history.push({ pathname: `/opportunity/${oppState.id}`, state: { from: routeProps.history.location.pathname } });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      dispatch(selectOpportunity(oppState));
      routeProps.history.push(`/opportunity/${oppState.id}`);
    }
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const copyUrl = document.createElement('textarea');
    document.body.appendChild(copyUrl);
    copyUrl.value = `${window.location.href}opportunity/${oppState.id}`;
    copyUrl.select();
    copyUrl.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(copyUrl);
    setClickState(true);
    if (navigator.share) {
      navigator.share({
        title: oppState.name,
        url: `${window.location.href}opportunity/${oppState.id}`,
      });
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!user) {
      dispatch(showCTA(true));
    } else {
      addFavorite(oppState.id)
        .then(() => {
          dispatch(addfavorites([oppState]));
        })
        .catch((err) => {
          console.log(err); // TODO
        });
    }
  };

  const handleUnfavoriteClick = (e) => {
    e.stopPropagation();
    const requestConfig = {
      headers: {
        Authorization: localStorage.getItem('rlacf-jwt'),
      },
    };
    Axios
      .delete(`${process.env.REACT_APP_ENDPOINT}/api/secure/favorites/removefavorite/${oppState.id}`, requestConfig)
      .then(() => {
        dispatch(removefavorite(oppState));
      })
      .catch((err) => {
        console.log(err); // TODO
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
        <p className="opportunity-description">{oppState.description.substring(0, 260)}...</p>
        <div className="fade" />
      </div>
      <div className="iconcontainer">
        <div className="moreinfo">
          <div>More Info <i className="fas fa-info" /></div>
        </div>
        <div className="share">
          <div className="tooltip">
            <span
              onMouseOut={handleMouseLeave}
              onBlur={handleMouseLeave}
              onClick={handleShareClick}
            >Share
              <i className="fas fa-share" />
              {clickState ? <span className="tooltiptext">Copied link to clipboard</span> : <span />}
            </span>
          </div>
        </div>
        {/* <div className="share">
          <div className="tooltip">
            {ids.includes(oppState.id) ? <span className='favorite-heart' onClick={handleUnfavoriteClick}>Unsave<i className="fas fa-heart" /></span> : <span onClick={handleFavoriteClick}>Save<i className="far fa-heart" /></span>}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Opportunity;
