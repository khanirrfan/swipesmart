import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { saveJob, rejectJob, applyJob, getMatchPercent } from '../../actions/jobs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
const JobItem = ({ item, item: { jobType }, auth: { user }, jobs, saveJob, rejectJob, applyJob, getMatchPercent }) => {
    const [modal, setModal] = useState(false);
    const toggle = async e => {
        e.preventDefault();
        setModal(!modal)
        getMatchPercent({ item, user })
    };
    const handlesave = async e => {
        e.preventDefault();
        saveJob({ item, user });
    }
    const handleReject = async e => {
        e.preventDefault();
        rejectJob({ item, user });
    }
    const handleApply = async e => {
        e.preventDefault();
        applyJob({ item, user });
    }
    if (user === null) {
        return (<Spinner />)
    } else {
        return (
            <div className="jobs bg-white p-1 my-2">
                <div className="jobDetails" key={ item._id }>

                    <div className="row p-1">
                        <div className="company-logo">
                            company-logo
                    </div>
                        <div className="jobTitle">
                            <a className="font-size-6">{ item.jobtitle } </a>
                            <br></br>
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
                </div>
            </div>
            //     <div className="jobs bg-white p-1 my-1">
            //         <div className="jobDetails" key={ item._id }>
            //             <p> jobtitle - { item.jobtitle } </p>
            //             <p> country - { item.country } </p>
            //             <p> salary - { item.salary } </p>
            //             <p> experience - { item.experience } </p>
            //             <p> visa - { item.visa } </p>
            //             <p> jd - { item.jobdescription } </p>
            //             <button type="button" className="btn btn-primary my-1"
            //                 onClick={ e => handlesave(e) }> Save </button>
            //             <button className="btn btn-primary my-1"
            //                 onClick={ e => handleReject(e) }> Reject </button>
            //             <button className="btn btn-primary my-1"
            //                 onClick={ e => toggle(e) }> View JD </button>
            //         </div>
            //         {
            //             item.status === 'applied' &&
            //             <div className="docsRequired">
            //                 <Button className="btn btn-secondary my-1"> Upload Cover Letter </Button>
            //                 <Button className="btn btn-secondary my-1"> Complete Profile </Button>
            //                 <Button className="btn btn-secondary my-1"> Upload Docs </Button>
            //             </div>
            //         }
            //         <Modal job={ item }
            //             isOpen={ modal }>
            //             <ModalHeader toggle={ toggle }>
            //                 <p> { item.jobtitle } </p>
            //                 <p> { item.country } </p>
            //             </ModalHeader>
            //             <ModalBody className="modal-dialog">
            //                 <p> { item.country } </p>
            //                 <p> Jobtype - { jobType } </p>
            //                 <p> { item.salary } </p>
            //                 <p> { item.jobdescription } </p>
            //                 <div> Experience:
            // <ul>
            //                         <li> 1. Experience 1 </li>
            //                         <li> 2. Experience 2 </li>
            //                         <li> 3. Experience 3 </li>
            //                     </ul>
            //                 </div>
            //                 <div> Education:
            //     <ul>
            //                         <li> 1. Education 1 </li>
            //                         <li> 2. Education 2 </li>
            //                         <li> 3. Education 3 </li>
            //                     </ul>
            //                 </div>
            //             </ModalBody>
            //             <ModalFooter>
            //                 <p> Job relevant : {jobs.matchPercent}</p>
            //                 <Button color="primary"
            //                     disabled={ item.status === 'applied' }
            //                     onClick={ e => handleApply(e) }> Apply </Button>{ ' ' }
            //                 <Button color="secondary"
            //                     onClick={ toggle }> Close </Button>
            //             </ModalFooter> </Modal>
            //     </div>

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
