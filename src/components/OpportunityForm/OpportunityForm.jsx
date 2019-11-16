import React, { useState } from 'react';
import Axios from 'axios';
import './opportunityform.scss';

const OpportunityForm = () => {
  const [formState, setFormState] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
  });

  const [submitState, setSubmitState] = useState({
    submitted: false,
    loading: false,
    success: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitState({ ...submitState, submitted: true, loading: true });
    Axios
      .post(`${process.env.REACT_APP_ENDPOINT}/api/opportunities/form`, formState)
      .then(() => {
        setSubmitState({ ...submitState, loading: false, success: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChanges = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const formCases = () => {
    if (!submitState.submitted && !submitState.loading && !submitState.success) {
      return (
        <div className="opportunityFormContainer">
          <h3>Sign Up</h3>
          <form className="opportunityForm" onSubmit={handleSubmit}>
            First Name:
            <input
              required
              onChange={handleChanges}
              value={formState.firstname}
              type="text"
              name="firstname"
            />
            Last Name:
            <input
              required
              onChange={handleChanges}
              value={formState.lastname}
              type="text"
              name="lastname"
            />
            Email:
            <input
              required
              onChange={handleChanges}
              value={formState.email}
              type="email"
              name="email"
            />
            Phone:
            <input
              required
              onChange={handleChanges}
              value={formState.phone}
              type="phone"
              name="phone"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
    if (submitState.loading) {
      return (<div>Loading</div>);
    }
    return (<div>Success</div>);
  };


  return (
    <div className="opportunityFormWrapper">
      {formCases()}
    </div>
  );
};

export default OpportunityForm;
