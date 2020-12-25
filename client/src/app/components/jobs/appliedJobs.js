import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { appliedJobs } from '../../actions/jobs';
import JobItem from './jobItem';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AppliedJobsPage = ({ appliedJobs, jobs: { jobsApplied, loading }, user }) => {
  useEffect(() => {
    appliedJobs(user._id);
  }, [appliedJobs], user._id);

  const [show, setShow] = useState(false);
  let [jobDescription, setJobDescription] = useState('')
  
  const showDescription = (item, e) => {
    e.preventDefault();
    jobDescription = item;
    setJobDescription(jobDescription);
    setShow(true);

  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
          <>
            <h1 className='large text-primary'>Applied Jobs</h1>
            <p className='lead'>
              <i className='fab fa-connectdevelop' /> Browse jobs
          </p>
            <div className='profiles'>
              {
                jobsApplied && jobsApplied.length > 0 ? (
                  jobsApplied.map((item, index) => (
                    <JobItem key={ index } item={ item.jobs } showDescription={ (e) => showDescription(item, e) } />
                  ))
                ) : (
                    <>
                      <h4>No jobs found...</h4>
                      <Link to="/cover-letter" >
                        <button>Add cover letter</button>
                      </Link>
                    </>
                  ) }
            </div>
          </>
        ) }
    </>
  )
}

AppliedJobsPage.propTypes = {
  appliedJobs: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs
});
export default connect(mapStateToProps, { appliedJobs })(AppliedJobsPage)
