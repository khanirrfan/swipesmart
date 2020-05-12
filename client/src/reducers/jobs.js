import {
	JOB_PROFILE,
	JOB_ERROR,
	APPLIED_JOB,
	REJECTED_JOB,
	SAVED_JOBS
	// CLEAR_PROFILE,
	// UPDATE_PROFILE,
	// GET_PROFILES,
	// GET_REPOS
} from '../actions/types';

const initialState = {
	jobs: null,
	jobsApplied: null,
	jobsRejected:null,
	jobsSaved:null,
	profiles: [],
	repos: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case JOB_PROFILE:
		// case UPDATE_PROFILE:
			return {
				...state,
				jobs: payload,
				loading: false
			};
		case APPLIED_JOB:
			return {
				...state,
				jobsApplied: payload,
				loading: false
			};
		case JOB_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				jobs: null
			};
		case REJECTED_JOB:
			return {
				...state,
				jobsRejected:payload,
				loading: false
			}	
		case SAVED_JOBS:
			return {
				...state,
				jobsSaved: payload,
				loading: false
			};
		// case GET_REPOS:
		// 	return {
		// 		...state,
		// 		repos: payload,
		// 		loading: false
		// 	};
		default:
			return state;
	}
}
