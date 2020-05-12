import React, { useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { getSavedJobs } from '../../actions/jobs';
import JobItem from './jobItem';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';

const SavedJobs = ({getSavedJobs, jobs:{jobsSaved, loading}}) => {
    useEffect(() => {
        getSavedJobs();
    }, [getSavedJobs]);
    return (
        <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className='large text-primary'>Saved Jobs</h1>
            <p className='lead'>
              <i className='fab fa-connectdevelop' /> Browse jobs
            </p>
            <div className='profiles'>
              {
                jobsSaved && jobsSaved.length > 0 ? (
                    jobsSaved.map(item => (
                  <JobItem key={item._id} item={item} />
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

SavedJobs.propTypes = {
    getSavedJobs: PropTypes.func.isRequired,
    jobs: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    jobs: state.jobs
  });
export default connect(mapStateToProps, {getSavedJobs})(SavedJobs)
