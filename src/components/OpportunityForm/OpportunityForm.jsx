import React, { useState, useRef } from 'react';
import Loader from 'react-loader-spinner';
import Axios from 'axios';
import './opportunityform.scss';
import ReCAPTCHA from 'react-google-recaptcha';

const OpportunityForm = ({ selectedOpp }) => {
  const [formState, setFormState] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    recaptcha: '',
    opportunity: selectedOpp.name,
  });

  const formMessageRef = useRef();


  const [submitState, setSubmitState] = useState({
    submitted: false,
    loading: false,
    success: false,
  });

  const scrollToRef = (ref) => {
    window.scrollTo(0, ref.current.offsetTop - 120);
  };
  const executeScroll = () => {
    scrollToRef(formMessageRef);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.recaptcha.length > 0) {
      setSubmitState({ ...submitState, submitted: true, loading: true });
      Axios
        .post(`${process.env.REACT_APP_ENDPOINT}/api/opportunities/form`, formState)
        .then(() => {
          setSubmitState({ ...submitState, loading: false, success: true });
          setFormState({
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            recaptcha: '',
          });
          executeScroll(formMessageRef);
        })
        .catch((err) => {
          console.log(err); // TODO
        });
    }
  };

  const handleChanges = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const handleRecatchaChange = (e) => {
    setFormState({
      ...formState,
      recaptcha: e,
    });
  };

  const formCases = () => {
    if (!submitState.success) {
      return (
        <div ref={formMessageRef} className="opportunityFormContainer">
          <h2>Sign Up</h2>
          <form className="opportunityForm" onSubmit={handleSubmit}>
            <span>First Name</span>
            <input
              required
              onChange={handleChanges}
              value={formState.firstname}
              type="text"
              name="firstname"
            />
            <span>Last Name</span>
            <input
              required
              onChange={handleChanges}
              value={formState.lastname}
              type="text"
              name="lastname"
            />
            <span>Email</span>
            <input
              required
              onChange={handleChanges}
              value={formState.email}
              type="email"
              name="email"
            />
            <span>Phone</span>
            <input
              required
              onChange={handleChanges}
              value={formState.phone}
              type="phone"
              name="phone"
            />
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              theme="dark"
              onChange={handleRecatchaChange}
            />
            {submitState.loading ? <Loader className="buttonLoader" height="40" type="Oval" color="#7a1501" /> : <button type="submit">Submit</button>}
          </form>
        </div>
      );
    }
    // if (submitState.loading) {
    //   return (<div className='formMessage'><Loader type="BallTriangle" color="#7a1501" /></div>);
    // }
    return (<div ref={formMessageRef} className="formMessage"><p>Form submitted successfully. Thanks for volunteering! We&apos;ll reach out as soon as possible with next steps.</p></div>);
  };


  return (
    <div className="opportunityFormWrapper">
      {formCases()}
    </div>
  );
};

export default OpportunityForm;
