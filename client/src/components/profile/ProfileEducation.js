import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileEducation = ({
  education: { stream, collegename, graduationyear, to, from, current }
}) => (
    <div>
      <h3 className="text-dark">{ collegename }</h3>
      <p>
        <Moment format="YYYY/MM/DD">{ moment.utc(from) }</Moment> -{ ' ' }
        { !to ? ' Now' : <Moment format="YYYY/MM/DD">{ moment.utc(to) }</Moment> }
      </p>

      <p>
        <strong>Field Of Study: </strong> { stream }
      </p>
    </div>
  );

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
