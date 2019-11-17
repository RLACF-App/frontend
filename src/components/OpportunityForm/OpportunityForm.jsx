import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import Axios from 'axios';
import './opportunityform.scss';
import { Form, Button } from 'react-bootstrap';

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
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                onChange={handleChanges}
                value={formState.firstname}
                name="firstname"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={handleChanges}
                value={formState.lastname}
                name="lastname"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={handleChanges}
                value={formState.email}
                name="email"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="phone"
                placeholder="Phone"
                onChange={handleChanges}
                value={formState.phone}
                name="phone"
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
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
