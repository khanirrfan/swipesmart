import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { appliedJobs } from '../../actions/jobs';
import JobItem from './jobItem';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
const AppliedJobsPage = ({appliedJobs, jobs:{jobsApplied, loading}}) => {
    useEffect(() => {
        appliedJobs();
    }, [appliedJobs]);
    return (
        <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Applied Jobs</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse jobs
          </p>
          <div className='profiles'>
            {
                jobsApplied && jobsApplied.length > 0 ? (
                jobsApplied.map(item => (
                <JobItem key={item.jobs._id} item={item.jobs} />
              ))
            ) : (
              <h4>No jobs found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
    )
}

AppliedJobsPage.propTypes = {
    appliedJobs: PropTypes.func.isRequired,
    jobs: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    jobs: state.jobs
  });
export default connect(mapStateToProps,{appliedJobs})(AppliedJobsPage)
