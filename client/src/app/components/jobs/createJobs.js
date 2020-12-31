import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { addJob } from '../../actions/jobs';
import { connect } from 'react-redux';
import Stepper from '../shared/Stepper/Stepper';
import './createJobs.scss';


import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

  const onChange = ({e, value}) => {  };

  return (
    <>
      <div className="stepper-container-vertical" >
        <Stepper steps={ stepArray } direction="vertical" currentStepNumber={ CurrentStep } />
      </div>
      <div>

        <CKEditor
          editor={ ClassicEditor }
          data="<p>Hello from CKEditor 5!</p>"
          onReady={ editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          } }
          onChange={ (event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          } }
          onBlur={ (event, editor) => {
            console.log('Blur.', editor);
          } }
          onFocus={ (event, editor) => {
            console.log('Focus.', editor);
          } }
        />
      
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
  addJob: PropTypes.func.isRequired
};

export default connect(null, { addJob })(CreateJobs)
