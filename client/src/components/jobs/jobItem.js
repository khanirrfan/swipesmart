import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { saveJob, rejectJob, applyJob } from '../../actions/jobs'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
const JobItem = ({ item, item:{jobType}, auth: {user}, saveJob, rejectJob, applyJob }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handlesave = async e => {
    e.preventDefault();
    saveJob({item, user});
  }
  const handleReject = async e => {
    e.preventDefault();
    rejectJob({item, user});
  }
  const handleApply = async e => {
    e.preventDefault();
    applyJob({item, user});
  }
if(user === null) {
  return (
    <Spinner />
  )
} else {
  console.log("user:", user._id)
  return (

    <div className="jobs bg-white p-1 my-1">
      <div key={ item._id }>
        <p>jobtitle - { item.jobtitle }</p>
        <p>country - { item.country }</p>
        <p>salary - { item.salary }</p>
        <p> experience - { item.experience }</p>
        <p>visa - { item.visa }</p>
        <p>jd - { item.jobdescription }</p>
        <button type="button" className="btn btn-primary my-1" onClick={e=> handlesave(e)}>Save</button>
        <button className="btn btn-primary my-1" onClick={e=> handleReject(e)}>Reject</button>
        <button className="btn btn-primary my-1" onClick={ toggle }>View JD</button>
      </div>
      <div>
        <Modal job= {item} isOpen={ modal } >
          <ModalHeader toggle={ toggle }>
          <p>{item.jobtitle}</p>
          <p>{item.country}</p>
          </ModalHeader>
          <ModalBody className="modal-dialog">          
          <p>{item.country}</p>
          <p>Jobtype - {jobType}</p>
          <p>{item.salary}</p>
          <p>{item.jobdescription}</p>
          <p>Experience: <br></br>
            <ul>
            <li>1</li>
            <li>2</li>
            <li>2</li>
            </ul>
          </p>
          <p>Education:
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            </ul>
          </p>
        </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled = {item.status === 'applied' } onClick= {e => handleApply(e)}>Apply {item.status}</Button>{ ' ' }
            <Button color="secondary" onClick={ toggle }>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}
}
JobItem.propTypes ={
saveJob: PropTypes.func.isRequired,
rejectJob: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {saveJob, rejectJob, applyJob})(JobItem);