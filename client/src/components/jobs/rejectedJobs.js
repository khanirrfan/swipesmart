import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  JobItem  from './jobItem';
import Spinner from '../layout/Spinner';
import { getRejectedJobs} from '../../actions/jobs';

const RejectedJobs = ({getRejectedJobs, jobs:{jobsRejected, loading} }) => {
    useEffect(() => {
        getRejectedJobs();
    }, [getRejectedJobs]);
    return (
        <div>
        <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className='large text-primary'>Rejected Jobs</h1>
            <p className='lead'>
              <i className='fab fa-connectdevelop' /> Browse jobs
            </p>
            <div className='profiles'>
              {
                jobsRejected && jobsRejected.length > 0 ? (
                    jobsRejected.map(item => (
                  <JobItem key={item._id} item={item} />
                ))
              ) : (
                <h4>No jobs found...</h4>
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
        </div>
    )
}

RejectedJobs.propTypes = {
    getRejectedJobs: PropTypes.func.isRequired,
    jobs: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    jobs: state.jobs
  });

export default  connect(mapStateToProps, {getRejectedJobs})(RejectedJobs)
