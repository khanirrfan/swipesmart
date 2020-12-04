import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from '../dashboard/DashboardActions';
import { getProfileByID } from '../../actions/profile';

const Profile = ({
  profile: { profile, loading },
  auth: { user },
  match,
  getProfileByID
}) => {
  useEffect(() => {
    getProfileByID(match.params.id);
  }, [getProfileByID, match.params.id]);

  const changeAbout = e => {
    console.log('about edit button clicked');
  }
  const changeSkill = e => {
    console.log('skills edit button changed');
  }
  const changeExperience = e => {
    console.log('experience edit button clicked');
  }
  const changeEducation = e => {
    console.log('education edit button changed');
  }
  if (user && user.experience === null) {
    return (
      <DashboardActions />
    )
  } else
    return (
      <Fragment>
        { profile !== null ?
          (<div className="container1 row">
            <div className="profileLeftPane bg-white shadow-9 rounded-4">
              <div className="px-5 py-11 text-center border-bottom border-mercury">
                <div style={ { display: "inline-block" } } className="mb-4">
                  <img className="circle-54" src="" alt="profile" />
                </div>
                <h4 className="mb-0">{ profile.firstname } { profile.lastname }</h4>
                <p className="mb-8">
                  <a className="text-gray font-size-4"> { profile.role }</a>
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
                  <h5 className=""> { profile.location }</h5>
                </div>
                <div className="mb-7">
                  <p className="font-size-4 mb-0">E-mail</p>
                  <h5 className=""> { profile.email }</h5>
                </div>
                <div className="mb-7">
                  <p className="font-size-4 mb-0">Phone</p>
                  <h5 className=""> { profile.phone ? profile.phone : '000000' }</h5>
                </div>
                <div className="mb-7">
                  <p className="font-size-4 mb-0">Website</p>
                  <h5 className=""> { profile.website ? profile.website : '' }</h5>
                </div>
              </div>
            </div>
            <div className="profileMiddlePane bg-white rounded-4 shadow-9">
              <div className="tab-content">
                <div className="tab-pane fade show active">
                  <div className="pr-xl-0 pr-xxl-14 p-5 px-xs-12 pt-7 pb-5">
                    <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">About 
                      <span onClick={ e => changeAbout(e) } style={ { marginLeft: '10px', cursor: "pointer" } }><i className="fas fa-edit" ></i></span></h4>
                    <p className="font-size-4 mb-8">{ profile.about }</p>
                  </div>
                  <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
                    <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">Skills
                      <span onClick = {e => changeSkill(e)} style={ { marginLeft: '10px', cursor:"pointer" } }><i className="fas fa-edit"></i></span>
                    </h4>
                    <ul className="list-unstyled d-flex align-items-center flex-wrap">
                      { profile.skills.map((item, index) => {
                        return (
                          <li className="" key={ index }>
                            <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">{ item }
                            </a>
                          </li>
                        )
                      })

                      }
                    </ul>
                  </div>
                  <div className="border-top p-5 pl-xs-12 pt-7 pb-5">
                    <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">Experience
                      <span onClick={ e => changeExperience(e) } style={ { marginLeft: '10px', cursor: "pointer" } }><i className="fas fa-edit"></i></span>
                    </h4>
                    {
                      profile.experience.map((item, index) => {
                        return (
                          <div className="w-100" key={ index }>
                            <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                              <div className="square-72 d-block mr-8 mb-7 mb-sm-0">
                                <img src="" alt="logo" />
                              </div>
                              <div className="w-100 mt-n2">
                                <h3 className="mb-0">
                                  <a className="font-size-6 text-black-2 font-weight-semibold">
                                    { item.title }
                                  </a>
                                </h3>
                                <a className="font-size-4 text-default-color line-height-2">{ item.company }</a>
                                <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                                  <a href="" className="font-size-4 text-gray mr-5">{ item.period }</a>
                                  <a href="" className="font-size-3 text-gray"><span className="mr-4" style={ { marginTop: '2px' } }>
                                    <img src="" />
                                    { item.location }
                                  </span></a>
                                </div>
                              </div>
                            </div>
                          </div>)
                      })

                    }
                  </div>
                  {/* change experience with education */ }
                  <div className="border-top p-5 pl-xs-12 pt-7 pb-5">
                    <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">Education
                      <span onClick={ e => changeEducation(e) } style={ { marginLeft: '10px', cursor: "pointer" } }><i className="fas fa-edit"></i></span>
                    </h4>
                    {
                      profile.experience.map((item, index) => {
                        return (
                          <div className="w-100" key={ index }>
                            <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                              <div className="square-72 d-block mr-8 mb-7 mb-sm-0">
                                <img src="" alt="logo" />
                              </div>
                              <div className="w-100 mt-n2">
                                <h3 className="mb-0">
                                  <a className="font-size-6 text-black-2 font-weight-semibold">
                                    { item.title }
                                  </a>
                                </h3>
                                <a className="font-size-4 text-default-color line-height-2">{ item.company }</a>
                                <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                                  <a className="font-size-4 text-gray mr-5">{ item.period }</a>
                                  <a className="font-size-3 text-gray"><span className="mr-4" style={ { marginTop: '2px' } }>
                                    <img src="" />
                                    { item.location }
                                  </span></a>
                                </div>
                              </div>
                            </div>
                          </div>)
                      })

                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="profileRightPane">hello 3 test</div>
          </div>) : (
            <Fragment>
              Profile not found
            </Fragment>
          ) }
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
