import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const CreateProfile = ({
  createProfile,
  // getCurrentProfile,
  profile: { profile, loading },
  auth:{user},
  history
}) => {
  console.log(user._id);
  const [formData, setFormData] = useState({
    About:'',
  });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log(formData, history);
    createProfile(formData, history, user._id);
  };

  useEffect(() => {
    // getCurrentProfile();
  });
  const [aboutField, setAboutField] = useState(false)
  const addAbout = () => {
    console.log('adding');
    setAboutField(!aboutField)
  }


  return (
      <Fragment>
        <div className="profileMiddlePane bg-white rounded-4 shadow-9">
          <div className="tab-content">
            <div className="tab-pane fade show active">
              <div className="pr-xl-0 pr-xxl-14 p-5 px-xs-12 pt-7 pb-5">
                { !aboutField &&
                  <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">Add about yourself
                    <span onClick={ () => addAbout() } style={ { marginLeft: '10px', cursor: "pointer" } }><i className="fa fa-plus-circle" aria-hidden="true" ></i></span>
                  </h4>
                }
                { aboutField &&
                  <Fragment>
                    <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">About</h4>
                    <form onSubmit={ onSubmit }>
                  <textarea 
                    name='About'
                    style={{ width:'-webkit-fill-available'}} 
                    value={formData.About} 
                    onChange={ e => onChange(e) } rows="10" 
                    />
                  <button type="submit" > Save </button>
                    </form>
                </Fragment>
                }
              </div>
            </div>
          </div>
        <div className="tab-pane fade show active">
          <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
            <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">Add your Skills
              <span style={ { marginLeft: '10px', cursor: "pointer" } }><i className="fa fa-plus-circle" aria-hidden="true"></i></span>
            </h4>
          </div>
          </div>
        <div className="tab-pane fade show active">
          <div className="border-top p-5 pl-xs-12 pt-7 pb-5">
            <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">Experience
                        <span style={ { marginLeft: '10px', cursor: "pointer" } }><i className="fa fa-plus-circle" aria-hidden="true"></i></span>
            </h4>
          </div>
          </div>
        <div className="tab-pane fade show active">
          <div className="border-top p-5 pl-xs-12 pt-7 pb-5">
            <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">Education
                          <span style={ { marginLeft: '10px', cursor: "pointer" } }><i className="fa fa-plus-circle" aria-hidden="true"></i></span>
            </h4>
          </div>
        </div>
        {/*<form className="form" onSubmit={ onSubmit }>
          <div className="form-group">
            <select name="status" value={ status } onChange={ onChange }>
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
          </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={ company }
              onChange={ onChange }
            />
            <small className="form-text">
              Could be your own company or one you work for
          </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={ website }
              onChange={ onChange }
            />
            <small className="form-text">
              Could be your own or a company website
          </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={ location }
              onChange={ onChange }
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
          </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={ skills }
              onChange={ onChange }
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={ githubusername }
              onChange={ onChange }
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
          </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={ bio }
              onChange={ onChange }
            />
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button
              onClick={ () => toggleSocialInputs(!displaySocialInputs) }
              type="button"
              className="btn btn-light"
            >
              Add Social Network Links
          </button>
            <span>Optional</span>
          </div>
          { displaySocialInputs && (
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x" />
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={ twitter }
                  onChange={ onChange }
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x" />
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={ facebook }
                  onChange={ onChange }
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x" />
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={ youtube }
                  onChange={ onChange }
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x" />
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={ linkedin }
                  onChange={ onChange }
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x" />
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={ instagram }
                  onChange={ onChange }
                />
              </div>
            </Fragment>
          ) }

          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
          </form>*/}
          </div>
      </Fragment>
    );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  // getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth:state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
