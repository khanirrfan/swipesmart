import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ auth: { user, isAuthenticated } }) => {
    if (isAuthenticated) {
        return <Redirect to={ `/getProfileByID/${user._id}` } />;
    }
    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'> Jobs world. </h1>
                    <p className='lead'>
                        The home of your dream
                    </p>
                    <div className='buttons'>
                        <Link to='/register'
                            className='btn btn-primary'>
                            Sign Up
                        </Link>
                        <Link to='/login'
                            className='btn btn-light'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
            <div className="black-overlay">
                <div className='company-section'>
                    <h3>
                        Get hired in top companies
                    </h3>
                </div>
            </div>
            <div className="explore-category">
            <div className="container">
                <h2>
                    Explore by Category
                </h2>

            </div>
            
            </div>
            <div className="featuredJobs">
            <div className="container">
            <h2>Featured Jobs</h2>
            </div>
            </div>
        </section>

    );
};

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);