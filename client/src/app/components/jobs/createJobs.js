import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { addJob } from '../../actions/jobs';
import { connect } from 'react-redux';

import Stepper from '../shared/Stepper/Stepper';
import './createJobs.scss';

const CreateJobs = ({ addJob }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    experience: '',
    visa: '',
    skills: [],
    salary: '',
    language: [],
    Country: '',
    jobCategory: [],
    jobType: []
  });
  const {
    jobTitle,
    jobDescription,
    experience,
    skills,
    visa,
    language,
    salary,
    Country,
    jobCategory,
    jobType

  } = formData;

  const stepArray = ["Company Details", "Office Location", "Job Overview", "Job Description", "Preview"]
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [CurrentStep, setCurrentStep] = useState('1')
  const handleClick = (type) => {
    let newStep = CurrentStep;
    type === 'next' ? newStep++ :newStep--;
    if(newStep > 0 && newStep <= 5){
    setCurrentStep(newStep);}
    console.log('hello')
  }

  return (
    <>
      <div className="stepper-container-vertical" >
        <Stepper steps={ stepArray } direction="vertical" currentStepNumber={ CurrentStep } />
      </div>
      <div className="buttons-container">
        <button onClick={() => handleClick('prevous')}>Previous</button>
        <button onClick={ () => handleClick('next') }>Next</button>
      </div>
    </>

  )
}

CreateJobs.propTypes = {
  addJob: PropTypes.func.isRequired,
};

export default connect(null, { addJob })(CreateJobs)
