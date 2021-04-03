import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import { addJob } from '../../actions/jobs';
import { connect } from 'react-redux';
import Stepper from '../shared/Stepper/Stepper';
import './createJobs.scss';

import CompanyDetails from './CreateJobs/CompanyDetails';
import JobOverview from './CreateJobs/JobOverview';
import JobDescription from './CreateJobs/JobDescription'
import Preview from './CreateJobs/Preview';
import CompanyLocation from './CreateJobs/CompanyLocation';
import RolesAndResponsibility from './CreateJobs/RolesAndResponsibility';
import BenefitsAndPerks from './CreateJobs/BenefitsAndPerks';




// const CreateJobs = ({ addJob }) => {
//   const [formData, setFormData] = useState({
//     jobTitle: '',
//     jobDescription: '',
//     experience: '',
//     visa: '',
//     skills: [],
//     salary: '',
//     language: [],
//     Country: '',
//     jobCategory: [],
//     jobType: [],
//     companyName:'',
//     City:'',
//     Locality:'',
//     WorkingDays:'',
//     companyWebsite:'',
//     companySize:'',
//     about:'',
//     industry:''
//   });
//   // const [jobTitle, setjobTitle] = useState('')
//   // const [jobDescription, setjobDescription] = useState('')
//   // const [experience, setexperience] = useState('')
//   //   const [visa, setvisa] = useState('')
//   // const [skills, setskills] = useState([])
//   //   const [salary, setsalary] = useState('')
//   // const [language, setlanguage] = useState([])
//   // const [country, setcountry] = useState('')
//   // const [jobCategory, setjobCategory] = useState([])
//   // const [jobType, setjobType] = useState([])
//   // const [companyName, setcompanyName] = useState('')
//   // const [city, setcity] = useState('')
//   // const [locality, setlocality] = useState('')
//   // const [workingDays, setworkingDays] = useState('')
//   // const [companyWebsite, setcompanyWebsite] = useState('')
//   // const [companySize, setcompanySize] = useState('')
//   // const [about, setabout] = useState('')
//   // const [industry, setindustry] = useState('')
// 
// 
//   const stepArray = ["Company Details", "Office Location", "Job Overview", "Job Description", "Preview"]
// 
//   const [CurrentStep, setCurrentStep] = useState(1)
// const nextStep = () => {
//   let newStep = CurrentStep;
//   newStep++
//   setCurrentStep(newStep)
// }
// const prevStep = () => {
//   let newStep = CurrentStep;
//   newStep--
//   setCurrentStep(newStep)
// }
// 
//   const handleChange = input => e => {
//     setFormData({ [input]: e.target.value });
//     // setjobTitle({[input]: e.target.value})
//     // setjobDescription({[input]: e.target.value})
//     // setexperience({[input]: e.target.value})
//     // setvisa({[input]: e.target.value})
//     // setskills([{[input]: e.target.value}])
//     // setsalary({[input]: e.target.value})
//     // setlanguage([{[input]: e.target.value}])
//     // setcountry({[input]: e.target.value})
//     // setjobCategory([{[input]: e.target.value}])
//     // setjobType([{[input]: e.target.value}])
//     // setcompanyName({[input]: e.target.value})
//     // setcity({[input]: e.target.value})
//     // setlocality({[input]: e.target.value})
//     // setworkingDays({[input]: e.target.value})
//     // setcompanyWebsite({[input]: e.target.value})
//     // setcompanySize({[input]: e.target.value})
//     // setabout({[input]: e.target.value})
//     // setindustry({[input]: e.target.value})
//   }
// 
//   const showSteps = () => {
//   const {
//     jobTitle,
//     jobDescription,
//     experience,
//     skills,
//     visa,
//     language,
//     salary,
//     country,
//     jobCategory,
//     jobType,
//     companyName,
//     city,
//     locality,
//     workingDays,
//     companyWebsite,
//     companySize,
//     about,
//     industry
// 
//   } = formData;
//     
//       if (CurrentStep === 1)
//       return (<CompanyDetails
//         nextStep={ nextStep }
//         handleChange={ handleChange }
//         currentStepNumber={ CurrentStep }
//         companyName={ companyName }
//         companyWebsite={ companyWebsite }
//         companySize={ companySize }
//         about={ about }
//         industry = {industry}
//       />)
//       if (CurrentStep === 2 )
//       return (<CompanyLocation
//         nextStep={ nextStep }
//         prevStep={ prevStep }
//         handleChange={ handleChange }
//         currentStepNumber={ CurrentStep }
//         country={ country }
//         city={ city }
//         locality={ locality }
//       />)
//      if( CurrentStep === 3 )
//       return ( <JobOverview
//         nextStep={ nextStep }
//         prevStep={ prevStep }
//         handleChange={ handleChange }
//         jobTitle={ jobTitle }
//         salary={ salary }
//         experience={ experience }
//         skills={ skills }
//         workingDays={ workingDays }
//       />)
//       if(CurrentStep === 4)
//         return( <JobDescription
//         nextStep={ nextStep }
//         prevStep={ prevStep }
//         handleChange={ handleChange }
//         jobDescription={ jobDescription }
//       />)
//       if(CurrentStep === 5)
//         return( <Preview
//         prevStep={ prevStep }
//       />)
//     
//   }
//   return (
//     <>
//       <div className="stepper-container-vertical" >
//         <Stepper steps={ stepArray } direction="vertical" currentStepNumber={ CurrentStep } />
//       </div>
//       <div className="form-container">
//       {showSteps()}
//       </div>
//     </>
// 
//   )
// }
class CreateJobs extends Component {
  state = {
    CurrentStep: 1,
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
    companyName: '',
    City: '',
    Locality: '',
    WorkingDays: '',
    companyWebsite: '',
    companySize: '',
    about: '',
    industry: '',
    responsibility:'',
    perksBenefits:''
  }


