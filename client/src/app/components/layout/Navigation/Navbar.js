import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';
import { FaBars, FaTimes } from 'react-icons/fa';

import { Nav, NavLink, NavLinks, NavLogo, Bars, NavMenu, NavBtn, NavBtnLink, Times, NavHeader, NavbarContainer, MobileIcon, NavItem } from '../Navigation/NavbarElements';
import TopNavBar from './TopNavBar';

import { IconContext } from 'react-icons/lib';

import { animateScroll as scroll } from 'react-scroll';
// import './Navbar.css';
const Navbar = ({ auth: { isAuthenticated, loading, user }, logout, toggle }) => {
  const [state, setState] = useState({ clicked: true })
  const [scrollNav, setScrollNav] = useState(false)

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }

  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, [])

  const toggleHome = () => {
    scroll.scrollToTop()
  }

  const authLinks = (
    <NavMenu>
      <NavItem>
        <NavLink to="/jobs" activeStyle>
          Jobs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/community" activeStyle>
          Community
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/cover-letter" activeStyle>
          Cover Letter
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/userDashboard" activeStyle>
          Dashboard
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/companyProfile" activeStyle>
          Comapny
        </NavLink>
      </NavItem>
      {
        user &&
        <NavItem>
          <NavLink to={ `/getProfileByID/${user._id}` } activeStyle>
            <i className="fas fa-sign-out-alt' " />
            <span className='hide-sm'>Account</span>
          </NavLink>
        </NavItem>
      }
      <NavItem>
        <NavLink to='#' onClick={ e => logout(e) } activeStyle>
          <i className='fas fa-sign-out-alt' />{ ' ' }
          <span className='hide-sm'>Logout</span>
        </NavLink>
      </NavItem>
    </NavMenu>

  );

  const orgLinks = (
    <NavMenu>
      <NavItem>
        <NavLink to='/createJobs' activeStyle>
          Create Jobs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to='/posts' activeStyle>
          Posts
        </NavLink>
      </NavItem>
      {
        user &&
        <NavItem>
          <NavLink to={ `/getProfileByID/${user._id}` } activeStyle>
            <i className="fas fa-sign-out-alt' " />
            <span className='hide-sm'>Account</span>
          </NavLink>
        </NavItem>
      }
      <NavItem>
        <NavLink to='#' onClick={ e => logout(e) } activeStyle>
          <i className='fas fa-sign-out-alt' />{ ' ' }
          <span className='hide-sm'>Logout</span>
        </NavLink>
      </NavItem>
    </NavMenu>

  );

  const displayLinks = (
    <NavMenu>
      <NavItem>
        <NavLinks to='about' smooth={ true } duration={ 500 } spy={ true } exact='true' offset={ -80 }>
          About
        </NavLinks>
      </NavItem>
      <NavItem>
        <NavLinks to='discover' smooth={ true } duration={ 500 } spy={ true } exact='true' offset={ -80 }>
          Discover
        </NavLinks>
      </NavItem>
      <NavItem>
        <NavLinks to='services' smooth={ true } duration={ 500 } spy={ true } exact='true' offset={ -80 }>
          Services
        </NavLinks>
      </NavItem>

      <NavItem>
        <NavLink to='/signin' smooth={ true } duration={ 500 } spy={ true } exact='true' offset={ -80 }>
          Login
        </NavLink>
      </NavItem>
    </NavMenu>
  );

  return (
    <>
      <IconContext.Provider value={ { color: '#fff' } }>
        <Nav scrollNav={ scrollNav }>
          <NavbarContainer>
            <NavLogo to="#" onClick={ toggleHome }>
              <NavHeader>
                SwipeSmart
              </NavHeader>
            </NavLogo>

            <MobileIcon onClick={ toggle }>
              <Bars />
            </MobileIcon>
            { user && !loading ? (

              <>
                {
                  (
                    user && isAuthenticated && (user.type === 'employee')
                  ) ? authLinks : orgLinks
                }
              </>
            ) : (
                <>
                  { displayLinks }
                </>
              )
            }
          </NavbarContainer>
        </Nav>
      </IconContext.Provider >
    </>
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
