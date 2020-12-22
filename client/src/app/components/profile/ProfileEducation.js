import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileEducation = ({
  profile: { education }
}) => {
  return (
    <Fragment>
      { education !== undefined && education.length > 0 ?
        (education.map((item, index) => {
          return (
            <div className="w-100" key={ index }>
              <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                <div className="square-72 d-block mr-8 mb-7 mb-sm-0">
                  <img src="" alt="logo" />
                </div>
                <div className="w-100 mt-n2">
                  <h3 className="mb-0">
                    <a className="font-size-6 text-black-2 font-weight-semibold">
                      { item.collegename }
                    </a>
                  </h3>
                  <a className="font-size-4 text-default-color line-height-2">{ item.stream }</a>
                  <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                    <a className="font-size-4 text-gray mr-5">{ item.graduationyear }</a>

                  </div>
                </div>
              </div>
            </div>)
        })
        ):(
          <Fragment>
          Add you academic qualifications.
          </Fragment>
        )

      }
    </Fragment>
  )
    };

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileEducation;
