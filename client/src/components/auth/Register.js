import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    type:''
  });

  const { username, email, password, password2, type } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
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
    <div className="authBox">
    <p className='text-center lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className='formContainer form' onSubmit={e => onSubmit(e)}>
      <div className="form-check">
      <input className="form-check-input" type="checkbox" name="type" id="employer" value="employe" onChange={e => onChange(e)} />
      <label className="form-check-label" htmlFor="employer">
        Default radio
      </label>
      <input className="form-check-input" type="checkbox" name="type" id="organisation" value="org" onChange={e => onChange(e)} />
      <label className="form-check-label" htmlFor="organisation">
        Default radio
      </label>
    </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='username'
            value={username}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='text-center my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
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
  mapStateToProps,
  { setAlert, register }
)(Register);
