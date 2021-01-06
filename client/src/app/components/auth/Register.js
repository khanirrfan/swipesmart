import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import CheckBox from '../shared/Checkbox';
import { CardWrapper, CardHeader, CardHeading, CardBody, CardFieldset, CardInput, CardOptions, CardOptionsNote, CardOptionsItem, CardIcon, CardButton, CardLink, CardCheckbox, CardItem } from './RegisterElements';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        type: ''
    });
    const [useType, setUseType] = useState({
        types: [
            { id: 0, value: 'employee', label: 'Job seeker', name:'type', isChecked: false },
            { id: 1, value: 'org', label: 'Organisation', name: 'type', isChecked: false },
        ]
    })
    const handleCheckTypeElement = (e) => {
        let types = useType.types
        types.map(jobType => {
            if (jobType.value === e.target.value)
                jobType.isChecked = e.target.checked
            setFormData({ ...formData, [e.target.name]: e.target.value });
        })
        console.log(useType);
        setUseType({ types: types })

    }
    const { username, email, password, password2, type } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        console.log(type);
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else if (!type) {
            setAlert('Type can not be empty', 'danger');
        } else {
            register({ username, email, password, type });
        }
    };
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const revealPassword = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    if (isAuthenticated) {
        console.log('isAuthenticated:', isAuthenticated);
        return <Redirect to='/jobs' />;
    }

    return (
        <>
            <CardWrapper>
                <CardHeader>
                    <CardHeading>New User</CardHeading>
                </CardHeader>
                <CardCheckbox>
                    <CardItem >
                        {
                            useType.types.map((jobType, index) => {
                                return (<CheckBox key={ index } handleCheckFieldElement={ e => handleCheckTypeElement(e) }  { ...jobType } />)
                            })
                        }
                    </CardItem>
                </CardCheckbox>
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
                        <CardInput
                            placeholder='Confirm Password'
                            
                            minLength='6'
                            type={ !isPasswordVisible ? 'password' : 'text' }
                            required
                            name='password2'
                            value={ password2 }
                            onChange={ e => onChange(e) } 
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
                        <CardButton type='submit' value='Register'>Sign Up</CardButton>
                    </CardFieldset>

                    <CardFieldset>
                        <CardLink to="/login">I already have an account</CardLink>
                    </CardFieldset>
                </CardBody>
            </CardWrapper>
            {/*<div className="authBox" >
                <p className='text-center lead' >
                    <i className='fas fa-user' /> Create Your Account
        </p>
                <form className='formContainer form'
                    onSubmit={ e => onSubmit(e) } >
                    <div className="form-check" style={{margin:'auto'}}>
                        <ul className="m-1" style={{display:'flex'}}>
                            {
                                useType.types.map((jobType, index) => {
                                    return (<CheckBox key={ index } handleCheckFieldElement={ e => handleCheckTypeElement(e) }  { ...jobType } />)
                                })
                            }
                        </ul>
                    </div>
                    <div className='form-group' >
                        <input type='text'
                            placeholder='Name'
                            name='username'
                            value={ username }
                            onChange={ e => onChange(e) } required />
                    </div>
                    <div className='form-group' >
                        <input type='email'
                            placeholder='Email Address'
                            name='email'
                            value={ email }
                            onChange={ e => onChange(e) } required />
                    </div>
                    <div className='form-group' >
                        <input type='password'
                            placeholder='Password'
                            name='password'
                            value={ password }
                            onChange={ e => onChange(e) } required />
                    </div>
                    <div className='form-group' >
                        <input type='password'
                            placeholder='Confirm Password'
                            name='password2'
                            value={ password2 }
                            onChange={ e => onChange(e) } required />
                    </div>
                    <input type='submit'
                        className='btn btn-primary'
                        value='Register' />
                </form>
                <p className='text-center my-1' >
                    Already have an account ? <Link to='/login'> Sign In </Link>
                </p>
                        </div>*/}

        </>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps, { setAlert, register }
)(Register);