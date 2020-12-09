import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileByID } from '../../actions/profile';
import ProfileAbout from './ProfileAbout';
import ProfileSkills from './ProfileSkills';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const Profile = ({
  profile: { profile, loading },
  auth: { user },
  match,
  getProfileByID
}) => {
  const [aboutEdit, setAboutEdit] = useState(true)
  const [addSkills, setAddSkills] = useState(true)
  const [formData, setFormData] = useState({profile:{
    about:'',
    skills:'',
    education:[],
    experience:[]}
  });
  useEffect(() => {
    getProfileByID(match.params.id);
  }, [getProfileByID, match.params.id]);
  const changeAbout = e => {
    console.log('about edit button clicked');
    setAboutEdit(!aboutEdit)
  }
  const changeSkill = e => {
    console.log('skills edit button changed');
    setAddSkills(!addSkills)
  }
  const changeExperience = e => {
    console.log('experience edit button clicked');
  }
  const changeEducation = e => {
    console.log('education edit button changed');
  }
  const onChange = e => {
    setFormData({...formData, [e.target.name]:e.target.value});
  }
  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <div className="container1 row">
        <div className="profileLeftPane bg-white shadow-9 rounded-4">
          <div className="px-5 py-11 text-center border-bottom border-mercury">
            <div style={ { display: "inline-block" } } className="mb-4">
              <img className="circle-54" src="" alt="profile" />
            </div>
            <h4 className="mb-0">{ user.username } </h4>
            <p className="mb-8">
              {/*                  <a className="text-gray font-size-4"> { profile.role }</a>*/ }
            </p>
            <div className="icon-link d-flex align-items-center justify-content-center flex-wrap">
              <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                <i className="fab fa-linkedin-in" ></i>
              </a>
              <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                <i className="fab fa-facebook-f" ></i>
              </a>
              <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                <i className="fab fa-twitter" ></i>
              </a>
              <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                <i className="fab fa-dribbble" ></i>
              </a>
              <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                <i className="fab fa-behance" ></i>
              </a>
            </div>
          </div>
          <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-5">
            <h5 className="text-black-2 mb-8 font-size-5">Contact Info</h5>
            <div className="mb-7">
              <p className="font-size-4 mb-0">Location</p>
              {/*<h5 className=""> { profile.location }</h5>*/ }
            </div>
            <div className="mb-7">
              <p className="font-size-4 mb-0">E-mail</p>
              <h5 className=""> { user.email }</h5>
            </div>
            <div className="mb-7">
              <p className="font-size-4 mb-0">Phone</p>
              {/*                  <h5 className=""> { profile.phone ? profile.phone : '000000' }</h5>*/ }
            </div>
            <div className="mb-7">
              <p className="font-size-4 mb-0">Website</p>
              {/*                  <h5 className=""> { profile.website ? profile.website : '' }</h5>*/ }
            </div>
          </div>
        </div>
        { profile !== null &&
          (
            <div className="profileMiddlePane bg-white rounded-4 shadow-9">
              <div className="tab-content">
                <div className="tab-pane fade show active">
                  <div className="pr-xl-0 pr-xxl-14 p-5 px-xs-12 pt-7 pb-5">
                    <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">About
                      <span onClick={ e => changeAbout(e) } style={ { marginLeft: '10px', cursor: "pointer" } }><i className="fas fa-edit" ></i></span>
                      </h4>
                      { aboutEdit &&
                        <ProfileAbout profile ={profile}/>
                      }
                      { !aboutEdit &&
                        <form onSubmit ={onSubmit}> 
                          <textarea type="text" value = { profile.about } onChange={ onChange } style={ {   width:'-webkit-fill-available'}} name = "about" rows={5}/>
                          <input type="submit" value="Save"/>
                        </form>
                      }
                  </div>
                  </div>
              <div className="tab-pane fade show active">
                  <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
                    <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">Skills
                      <span onClick={ e => changeSkill(e) } style={ { marginLeft: '10px', cursor: "pointer" } }><i className="fas fa-edit"></i></span>
                    </h4>
                    <ul className="list-unstyled d-flex align-items-center flex-wrap">
                      { addSkills && 
                        <ProfileSkills profile= { profile }/>
                      }
                    { !addSkills &&
                      <form onSubmit={ onSubmit }>
                        <textarea value = { profile.skills } onChange={ onChange } style={{ width: '-webkit-fill-available' }} name="skills" rows= {5} />
                        <input type="submit" value="Save" />
                      </form>
                    }
                    </ul>
                  </div>
                  </div>
              <div className="tab-pane fade show active">
                  <div className="border-top p-5 pl-xs-12 pt-7 pb-5">
                    <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">Experience
                      <span onClick={ e => changeExperience(e) } style={ { marginLeft: '10px', cursor: "pointer" } }><i className="fas fa-edit"></i></span>
                    </h4>
                      <ProfileExperience profile = {profile}/>
                  </div>
                  </div>
                  {/* change experience with education */ }
              <div className="tab-pane fade show active">
                  <div className="border-top p-5 pl-xs-12 pt-7 pb-5">
                    <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">Education
                      <span onClick={ e => changeEducation(e) } style={ { marginLeft: '10px', cursor: "pointer" } }><i className="fas fa-edit"></i></span>
                    </h4>
                      <ProfileEducation profile = {profile}/>
                  </div>
                  </div>
                </div>
              </div>
            // </div>
          )
        }
        <div className="profileRightPane bg-white rounded-4 shadow-9">hello 3 test</div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileByID: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileByID }
)(Profile);
