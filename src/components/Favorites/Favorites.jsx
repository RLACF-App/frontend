import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Opportunity from '../Opportunity/Opportunity';

const Favorites = ({ routeProps }) => {

  const [opportunities, setOpportunities] = useState([])
  useEffect(() => {
    console.log(axios.defaults.headers.common)

    const requestConfig = {
      headers: {
        Authorization: localStorage.getItem('rlacf-jwt')
      }
    }
    axios
      .get(`${process.env.REACT_APP_ENDPOINT}/api/secure/favorites`, requestConfig)
      .then((response) => {
        console.log(response)
        setOpportunities(response.data.favorites)
      })
  }, []);  
  return (
    <div style={{marginTop: '150px'}}>
      {opportunities.map((each) => (
        <div><Opportunity routeProps={routeProps} opp={each} /></div>
      ))}
    </div>
  );
}
 
export default Favorites;
