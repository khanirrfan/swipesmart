import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user}, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/jobs'>Jobs</Link>
      </li>
      <li>
        <Link to='/savedJobs'>Saved Jobs</Link>
      </li>
      <li>
        <Link to='/appliedJobs'>Applied Jobs</Link>
      </li>
      <li>
        <Link to='/rejectedJobs'>Rejected Jobs</Link>
      </li>
      <li>
        <Link to='/createJobs'>Create Job</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{ ' ' }
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/" onClick={ logout } >
          <i className='fas fa-sign-out-alt' />{ ' ' }
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const orgLinks = (
    <ul>
      <li>
        <Link to='/jobs'>Jobs(Developers)</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> SwipeSmart
        </Link>
      </h1>
      { !loading && (
        <Fragment>{ (user && isAuthenticated && user.type === 'employe') ? authLinks : orgLinks }</Fragment>
      ) }
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
