import axios from 'axios';
import { PROFILE_ERROR, GET_PROFILE } from './types';

// get all jobs
export const getJobs = () => async dispatch => {
    try {
        const res = await axios.get('/jobs');
        console.log(res.data);
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status }
        });
    }
};