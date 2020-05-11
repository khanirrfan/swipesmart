import axios from 'axios';
import { JOB_ERROR, JOB_PROFILE } from './types';

// get all jobs
export const getJobs = () => async dispatch => {
    try {
        const res = await axios.get('/jobs');
        console.log(res.data);
        dispatch({
            type:JOB_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type:JOB_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status }
        });
    }
};