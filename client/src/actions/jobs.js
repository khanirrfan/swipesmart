import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_JOB, GET_JOBS, GET_SAVED_JOBS, GET_REJECTED_JOBS, GET_APPLIED_JOBS, JOB_ERROR
} from './types';

// get all jobs

export const getJobs = () => async dispatch => {
    try {
        const res = await axios.get('/jobs');
        console.log(res);
    } catch (error) {
        
    }
}