import React, { Fragment, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import Modal from './jobDescription';

const JobItem = ({ item }) => {
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
        <button type="button" className="btn btn-primary my-1">Save</button>
        <button className="btn btn-primary my-1">Reject</button>
        <button className="btn btn-primary my-1" onClick={toggle}>View JD</button>
      </div>
      <div>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody className="modal-dialog">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          m ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
    </div>
  )
}
export default JobItem;