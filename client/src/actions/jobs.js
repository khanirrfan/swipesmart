import axios from 'axios';
import { GET_JOBS, JOB_ERROR } from './types';

// get all jobs
export const getJobs = () => async dispatch => {
    try {
        const res = await axios.get('/jobs');
        console.log(res.data);
        dispatch({
            type:GET_JOBS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type:JOB_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status }
        });
    }
};