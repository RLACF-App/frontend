import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
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
    submitted: true,
    loading: true,
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
      return (<div className='formMessage'><Loader type="BallTriangle" color="#7a1501" /></div>);
    }
    return (<div className='formMessage'><p>Form submitted successfully. Thanks for volunteering! We&apos;ll reach out as soon as possible with next steps.</p></div>);
  };


  return (
    <div className="opportunityFormWrapper">
      {formCases()}
    </div>
  );
};

export default OpportunityForm;
