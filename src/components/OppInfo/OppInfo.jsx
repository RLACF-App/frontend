import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import Axios from 'axios';
import { selectOpportunity } from '../../redux/actions';
import './oppinfo.scss';
import OpportunityForm from '../OpportunityForm/OpportunityForm';

const OppInfo = ({ routeProps }) => {
  const [clickState, setClickState] = useState(false);
  const [fetching, setFetching] = useState(true);
  const selectedOpp = useSelector((state) => state.selectedOpportunity);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedOpp === false) {
      Axios
        .get(`${process.env.REACT_APP_ENDPOINT}/api/opportunities/${routeProps.match.params.id}`)
        .then((res) => {
          dispatch(selectOpportunity(res.data));
          setFetching(false);
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            routeProps.history.push('/notfound');
          }
        });
    }
    else {
      setFetching(false);
      dispatch(selectOpportunity(selectedOpp));
    }
  }, []);

  const handleShareClick = () => {
    const copyUrl = document.createElement('textarea');
    document.body.appendChild(copyUrl);
    copyUrl.value = window.location.href;
    copyUrl.select();
    copyUrl.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(copyUrl);
    setClickState(true);
    if (navigator.share) {
      navigator.share({
        title: selectedOpp.name,
        url: window.location.href,
      });
    }
  };

  const handleMouseLeave = () => {
    setClickState(false);
  };
  return (
    <>
      {fetching ? <div style={{marginTop: "220px"}}><Loader type="BallTriangle" color="#7a1501" /></div> : (
        selectedOpp && (
        <div className="oppinfo">
          <div className="image-container">
            <img src={selectedOpp.img} alt="" />
          </div>
          <div className="opportunity-name"><h2>{selectedOpp.name}</h2></div>
          <p className="opportunity-description">{selectedOpp.description}</p>
          <div className="fade" />
          <div className="share">
            <div className="tooltip"><span onMouseOut={handleMouseLeave} onClick={handleShareClick}>Share {clickState ? <span className="tooltiptext">Copied link to clipboard</span> : <span />} </span></div>
          </div>
          <OpportunityForm />
        </div>
        )
      )
    }
    </>
  );
};

export default OppInfo;
