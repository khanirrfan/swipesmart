import React from 'react';
import PropTypes from 'prop-types';

 const JobDescription = ({show, onClose}) => {
console.log(show);
if (!show) return null;
    return (
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
            
              <div className="modal-header">
                <h4 className="modal-title">Modal Heading</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              
              <div className="modal-body">
                Modal body..
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal" >Close</button>
              </div>
              
            </div>
          </div>
        </div>
    )
}
JobDescription.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};
export default JobDescription;