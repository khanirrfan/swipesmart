import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileSkills = ({ profile: { skills } }) => {
    console.log(skills);
    return (
        <Fragment>
            { skills !== undefined && skills.length > 0 && skills.map((item, index) => {
                return (
                    <li className="" key={ index }>
                        <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">{ item }
                        </a>
                    </li>
                )
            })
            }
        </Fragment>
    )
}
ProfileSkills.propType = {
    profile: PropTypes.object.isRequired,
}

export default ProfileSkills;