import React from 'react';
import { saveJob, rejectJob, applyJob, getMatchPercent } from '../../actions/jobs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

import { JobContainer, JobWrapper, JobCards, CompanyLogo, CompanyDetails, CompanyName, JobTitle, JobOverview, JobExperience, JobSalary, JobLocation, JobSkills, JobSkillsItem, JobCardFooter, JobCategory } from './jobItemElements';

const JobItem = ({ item, showDescription, auth: { user } }) => {

    if (user === null) {
        return (<Spinner />)
    } else {
        return (
            <>
            <JobContainer>
                <JobWrapper>
                    <JobCards>
                     <CompanyLogo>
                     <img alt = "logo"/>
                     </CompanyLogo>
                     <CompanyDetails> 
                        <CompanyName>
                            Enquero
                        </CompanyName>
                        <JobTitle>
                        Sr Software Engineer
                        </JobTitle>
                        <JobOverview>
                            <JobExperience>3</JobExperience>
                            <JobSalary>1000000</JobSalary>
                            <JobLocation>Bengaluru</JobLocation>
                            
                        </JobOverview>
                                <JobSkills>
                                    { item.skills.map((skill, index) => {
                                        return (
                                            <JobSkillsItem
                                                key={ index }>
                                                { skill }
                                            </JobSkillsItem>
                                        )
                                    })
                                    }
                                </JobSkills>
                     </CompanyDetails>    
                     
                    </JobCards>
                        
                </JobWrapper>
                    <JobCardFooter>
                        <JobCategory>
                            Premium
                     </JobCategory>
                    </JobCardFooter>
            </JobContainer>

     <div className="jobs bg-white p-1 my-2">
                <div className="jobDetails" onClick={ showDescription } key={ item._id }>
                    <a href={ '/' + item._id } role="tab" data-toggle="tab">
                        <div className="row p-1">
                            <div className="company-logo">
                                <img href="" alt="logo">
                                </img>
                            </div>
                            <div className="jobTitle">
                                <p className="font-size-6">{ item.jobtitle } </p>
                                <span>company name</span>
                            </div>
                            <div className="jobSalary">
                                <span className="font-size-7">
                                    { item.salary }
                                </span>
                            </div>
                        </div>
                        <div className="row p-1" style={{flexWrap:"wrap"}}>
                                { item.skills.map((skill, index) => {
                                    return (
                                        <span style={ {
                                            margin: "1%",
                                            padding: ".5rem",
                                            backgroundColor: "#eee",
                                            borderRadius: "5px"
                                        } }
                                            key={ index }>
                                            { skill }
                                        </span>
                                    )
                                })
                                }
                        </div>
                    </a>
                    { item.status === 'Applied' &&
                        <div className="row p-1">
                            <button className="btn btn-info">Cover letter</button>
                        </div>
                    }
                </div>
                </div>
                </>
        )
    }
}
JobItem.propTypes = {
    saveJob: PropTypes.func.isRequired,
    rejectJob: PropTypes.func.isRequired,
    getMatchPercent: PropTypes.func.isRequired,
    applyJob: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    jobs: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    jobs: state.jobs
})

export default connect(mapStateToProps, { saveJob, rejectJob, applyJob, getMatchPercent })(JobItem);
