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
    password2: ''
  });

  const { username, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ username, email, password });
    }
  };

  if (isAuthenticated) {
    console.log('isAuthenticated:', isAuthenticated);
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
    <div className="authBox">
    <p className='text-center lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className='formContainer form' onSubmit={e => onSubmit(e)}>
      <div class="form-check">
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
      <label class="form-check-label" for="exampleRadios1">
        Default radio
      </label>
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
      <label class="form-check-label" for="exampleRadios1">
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
