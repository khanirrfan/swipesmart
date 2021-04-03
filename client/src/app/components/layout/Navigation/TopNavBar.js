import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';

import { SidebarContainer, Icon, CloseIcon, SideBtnWrap, SidebarLink, SidebarLinks, SidebarWrapper, SidebarMenu, SidebarRoute } from './TopNavBarElements'

const TopNavBar = ({ auth: { isAuthenticated, loading, user }, logout, isOpen, toggle }) => {
    const loggedLinks = (
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="/jobs" onClick={ toggle }>Jobs
                    </SidebarLink>
                <SidebarLink to="/community" onClick={ toggle }>Community
                    </SidebarLink>
                <SidebarLink to="/cover-letter" onClick={ toggle }>Cover Letter
                    </SidebarLink>
                <SidebarLink to="/userDashboard" onClick={ toggle }>Dashboard
                    </SidebarLink>
                <SidebarLink to="/companyProfile" onClick={ toggle }>Company
                    </SidebarLink>
                {
                    user &&
                    <SidebarLink to={ `/getProfileByID/${user._id}` } onClick={ toggle }>Account
                    </SidebarLink>
                }
                <SidebarLink to="#" onClick={ toggle, logout }>Logout
                    </SidebarLink>
            </SidebarMenu>
        </SidebarWrapper>
    )

    const OrgLoggedLinks = (
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="/createJobs" onClick={ toggle }>Create Jobs
                    </SidebarLink>
                <SidebarLink to='/posts' onClick={ toggle }>Posts
                    </SidebarLink>
                    {user &&
                     <SidebarLink to={ `/getProfileByID/${user._id}` } onClick={ toggle }>Account
                    </SidebarLink>
                    }
                <SidebarLink to="#" onClick={ logout, toggle }>Logout
                    </SidebarLink>
            </SidebarMenu>
        </SidebarWrapper>
    )
    const displayLinks = (
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLinks to="about" onClick={ toggle }>About
                    </SidebarLinks>
                <SidebarLinks to="discover" onClick={ toggle }>Discover
                    </SidebarLinks>
                <SidebarLinks to="services" onClick={ toggle }>Services
                    </SidebarLinks>
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoute to="/login">
                    Sign In
                    </SidebarRoute>
            </SideBtnWrap>
        </SidebarWrapper>
    )
    return (
        <SidebarContainer isOpen={ isOpen } onClick={ toggle }>
            <Icon onClick={ toggle }>
                <CloseIcon />
            </Icon>
            { user && !loading ? (
                <>
                    {
                        (
                            user && isAuthenticated && (user.type === 'employee')
                        ) ? loggedLinks : OrgLoggedLinks
                    }
                </>
            ) : (
                    displayLinks
                )
            }
        </SidebarContainer>
    )
}

TopNavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logout }
)(TopNavBar);
