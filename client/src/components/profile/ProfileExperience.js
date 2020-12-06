import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileExperience = ({
  profile: { experience }
}) => {
  return(
    <Fragment>
      { experience !== undefined && experience.length > 0 &&
        experience.map((item, index) => {
          return (
            <div className="w-100" key={ index }>
              <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                <div className="square-72 d-block mr-8 mb-7 mb-sm-0">
                  <img src="" alt="logo" />
                </div>
                <div className="w-100 mt-n2">
                  <h3 className="mb-0">
                    <a className="font-size-6 text-black-2 font-weight-semibold">
                      { item.title }
                    </a>
                  </h3>
                  <a className="font-size-4 text-default-color line-height-2">{ item.company }</a>
                  <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                    <a href="" className="font-size-4 text-gray mr-5">{ item.period }</a>
                    <a href="" className="font-size-3 text-gray"><span className="mr-4" style={ { marginTop: '2px' } }>
                      <img src="" />
                      { item.location }
                    </span></a>
                  </div>
                </div>
              </div>
            </div>)
        })
      }
    </Fragment>)
    };

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileExperience;
