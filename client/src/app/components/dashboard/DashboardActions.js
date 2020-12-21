import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
 

const DashboardActions = ({auth:{user}}) => {
  return (
    <div className='dash-buttons'>
      <Link to={`/edit-profile/${user._id}`} className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to={`/add-experience/${user._id}`} className='btn btn-light'>
        <i className='fab fa-black-tie text-primary' /> Add Experience
      </Link>
      <Link to={`/add-education/${user._id}`} className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary' /> Add Education
      </Link>
    </div>
  );
};
DashboardActions.propTypes = {
  auth:PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(DashboardActions);
