import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMatchPercent, applyJob, saveJob } from '../../actions/jobs';

const JobDescription = ({ item, auth: { user }, closeJD, matchPercent, applyJob, saveJob, getMatchPercent }) => {

  useEffect(() => {
    getMatchPercent({ item, user })
  }, [getMatchPercent, item, user])

  const handleApply = async e => {
    e.preventDefault();
    item.status = 'Applied'
    applyJob({ item, user });
  }
  const handleSave = async e => {
    e.preventDefault();
    saveJob({ item, user });
  }
  return (
    <>
      <div className="jobs bg-white p-1 my-2" >
        <div className="jobDetails" >
          <div className="border-bottom border-width-1 border-default-color">
            <div className="row p-1">
              <div className="company-logo">
                company-logo
                  </div>
              <div className="jobTitle">
                <a className="font-size-6">{ item.jobtitle } </a>
                <span>company name</span>
              </div>
              <div className="jobSalary">
                { matchPercent !== null &&
                  <span className="font-size-5">
                    Job relevant:{ matchPercent }%
                </span> }
              </div>
            </div>
            <div className="row p-1">
              <button style={ { width: "30%", marginRight: "1%" } } onClick={ e => handleApply(e) }>
                Apply to this job
              </button>
              <button style={ { width: "20%", marginLeft: "1%" } } onClick={ e => handleSave(e) }>
                Save Job
              </button>
              <button style={ { width: "20%", marginLeft: "1%" } } onClick={ closeJD }>Close</button>
            </div>
          </div>
          <div className='job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts'>
            <div className="row mb-7">
              <div className="col-md-4 mb-md-0 mb-6">
                <div className="media justify-content-md-start">
                  <div className="image mr-5">
                    <img />
                  </div>
                  <p className="font-weight-semibold font-size-5 text-black-2 mb-0">{item.salary}</p>
                </div>
              </div>
              <div className="col-md-4 pr-lg-0 pl-lg-10 mb-md-0 mb-6">
                <div className="media justify-content-md-start">
                  <div className="image mr-5">
                    <img />
                  </div>
                  <p className="font-weight-semibold font-size-5 text-black-2 mb-0">Full time</p>
                </div>
              </div>
              <div className="col-md-4 pl-lg-0">
                <div className="media justify-content-md-start">
                  <div className="image mr-5">
                    <img />
                  </div>
                  <p className="font-weight-semibold font-size-5 text-black-2 mb-0">Exp : {item.experience} <br className="d-md-none d-lg-block d-block"></br>Work Permit : {item.visa}</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-lg-0 mb-10">
                <div className="">
                  <span className="font-size-4 d-block mb-4 text-gray">Career level</span>
                  <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">Project Manager</h6>
                </div>
                <div className="tags">
                  <p className="font-size-4 text-gray mb-0"> skills</p>
                  <ul className="list-unstyled mr-n3 mb-0">
                    {
                      item.skills.map((item, index) => {
                        return (
                          <li key={ index } className="d-block font-size-4 text-black-2 mt-2">
                            <span className="d-inline-block mr-2">{ item }</span>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>

              </div>
              <div className="col-md-4 pr-lg-0 pl-lg-10 mb-lg-0 mb-8">
                <div className="">
                  <span className="font-size-4 d-block mb-4 text-gray">Industry Type</span>
                  <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9"> Information technology</h6>
                </div>

              </div>
              <div className="col-md-4 pl-lg-0">
                <div className="">
                  <span className="font-size-4 d-block mb-4 text-gray">Company size</span>
                  <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9"> 100-200</h6>
                </div>
              </div>
            </div>
          </div>
          <div className='job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts'>
            <div className="row">
              <div className="col-xl-11 col-md-12 pr-xxl-9 pr-xl-10 pr-lg-20">
                <div className="">
                  <p className="mb-4 font-size-4 text-gray"> Job Description</p>
                  <p className="font-size-4 text-black-2 mb-7">{item.jobdescription}</p>
                </div>
                <div className="">
                  <span className="font-size-4 font-weight-semibold text-black-2 mb-7"> Job Role</span>
                  <p className="font-size-4 text-black-2 mb-7">{ item.jobdescription }</p>
                  <span className="font-size-4 font-weight-semibold text-black-2 mb-7"> Your Resposobilities</span>
                  <ul className="list-unstyled">
                    <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-2">
                      <span className="d-inline-block mr-7">•</span>Contribute new controls or design improvements to our
                        </li>
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
JobDescription.propTypes = {
  applyJob: PropTypes.func.isRequired,
  saveJob: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getMatchPercent: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  jobs: state.jobs,
  auth: state.auth,
  matchPercent: state.jobs.matchPercent
});
export default connect(mapStateToProps, { applyJob, saveJob, getMatchPercent })(JobDescription);