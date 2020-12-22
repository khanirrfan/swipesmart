import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';

import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, Times } from '../Navigation/NavbarElements';

import './Navbar.css';
const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const [state, setState] = useState({ clicked: true })
  const handleClick = (e) => {
    setState({ clicked: !state.clicked })
  }
  const authLinks = (
    <NavMenu>
      <NavLink to="/jobs" activeStyle>
        Jobs
        </NavLink>
      <NavLink to="/community" activeStyle>
        Community
        </NavLink>
      <NavLink to="/cover-letter" activeStyle>
        Cover Letter
        </NavLink>
      <NavLink to="/userDashboard" activeStyle>
        Dashboard
        </NavLink>
      <NavLink to="/companyProfile" activeStyle>
        Comapny
        </NavLink>
      {
        user &&
        <NavLink to={ `/getProfileByID/${user._id}` } activeStyle>
          <i className="fas fa-sign-out-alt' " />
          <span className='hide-sm'>Account</span>
        </NavLink>
      }
      <NavLink to= '#' onClick={ e => logout(e) } activeStyle>
        <i className='fas fa-sign-out-alt' />{ ' ' }
        <span className='hide-sm'>Logout</span>
      </NavLink>
    </NavMenu>

  );

  const orgLinks = (
    <NavMenu>
      <NavLink to='/createJobs' activeStyle>
        Create Jobs
        </NavLink>
      <NavLink to='/posts' activeStyle>
        Posts
        </NavLink>
      {
        user &&
        <NavLink to={ `/getProfileByID/${user._id}` } activeStyle>
          <i className="fas fa-sign-out-alt' " />
          <span className='hide-sm'>Account</span>
        </NavLink>
      }
      <NavLink to= '#' onClick={ e => logout(e) } activeStyle>
        <i className='fas fa-sign-out-alt' />{ ' ' }
        <span className='hide-sm'>Logout</span>
      </NavLink>
    </NavMenu>

  );

  const displayLinks = (
    <NavMenu>
      <NavLink to='/createJobs' activeStyle>
        Create Jobs
        </NavLink>
      <NavLink to='/posts' activeStyle>
        Posts
        </NavLink>
      <NavLink to='/login' activeStyle>
        Login
        </NavLink>
    </NavMenu>
  );

  return (

    <Nav>
      <NavLink to="#">
        <h1>
          SwipeSmart
        </h1>
      </NavLink>

      <div onClick={ e => handleClick(e) }>
        { state.clicked ?
          (<Bars />) : (<Times />)
        }
      </div>
      <div className={ !state.clicked ? 'nav-menu active' : 'nav-menu' }>
        { user && !loading ? (

          <Fragment>
            {
              (
                user && isAuthenticated && (user.type === 'employee')
              ) ? authLinks : orgLinks
            }
          </Fragment>
        ) : (
            <Fragment>
              {displayLinks }
            </Fragment>
          )
        }
      </div>
    </Nav>
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
