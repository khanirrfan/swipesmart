import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import JobItem from './jobItem';
import { getJobs, getMatchPercent } from '../../actions/jobs';
import CheckBox from '../shared/Checkbox.js';
import Select from 'react-select'

const JobsListing = ({ getJobs, jobs: { jobs, loading } }) => {
  useEffect(() => {
    getJobs();
  }, [getJobs]);
  const [jobTypes, setJobTypes] = useState({
    types: [
      { id: 0, value: 'value0', label: 'Marketing', name: 'type', isChecked: true },
      { id: 1, value: 'value1', label: 'Engineering', name:'type', isChecked: false },
      { id: 2, value: 'value2', label: 'Humar resource', name:'type', isChecked: false },
      { id: 3, value: 'value3', label: 'Executive', name: 'type', isChecked: false }
    ]
  })
  const [expLevel, setexpLevel] = useState({
    level: [
      { id: 0, value: 'All', label: 'All', name: 'type',isChecked: true },
      { id: 1, value: 'Senior', label: 'Senior', name: 'type', isChecked: false },
      { id: 2, value: 'Mid', label: 'Mid', name: 'type',  isChecked: false },
      { id: 3, value: 'Junior', label: 'Junior', name: 'type', isChecked: false }
    ]
  })
  const [posted, setposted] = useState({
    duration: [
      { id: 0, value: 'All', label: '', name: 'type', isChecked: true },
      { id: 1, value: 'Senior', label: '', name: 'type', isChecked: false },
      { id: 2, value: 'Mid', label: '', name: 'type', isChecked: false },
      { id: 3, value: 'Junior', label: '', name: 'type', isChecked: false }
    ]
  })
  const handleCheckTypeElement = (e) => {
    let types = jobTypes.types
    types.map(jobType => {
      if (jobType.value === e.target.value)
        jobType.isChecked = e.target.checked
    })
    console.log(jobTypes);
    setJobTypes({ types: types })
  }
  const handleCheckExpElement = (e) => {
    let levels = expLevel.level
    levels.map(level => {
      if (level.value === e.target.value)
        level.isChecked = e.target.checked
    })
    console.log(levels);
    setexpLevel({ level: levels })
  }
  const handleCheckdurationElement = (e) => {
    let durations = posted.duration
    durations.map(duration => {
      if (duration.value === e.target.value)
        duration.isChecked = e.target.checked
    })
    console.log(durations);
    setposted({ duration: durations })
  }
  const [show, setShow] = useState(false);
  const showDescription = (item, e) => {
    e.preventDefault();
    setShow(true);
  }
  const aquaticCreatures = [
    { label: 'Shark', value: 'Shark' },
    { label: 'Dolphin', value: 'Dolphin' },
    { label: 'Whale', value: 'Whale' },
    { label: 'Octopus', value: 'Octopus' },
    { label: 'Crab', value: 'Crab' },
    { label: 'Lobster', value: 'Lobster' },
  ];
  return (
    <div className="">
   {/* <div className="row" style={{marginLeft:'20%', marginBottom:'1%'}}>
    <div className="Select">
          <Select options={ aquaticCreatures } onChange={ opt => console.log(opt.label, opt.value) } />
    </div>
        <div className="Select">
          <Select options={ aquaticCreatures } onChange={ opt => console.log(opt.label, opt.value) } />
        </div>
        <div className="Select">
          <Select options={ aquaticCreatures } onChange={ opt => console.log(opt.label, opt.value) } />
        </div>
        <div className="Select">
          <Select options={ aquaticCreatures } onChange={ opt => console.log(opt.label, opt.value) } />
        </div>
  </div>*/}
       <div className="leftpane ">
        <div className="container-left">
          <h4 className=" m-1"> Job Types </h4>
          <ul className="m-1">
            {
              jobTypes.types.map((jobType, index) => {
                return (<CheckBox key={ index } handleCheckChieldElement={ e => handleCheckTypeElement(e) }  { ...jobType } />)
              })
            }
          </ul>

          <h4 className="m-1"> Salary Range</h4>
          <h4 className="m-1"> Experience Level</h4>
          <ul className="m-1">
            {
              expLevel.level.map((level, index) => {
                return (<CheckBox key={ index } handleCheckChieldElement={ e => handleCheckExpElement(e) }  { ...level } />)
              })
            }
          </ul>
          <h4 className="m-1">Posted time</h4>
          <ul className="m-1">
            {
              posted.duration.map((duration, index) => {
                return (<CheckBox key={ index } handleCheckChieldElement={ e => handleCheckdurationElement(e) }  { ...duration } />)
              })
            }
          </ul>
        </div>
      </div>
      <div className="middlepane">
        <div className="row" >
          <div className="Select">
            <Select options={ aquaticCreatures } onChange={ opt => console.log(opt.label, opt.value) } />
          </div>
          <div className="Select">
            <Select options={ aquaticCreatures } onChange={ opt => console.log(opt.label, opt.value) } />
          </div>
          <div className="Select">
            <Select options={ aquaticCreatures } onChange={ opt => console.log(opt.label, opt.value) } />
          </div>
          <div className="Select">
            <Select options={ aquaticCreatures } onChange={ opt => console.log(opt.label, opt.value) } />
          </div>
        </div>
        { loading ? (
          <Spinner />
        ) : (
            <Fragment>
              {
                jobs && jobs.length > 0 ? (
                  jobs.map(item => {
                    return (<JobItem showDescription={ (e) => showDescription(item, e) } key={ item._id } item={ item } />)
                  })
                ) : (
                    <h4>No jobs found...</h4>
                  ) }
            </Fragment>
          ) }
      </div>
      { show && <div className="rightpane">
        <div className="jobs bg-white p-1 my-2" >
          <div className="jobDetails" >
            <div className="border-bottom border-width-1 border-default-color">
              <div className="row p-1">
                <div className="company-logo">
                  company-logo
                      </div>
                <div className="jobTitle">
                  <a className="font-size-6">jobTitle </a>
                  <span>company name</span>
                </div>
                <div className="jobSalary">
                  <span className="font-size-5">
                    Job relevant:50%
                </span>
                </div>
              </div>
              <div className="row p-1">
                <button style={ { width: "30%", marginRight: "1%" } }>
                  Apply to this job
              </button>
                <button style={ { width: "20%", marginLeft: "1%" } }>
                  Save Job
              </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      }
    </div>
  );
};

JobsListing.propTypes = {
  getJobs: PropTypes.func.isRequired,
  getMatchPercent: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs
});
export default connect(
  mapStateToProps,
  { getJobs, getMatchPercent }
)(JobsListing);
