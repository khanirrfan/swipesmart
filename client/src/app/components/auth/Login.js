import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated, auth: { user } }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(username, email, password);
    };

    if (isAuthenticated && user) {
        switch (user.type) {
            case 'org':
                return <Redirect to='/createJobs' />;
            default:
                return <Redirect to='/jobs' />;
        }
    }

    return (
        <Fragment>
            <div className="authBox text-center" >
                <p className='text-center lead' >
                    <i className='fas fa-user' /> Sign Into Your Account </p>
                <form className='text-center form formContainer'
                    onSubmit={ e => onSubmit(e) }>
                    <div className="form-check" >
                        <input className="form-check-input"
                            type="checkbox"
                            name="type"
                            id="employer"
                            value="employe"
                            onChange={ e => onChange(e) } />
                        <label className="form-check-label"
                            htmlFor="employer">
                            Login As job seeker </label>
                        <input className="form-check-input"
                            type="checkbox"
                            name="type"
                            id="organisation"
                            value="org"
                            onChange={ e => onChange(e) } />
                        <label className="form-check-label"
                            htmlFor="organisation" >
                            Login as an organisation </label>
                    </div>
                    <div className='form-group' >
                        <input type='text'
                            placeholder='Username'
                            name='username'
                            value={ username }
                            onChange={ e => onChange(e) }
                            required />
                    </div>

                    <div className='form-group' >
                        <input type='email'
                            placeholder='Email Address'
                            name='email'
                            value={ email }
                            onChange={ e => onChange(e) }
                            required />
                    </div>
                    <div className='form-group' >
                        <input type='password'
                            placeholder='Password'
                            name='password'
                            value={ password }
                            onChange={ e => onChange(e) }
                            minLength='6' />
                    </div>
                    <input type='submit'
                        className='btn btn-primary'
                        value='Login' />
                </form>
                <p className='my-1 text-center' >
                    Don 't have an account? <Link to='/register'>Sign Up</Link>
                </p>
            </div>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

export default connect(
    mapStateToProps, { login }
)(Login);