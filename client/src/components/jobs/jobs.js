import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import JobItem from './jobItem';
import { getJobs } from '../../actions/jobs';
// import Search from '../search/search';

const JobsListing = ({ getJobs, jobs: { jobs, loading } }) => {
    useEffect(() => {
        getJobs();
    }, [getJobs]);
  
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>JOB</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse jobs
          </p>
          <div className='profiles'>
            {
                jobs && jobs.length > 0 ? (
                jobs.map(item => (
                <JobItem key={item._id} item={item} />
              ))
            ) : (
              <h4>No jobs found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

JobsListing.propTypes = {
    getJobs: PropTypes.func.isRequired,
    jobs: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    jobs: state.jobs
  });
export default connect(
    mapStateToProps,
    { getJobs }
)(JobsListing);
