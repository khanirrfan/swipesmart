import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import CheckBox from '../shared/Checkbox';

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

    if (isAuthenticated) {
        console.log('isAuthenticated:', isAuthenticated);
        return <Redirect to='/jobs' />;
    }

    return (
        <Fragment>
            <div className="authBox" >
                <p className='text-center lead' >
                    <i className='fas fa-user' /> Create Your Account
        </p>
                <form className='formContainer form'
                    onSubmit={ e => onSubmit(e) } >
                    <div className="form-check" >
                        <ul className="m-1">
                            {
                                useType.types.map((jobType, index) => {
                                    return (<CheckBox key={ index } handleCheckChieldElement={ e => handleCheckTypeElement(e) }  { ...jobType } />)
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
            </div>

        </Fragment>
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