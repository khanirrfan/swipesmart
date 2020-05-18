import React, {Fragment,useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addJob } from '../../actions/jobs';
import { connect } from 'react-redux';

const CreateJobs = ({addJob}) => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        experience: '',
        skills: '',
        from: '',
        to: '',
        Country: '',
        jobDescription: ''
      });
  const {
    jobTitle,
    experience,
    skills,
    from,
    to,
    Country,
    jobDescription
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
        <h1 className='large text-primary'>Create Job</h1>
        <small>* = required field</small>
        <form
          className='form'
          onSubmit={e => {
            e.preventDefault();
            addJob(formData);
          }}
        >
          <div className='form-group'>
            <input
              type='text'
              placeholder='* job title'
              name='jobTitle'
              value={jobTitle}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Degree or Certificate'
              name='experience'
              value={experience}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Field of Study'
              name='skills'
              value={skills}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input
              type='date'
              name='from'
              value={from}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <h4>Country</h4>
              <input
                type='text'
                name='Country'
                checked={Country}
                value={Country}
                onChange={e => onChange(e)}
              />{' '}
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input
              type='date'
              name='to'
              value={to}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <textarea
              name='jobDescription'
              cols='30'
              rows='5'
              placeholder='Job Description'
              value={jobDescription}
              onChange={e => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/jobs'>
            Go Back
          </Link>
        </form>
      </Fragment>
    )
}

CreateJobs.propTypes = {
addJob: PropTypes.func.isRequired,
};

export default connect(null, {addJob})(CreateJobs)
