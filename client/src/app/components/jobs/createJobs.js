import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { addJob } from '../../actions/jobs';
import { connect } from 'react-redux';
import Stepper from '../shared/Stepper/Stepper';
import './createJobs.scss';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CompanyDetails from './CreateJobs/CompanyDetails';
import JobOverview from './CreateJobs/JobOverview';
import JobDescription from './CreateJobs/JobDescription';
import Preview from './CreateJobs/Preview';
import CompanyLocation from './CreateJobs/CompanyLocation';

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
    jobType: [],
    companyName:'',
    City:'',
    Locality:'',
    WorkingDays:''
  });
  const {
    jobTitle,
    jobDescription,
    experience,
    skills,
    visa,
    language,
    salary,
    country,
    jobCategory,
    jobType,
    companyName,
    city,
    locality,
    workingDays

  } = formData;

  const stepArray = ["Company Details", "Office Location", "Job Overview", "Job Description", "Preview"]

  const [CurrentStep, setCurrentStep] = useState(1)
const nextStep = () => {
  let newStep = CurrentStep;
  newStep++
  setCurrentStep(newStep)
}
const prevStep = () => {
  let newStep = CurrentStep;
  newStep--
  setCurrentStep(newStep)
}

  const handleChange = input => e => {
    setFormData({ [input]: e.target.value });
  }

  return (
    <>
      <div className="stepper-container-vertical" >
        <Stepper steps={ stepArray } direction="vertical" currentStepNumber={ CurrentStep } />
      </div>
      <div className="form-container">
        { CurrentStep === 1 && 
          <CompanyDetails 
            nextStep = {nextStep}
            handleChange={ handleChange }
            currentStepNumber={ CurrentStep } 
            companyName = {companyName}
          /> }
        { CurrentStep === 2 && 
          <CompanyLocation 
            nextStep={ nextStep }
            prevStep = { prevStep}
            handleChange={ handleChange }
            currentStepNumber={ CurrentStep }
            country={ country }
            city = {city}
            locality = {locality}
          /> }
        { CurrentStep === 3 && 
          <JobOverview 
            nextStep = {nextStep}
            prevStep = {prevStep}
            handleChange = {handleChange}
            jobTitle = {jobTitle}
            salary ={salary}
            experience = {experience}
            skills = {skills}
            workingDays = {workingDays}
          /> }
        { CurrentStep === 4 && <JobDescription /> }
        { CurrentStep === 5 && <Preview /> }      
      </div>
    </>

  )
}

CreateJobs.propTypes = {
  addJob: PropTypes.func.isRequired
};

export default connect(null, { addJob })(CreateJobs)
