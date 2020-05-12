import axios from 'axios';
import { JOB_ERROR, JOB_PROFILE, APPLIED_JOB, REJECTED_JOB, SAVED_JOBS } from './types';
import { setAlert } from './alert';

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

// save job
export const saveJob = (item) => async dispatch => {
    console.log(item);
    try {
        await axios.post('/savejob', item);
        dispatch(setAlert('job saved successfully', 'success'));
    } catch (err) {
        dispatch({
            type:JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}
// reject job
export const rejectJob = (item) => async dispatch => {
    console.log(item);
    try {
        await axios.post('/rejectjob', item);
        dispatch(setAlert('You have reject this job', 'success'));
    } catch (err) {
        dispatch({
            type:JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// apply job
export const applyJob = (item) => async dispatch => {
    console.log(item);
    item.status = 'applied'
    try {
        await axios.post('/appliedjob', item);
        dispatch(setAlert('You have successfully applied to this job', 'success'));
    } catch (err) {
        dispatch({
            type:JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// get applied job
export const appliedJobs = () => async dispatch => {
    try {
        const res = await axios.get('/getappliedjobs');
        console.log("response:", res.data)
        dispatch({
            type:APPLIED_JOB,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// get REJECTED job
export const getRejectedJobs = () => async dispatch => {
    try {
        const res = await axios.get('/getrejectedjobs');
        console.log("response:", res.data)
        dispatch({
            type:REJECTED_JOB,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// get saved job
export const getSavedJobs = () => async dispatch => {
    try {
        const res = await axios.get('/getsavedjobs');
        console.log("response:", res)
        dispatch({
            type:SAVED_JOBS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}