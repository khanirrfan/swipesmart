import React from 'react';
import { saveJob, rejectJob, applyJob, getMatchPercent } from '../../actions/jobs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
const JobItem = ({ item, showDescription, auth: { user }}) => {

    if (user === null) {
        return (<Spinner />)
    } else {
        return (
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
                        <div className="row p-1">
                            <div style={ { width: "50%" } }>
                                { item.skills.map((skill, index) => {
                                    return (
                                        <span style={ {
                                            margin: "1%",
                                            padding: ".5rem",
                                            backgroundColor: "#eee",
                                            borderRadius: "5px",
                                            width: "100%"
                                        } }
                                            key={ index }>
                                            { skill }
                                        </span>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </a>
                </div>
            </div>
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
