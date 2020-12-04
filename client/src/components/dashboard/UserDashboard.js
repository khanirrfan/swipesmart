import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const UserDashboard = (props) => {
    return (
        <Fragment>
            <div className="dashboard-sidebar-wrapper pt-11" id="sidebar">
                <div className="brand-logo px-11">
                    <a href="#">
                        <img src="" alt="" />
                    </a>
                </div>
                <div className="my-15 px-11">
                    <a href="#" className="btn btn-primary btn-xl w-100 text-uppercase"><span className="mr-5 d-inline-block">+</span>Write a story</a>
                </div>
                <ul className="list-unstyled dashboard-layout-sidebar">
                    <li className="active">
                        <a href="#" className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                            <i className="icon icon-layout-11 mr-7"></i>Campus News
              </a>
                    </li>
                    <li className="">
                        <a href="dashboard-posted-jobs.html" className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                            <i className="fas fa-briefcase mr-7"></i>Applied Jobs
              </a>
                    </li>
                    <li className="">
                        <a href="#" className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                            <i className="fas fa-user mr-7"></i>Saved Jobs
                        </a>
                    </li>
                    <li className="">
                        <a href="#" className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                            <i className="fas fa-cog mr-7"></i>
                Dashboard
              </a>
                    </li>
                </ul>
            </div>
            <div className="dashboard-main-container mt-25 mt-lg-31" id="dashboard-body">
                <div className="container">
                    inside container
                </div>
            </div>
        </Fragment>
    )
}

UserDashboard.propTypes = {

}

export default UserDashboard
