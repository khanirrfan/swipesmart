import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: { about }
}) => (
    <Fragment>
      {about && (
        <Fragment>
          <p className="font-size-4 mb-8">{ about }</p>
        </Fragment>
      ) }
    </Fragment>
  );

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
