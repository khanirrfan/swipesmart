import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { saveJob, rejectJob, applyJob } from '../../actions/jobs'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const JobItem = ({ item, item:{jobType}, saveJob, rejectJob, applyJob }) => {
console.log("item:", item)
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (

    <div className="jobs bg-white p-1 my-1">
      <div key={ item._id }>
        <p>jobtitle - { item.jobtitle }</p>
        <p>country - { item.country }</p>
        <p>salary - { item.salary }</p>
        <p> experience - { item.experience }</p>
        <p>visa - { item.visa }</p>
        <p>jd - { item.jobdescription }</p>
        <button type="button" className="btn btn-primary my-1" onClick={()=> saveJob(item)}>Save</button>
        <button className="btn btn-primary my-1" onClick={()=> rejectJob(item)}>Reject</button>
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
            <Button color="primary" disabled = {item.status === 'applied' } onClick= {() => applyJob(item)}>Apply {item.status}</Button>{ ' ' }
            <Button color="secondary" onClick={ toggle }>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}
JobItem.propTypes ={
saveJob: PropTypes.func.isRequired,
rejectJob: PropTypes.func.isRequired,
}


export default connect(null, {saveJob, rejectJob, applyJob})(JobItem);