import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Axios from 'axios';
import './oppinfo.scss';

const OppInfo = ({ routeProps, opp, selectedOpportunity }) => {
  const [currentOpp, setCurrentOpp] = useState(false);
  const [clickState, setClickState] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (selectedOpportunity === false) {
      Axios
        .get(`${process.env.REACT_APP_ENDPOINT}/api/opportunities/${routeProps.match.params.id}`)
        .then((res) => {
          setCurrentOpp(res.data);
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
      setCurrentOpp(selectedOpportunity);
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
  };

  const handleMouseLeave = () => {
    setClickState(false);
  };
  return (
    <>
      {fetching ? <div style={{marginTop: "220px"}}><Loader type="BallTriangle" color="#7a1501" /></div> : (
        currentOpp && (
        <div className="oppinfo">
          <div className="image-container">
            <img src={currentOpp.img} alt="" />
          </div>
          <div className="opportunity-name"><h2>{currentOpp.name}</h2></div>
          <p className="opportunity-description">{currentOpp.description}</p>
          <div className="fade" />
          <div className="share">
            <div className="tooltip"><span onMouseOut={handleMouseLeave} onClick={handleShareClick}>Share {clickState ? <span className="tooltiptext">Copied link to clipboard</span> : <span />} </span></div>
          </div>
        </div>
        )
      )
    }
    </>
  );
};

export default OppInfo;
