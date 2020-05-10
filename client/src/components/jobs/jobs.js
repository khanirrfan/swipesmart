import React, { useEffect, Fragment } from 'react';
import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import {getJobs} from '../../actions/jobs';
const Jobs = ({getJobs, auth: { user }, jobs: { job, loading }}) => {
    useEffect(() => {
        getJobs();
    },[getJobs])
    return loading && job === null ? (
        <Spinner />
    ):(
        <Fragment>
            Hello
        </Fragment>
    )
}
const mapStateToProps = state => ({
    auth: state.auth,
    jobs: state.jobs
  });
export default connect(
    mapStateToProps, 
    {getJobs}
) (Jobs)