  nextStep = () => {
    const { CurrentStep } = this.state;

    this.setState({ CurrentStep: CurrentStep + 1 })
  }
  prevStep = () => {
    const { CurrentStep } = this.state;

    this.setState({ CurrentStep: CurrentStep - 1 })
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  }
  getAboutData = data => {
    this.setState({ 'about': data });
  }

  getJDData = data => {
    this.setState({ 'jobDescription': data });
  }

  getRolesResponsibility = data => {
    this.setState({'responsibility': data})
  }
getPerksAndBenefits = data => {
  this.setState({ "perksBenefits": data})
}
  showSteps = () => {
    const {
      CurrentStep,
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
      workingDays,
      companyWebsite,
      companySize,
      about,
      industry,
      responsibility,
      perksBenefits

    } = this.state;

    if (CurrentStep === 1)
      return (<CompanyDetails
        nextStep={ this.nextStep }
        handleChange={ this.handleChange }
        getData={ this.getAboutData }
        currentStepNumber={ CurrentStep }
        companyName={ companyName }
        companyWebsite={ companyWebsite }
        companySize={ companySize }
        about={ about }
        industry={ industry }
      />)
    if (CurrentStep === 2)
      return (<CompanyLocation
        nextStep={ this.nextStep }
        prevStep={ this.prevStep }
        handleChange={ this.handleChange }
        currentStepNumber={ CurrentStep }
        country={ country }
        city={ city }
        locality={ locality }
      />)
    if (CurrentStep === 3)
      return (<JobOverview
        nextStep={ this.nextStep }
        prevStep={ this.prevStep }
        handleChange={ this.handleChange }
        jobTitle={ jobTitle }
        salary={ salary }
        experience={ experience }
        skills={ skills }
        workingDays={ workingDays }
      />)
    if (CurrentStep === 4)
      return (<JobDescription
        nextStep={ this.nextStep }
        prevStep={ this.prevStep }
        getJDData={ this.getJDData }
        handleChange={ this.handleChange }
        jobDescription={ jobDescription }
      />)
    if (CurrentStep === 5)
      return (
        <RolesAndResponsibility
          nextStep={ this.nextStep }
          prevStep={ this.prevStep }
          getRolesResponsibility={ this.getRolesResponsibility}
          responsibility = {responsibility}
          handleChange={ this.handleChange }
        />
      )
    if (CurrentStep === 6)
      return (
        <BenefitsAndPerks
          nextStep={ this.nextStep }
          prevStep={ this.prevStep }
          getPerksAndBenefits = {this.getPerksAndBenefits}
          perksBenefits = {perksBenefits}
          handleChange={ this.handleChange }
        />
      )
    if (CurrentStep === 7)
      return (<Preview
        prevStep={ this.prevStep }
        about={ about }
        perksBenefits={ perksBenefits }
        responsibility={ responsibility }
        jobDescription={ jobDescription }
        jobTitle={ jobTitle }
        salary={ salary }
        experience={ experience }
        skills={ skills }
        workingDays={ workingDays }
        country={ country }
        city={ city }
        locality={ locality }
        companyName={ companyName }
        companyWebsite={ companyWebsite }
        companySize={ companySize }
        about={ about }
        industry={ industry }
      />)

  }
  render() {
    const { CurrentStep } = this.state;
    return (
      <>
        <div className="stepper-container-vertical" >
          <Stepper steps={ stepArray } direction="vertical" currentStepNumber={ CurrentStep } />
        </div>
        <div className="form-container">
          { this.showSteps() }
        </div>
      </>
    );
  }
}
CreateJobs.propTypes = {
  addJob: PropTypes.func.isRequired
};

export default connect(null, { addJob })(CreateJobs)

const stepArray = ["Company Details", "Office Location", "Job Overview", "Job Description", "Roles and Responsibility", "Perks and Benefits", "Preview"]