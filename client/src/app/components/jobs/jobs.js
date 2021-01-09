import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import JobItem from './jobItem';
import { getJobs, getMatchPercent, applyJob } from '../../actions/jobs';
import CheckBox from '../shared/Checkbox.js';
import Select from 'react-select';
import JobDescription from './jobDescription';
import { JobSection } from './jobElements.js';

const JobsListing = ({ getJobs, jobs: { jobs, loading }, auth: { user } }) => {
  useEffect(() => {
    getJobs();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }

  }, [getJobs]);
  const [jobTypes, setJobTypes] = useState({
    types: [
      { id: 0, value: 'value0', label: 'Marketing', name: 'type', isChecked: true },
      { id: 1, value: 'value1', label: 'Engineering', name: 'type', isChecked: false },
      { id: 2, value: 'value2', label: 'Humar resource', name: 'type', isChecked: false },
      { id: 3, value: 'value3', label: 'Executive', name: 'type', isChecked: false }
    ]
  })
  const [expLevel, setexpLevel] = useState({
    level: [
      { id: 0, value: 'All', label: 'All', name: 'type', isChecked: true },
      { id: 1, value: 'Senior', label: 'Senior', name: 'type', isChecked: false },
      { id: 2, value: 'Mid', label: 'Mid', name: 'type', isChecked: false },
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
    });
    setJobTypes({ types: types })
  }
  const handleCheckExpElement = (e) => {
    let levels = expLevel.level
    levels.map(level => {
      if (level.value === e.target.value)
        level.isChecked = e.target.checked
    })
    setexpLevel({ level: levels })
  }
  const handleCheckdurationElement = (e) => {
    let durations = posted.duration
    durations.map(duration => {
      if (duration.value === e.target.value)
        duration.isChecked = e.target.checked
    })
    setposted({ duration: durations })
  }
  const [show, setShow] = useState(false);
  let [jobDescription, setJobDescription] = useState('')
  const showDescription = (item, e) => {
    e.preventDefault();
    jobDescription = item;
    setJobDescription(jobDescription);
    setShow(true);

  }
  const closeJobDescription = () => {
    setShow(false)
  }
  const aquaticCreatures = [
    { label: 'Shark', value: 'Shark' },
    { label: 'Dolphin', value: 'Dolphin' },
    { label: 'Whale', value: 'Whale' },
    { label: 'Octopus', value: 'Octopus' },
    { label: 'Crab', value: 'Crab' },
    { label: 'Lobster', value: 'Lobster' },
  ];
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }
  console.log(width);
  let isMobile = (width <= 920);
  console.log(isMobile);

  return (
     
    <>
      { !isMobile &&
        <div className="leftpane ">
          <div className="container-left">
            <h4 className=" m-1"> Job Types </h4>
            <ul className="m-1">
              {
                jobTypes.types.map((jobType, index) => {
                  return (<CheckBox key={ index } handleCheckFieldElement={ e => handleCheckTypeElement(e) }  { ...jobType } />)
                })
              }
            </ul>

            <h4 className="m-1"> Salary Range</h4>
            <h4 className="m-1"> Experience Level</h4>
            <ul className="m-1">
              {
                expLevel.level.map((level, index) => {
                  return (<CheckBox key={ index } handleCheckFieldElement={ e => handleCheckExpElement(e) }  { ...level } />)
                })
              }
            </ul>
            <h4 className="m-1">Posted time</h4>
            <ul className="m-1">
              {
                posted.duration.map((duration, index) => {
                  return (<CheckBox key={ index } handleCheckFieldElement={ e => handleCheckdurationElement(e) }  { ...duration } />)
                })
              }
            </ul>
          </div>
        </div> }
      <JobSection >
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
      </JobSection>
      { show && jobDescription !== '' &&
        <div className="rightpane">
          <JobDescription item={ jobDescription } closeJD={ closeJobDescription } />
        </div>
      }
    </>
  );
};

JobsListing.propTypes = {
  getJobs: PropTypes.func.isRequired,
  getMatchPercent: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
  applyJob: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  matchPercent: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs,
  auth: state.auth,
  matchPercent: state.matchPercent
});
export default connect(
  mapStateToProps,
  { getJobs, getMatchPercent, applyJob }
)(JobsListing);

