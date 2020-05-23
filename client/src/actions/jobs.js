import axios from 'axios';
import { JOB_ERROR, JOB_PROFILE, APPLIED_JOB, REJECTED_JOB, SAVED_JOBS, ADD_JOB, MATCH_PERCENT, MATCH_ERROR } from './types';
import { setAlert } from './alert';

// get all jobs
export const getJobs = () => async dispatch => {
    try {
        const res = await axios.get('/jobs');
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
export const saveJob = ({item, user}) => async dispatch => {
    try {
        await axios.post(`/savejob/${user._id}`, item);
        dispatch(setAlert('job saved successfully', 'success'));
    } catch (err) {
        dispatch({
            type:JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}
// reject job
export const rejectJob = ({item, user}) => async dispatch => {
    try {
        await axios.post(`/rejectjob/${user._id}`, item);
        dispatch(setAlert('You have reject this job', 'success'));
    } catch (err) {
        dispatch({
            type:JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// apply job
export const applyJob = ({item, user}) => async dispatch => {
    item.status = 'applied'
    try {
        await axios.post(`/appliedjob/${user._id}`, item);
        dispatch(setAlert('You have successfully applied to this job', 'success'));
    } catch (err) {
        dispatch({
            type:JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// get applied job
export const appliedJobs = userId => async dispatch => {
    try {
        const res = await axios.get(`/getappliedjobs/${userId}`);
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
export const getRejectedJobs = userId => async dispatch => {
    try {
        const res = await axios.get(`/getrejectedjobs/${userId}`);
        dispatch({
            type:REJECTED_JOB,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:JOB_ERROR,
            payload: { msg: err.statusText, status: err.status}
        })
    }
}

// get saved job
export const getSavedJobs = userId => async dispatch => {
    try {
        const res = await axios.get(`/getsavedjobs/${userId}`);
        dispatch({
            type:SAVED_JOBS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:JOB_ERROR,
            payload: { msg: err.statusText, status: err.status}
        })
    }
}
// getMatchPercent

export const getMatchPercent = ({item, user}) => async dispatch => {
    console.log(user._id);
    console.log(item._id);
 try {
    const res = await axios.get(`/matchPercent/${user._id}/${item._id}`);
    
    dispatch({
        type:MATCH_PERCENT,
        PAYLOAD:res.data
    })
 } catch (err) {
    dispatch({
        type:MATCH_ERROR,
        payload: { msg: err.statusText, status: err.status}
    })
 }
}

// create job
export const addJob = ({formData}) => async dispatch => {
const config = {
    headers: {
        'Contente-Type': 'application/json',
        
    }
};
   try {
       const res = await axios.post('/addjob', formData, config);
       dispatch({
           type:ADD_JOB,
           payload: res.data
       })
       dispatch(setAlert('Job created successfully', 'success'));
       dispatch(getJobs())
   } catch (error) {
       
   }
}