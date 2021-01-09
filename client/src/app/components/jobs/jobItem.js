import React from 'react';
import { saveJob, rejectJob, applyJob, getMatchPercent } from '../../actions/jobs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

import { JobContainer, JobWrapper, JobCards, CompanyLogo, CompanyDetails, CompanyName, JobTitle, JobOverview, JobExperience, JobSalary, JobLocation, JobSkills, JobSkillsItem, JobCardFooter, JobCategory, JobPosted, JobSaveOption, LocationIcon, SalaryIcon, ExperienceIcon } from './jobItemElements';

const JobItem = ({ item, showDescription, auth: { user }, saveJob }) => {
    const handleSave = async e => {
        e.preventDefault();
        saveJob({ item, user });
    }
    if (user === null) {
        return (<Spinner />)
    } else {
        return (
            <>
                <JobContainer>
                    <JobWrapper to={ '/' + item._id } onClick={ showDescription } key={ item._id }>
                        <CompanyLogo>
                            <img alt="logo" />
                        </CompanyLogo>
                        <JobCards>
                            
                            <CompanyDetails>
                                <CompanyName>
                                    Enquero
                                </CompanyName>
                                <JobTitle>
                                    { item.jobtitle }
                                </JobTitle>
                                <JobOverview>
                                    <JobExperience><ExperienceIcon />3</JobExperience>
                                    <JobSalary><SalaryIcon />{ item.salary }</JobSalary>
                                    <JobLocation>
                                        <LocationIcon />
                                    Bengaluru</JobLocation>

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
                        <JobPosted>
                            4 Days ago
                     </JobPosted>
                        {
                            item.status === 'Applied' ? (<JobSaveOption>Cover Letter</JobSaveOption>) : (<JobSaveOption onClick={ e => handleSave(e) }>Save</JobSaveOption>)
                        }
                    </JobCardFooter>
                </JobContainer>
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
