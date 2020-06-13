import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
    } else {
      setFetching(false);
      dispatch(selectOpportunity(selectedOpp));
    }
  }, [dispatch, selectedOpp, routeProps.history, routeProps.match.params.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const checkIfStandalone = () => {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      return true;
    }
    return false;
  };

  const handleBackClick = () => {
    // routeProps.history.push('/');
    if (routeProps.history.location.state && routeProps.history.location.state.from && routeProps.history.location.state.from === '/') {
      routeProps.history.goBack();
    } else if (routeProps.history.location.state && routeProps.history.location.state.from && routeProps.history.location.state.from === '/favorites') {
      routeProps.history.goBack();
    } else {
      routeProps.history.push('/');
    }
  };
  return (
    <>
      <Helmet>
        <title>{selectedOpp.name} | Volunteer</title>
        <meta name="description" content={selectedOpp.description.substring(0, 260)} />
      </Helmet>
      {fetching ? <div style={{ marginTop: '220px' }}><Loader type="BallTriangle" color="#7a1501" /></div> : (
        selectedOpp && (
        <div className="oppinfo">
          <div className="image-container">
            {checkIfStandalone() && (
            <div className="icon-container">
              <i onClick={handleBackClick} className="back-arrow fas fa-2x fa-times" />
            </div>
            )}
            <img src={selectedOpp.img} alt="" />
          </div>
          <div className="opportunity-name"><h2>{selectedOpp.name}</h2></div>
          <p className="opportunity-description">{selectedOpp.description}</p>
          <div className="fade" />
          <div className="iconcontainer">
            {/* <div className="share">
              <div className="customtooltip"><span onClick={handleSignUpClick}>Sign Up <i class="fas fa-hands-helping"></i></span></div>
            </div> */}
            <div className="share">
              <div className="customtooltip"><span onMouseOut={handleMouseLeave} onClick={handleShareClick}>Share <i className="fas fa-share" />{clickState ? <span className="tooltiptext">Copied link to clipboard</span> : <span />} </span></div>
            </div>
          </div>
          <OpportunityForm selectedOpp={selectedOpp} />
        </div>
        )
      )}
    </>
  );
};

export default OppInfo;
