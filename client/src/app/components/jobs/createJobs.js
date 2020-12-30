import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { addJob } from '../../actions/jobs';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import Stepper from '../shared/Stepper/Stepper';
import './createJobs.scss';

const CreateJobs = ({ addJob, propChange }) => {
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

  const [value, setValue] = useState({value: RichTextEditor.createEmptyValue()})
  const stepArray = ["Company Details", "Office Location", "Job Overview", "Job Description", "Preview"]
  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [CurrentStep, setCurrentStep] = useState('1')
  const handleClick = (type) => {
    let newStep = CurrentStep;
    type === 'next' ? newStep++ :newStep--;
    if(newStep > 0 && newStep <= 5){
      setCurrentStep(newStep);
    }
  }

  const onChange = ({value}) => {
    setValue({ value:value });
    if (propChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      propChange(
        value.toString('html')
      );
    }
  };

  return (
    <>
      <div className="stepper-container-vertical" >
        <Stepper steps={ stepArray } direction="vertical" currentStepNumber={ CurrentStep } />
      </div>
      <div>
        <RichTextEditor value = {value.value} onChange= {() =>onChange(value)}/>
      
      <div className="buttons-container">
        {CurrentStep > 1 && <button onClick={() => handleClick('prevous')}>Previous</button>}
        {CurrentStep < 5 && <button onClick={ () => handleClick('next') }>Next</button>}
          { CurrentStep === 5 && <button onClick={ () => handleClick('next') }>Submit</button> }
      </div>
      </div>
    </>

  )
}

CreateJobs.propTypes = {
  addJob: PropTypes.func.isRequired,
  propChange: PropTypes.func
};

export default connect(null, { addJob })(CreateJobs)
