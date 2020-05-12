import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { saveJob, rejectJob, applyJob } from '../../actions/jobs'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const JobItem = ({ item, saveJob, rejectJob, applyJob }) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
console.log("item:", item);
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
        <Modal isOpen={ modal } toggle={ toggle } >
          <ModalHeader toggle={ toggle }>Modal title</ModalHeader>
          <ModalBody className="modal-dialog">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            m ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick= {() => applyJob(item)}>Do Something</Button>{ ' ' }
            <Button color="secondary" onClick={ toggle }>Cancel</Button>
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