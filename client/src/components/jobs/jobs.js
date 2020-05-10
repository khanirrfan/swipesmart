import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from '../profiles/ProfileItem';
import { getJobs } from '../../actions/jobs'

const Jobs = ({ getJobs, jobList: { list, loading } }) => {
    useEffect(() => {
        getJobs();
    }, [getJobs]);
  
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {list && list.length > 0 ? (
                list.map(item => (
                <ProfileItem key={item._id} item={item} />
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

Jobs.propTypes = {
    getJobs: PropTypes.func.isRequired,
    jobList: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    list: state.list
  });

export default connect(
    mapStateToProps,
    { getJobs }
)(Jobs);
