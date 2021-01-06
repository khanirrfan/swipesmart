import React, { useState } from 'react';
import {  Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { CardWrapper, CardHeader, CardHeading, CardBody, CardFieldset, CardInput, CardOptions, CardOptionsNote, CardOptionsItem, CardIcon, CardButton, CardLink } from './LoginElement';

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

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const revealPassword = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    if (isAuthenticated && user) {
        switch (user.type) {
            case 'org':
                return <Redirect to='/createJobs' />;
            default:
                return <Redirect to='/jobs' />;
        }
    }

    return (
        <>
            <CardWrapper>
                <CardHeader>
                    <CardHeading>Login</CardHeading>
                </CardHeader>

                <CardBody onSubmit={ e => onSubmit(e) }>
                    <CardFieldset>
                        <CardInput
                            placeholder='Username'
                            type='text'                            
                            placeholder='Username'
                            name='username'
                            value={ username }
                            onChange={ e => onChange(e) }
                            required
                        />
                    </CardFieldset>

                    <CardFieldset>
                        <CardInput
                            type='email'
                            placeholder='Email Address'
                            name='email'
                            value={ email }
                            onChange={ e => onChange(e) }
                            required
                        />
                    </CardFieldset>

                    <CardFieldset>
                        <CardInput
                            placeholder='Password'
                            name='password'
                            value={ password }
                            onChange={ e => onChange(e) }
                            minLength='6'
                            type={ !isPasswordVisible ? 'password' : 'text' }
                            required
                        />

                        <CardIcon
                            onClick={ revealPassword }
                            className='fa fa-eye'
                            eye
                            small
                        />
                    </CardFieldset>

                    <CardFieldset>
                        <CardOptionsNote>Or sign up with</CardOptionsNote>

                        <CardOptions>
                            <CardOptionsItem>
                                <CardIcon
                                    onClick={ revealPassword }
                                    className='fa fa-google-plus'
                                    big
                                />
                            </CardOptionsItem>

                            <CardOptionsItem>
                                <CardIcon
                                    onClick={ revealPassword }
                                    className='fa fa-twitter'
                                    big
                                />
                            </CardOptionsItem>

                            <CardOptionsItem>
                                <CardIcon
                                    onClick={ revealPassword }
                                    className='fa fa-facebook'
                                    big
                                />
                            </CardOptionsItem>
                        </CardOptions>
                    </CardFieldset>

                    <CardFieldset>
                        <CardButton type='submit' value='Login'>Go Inside</CardButton>
                    </CardFieldset>

                    <CardFieldset>
                        <CardLink to ="/register">I dont't have an account</CardLink>
                    </CardFieldset>
                </CardBody>
            </CardWrapper>
        </>
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