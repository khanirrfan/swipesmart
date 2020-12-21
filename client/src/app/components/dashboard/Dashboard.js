import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  // useEffect(() => {
  //   getCurrentProfile();
  // }, [getCurrentProfile]);

  return loading && profile === null ? (
    
    <Spinner />
  ) : (
      <Fragment>
        <div className="dashboard-sidebar-wrapper pt-11" id="sidebar">
          <div className="brand-logo px-11">
            <a href="#">
              <img src="" alt="" />
            </a>
          </div>
          <div className="my-15 px-11">
            <a href="#" className="btn btn-primary btn-xl w-100 text-uppercase"><span className="mr-5 d-inline-block">+</span>Post a new job</a>
          </div>
          <ul className="list-unstyled dashboard-layout-sidebar">
            <li className="active">
              <a href="#" className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                <i className="icon icon-layout-11 mr-7"></i>Dashboard
              </a>
            </li>
            <li className="">
              <a href="dashboard-posted-jobs.html" className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                <i className="fas fa-briefcase mr-7"></i>Posted Jobs
              </a>
            </li>
            <li className="">
              <a href="#" className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                <i className="fas fa-user mr-7"></i>Applicants 
                  <span className="ml-auto px-1 h-1 bg-dodger text-white font-size-3 rounded-5 max-height-px-18 flex-all-center">14
                  </span>
              </a>
            </li>
            <li className="">
              <a href="#" className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                <i className="fas fa-cog mr-7"></i>
                Settings
              </a>
            </li>
          </ul>
        </div>
        {/*<h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.username}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}*/}
      </Fragment>
    );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
