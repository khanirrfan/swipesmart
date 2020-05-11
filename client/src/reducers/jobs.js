import {
	JOB_PROFILE,
	JOB_ERROR,
	// CLEAR_PROFILE,
	// UPDATE_PROFILE,
	// GET_PROFILES,
	// GET_REPOS
} from '../actions/types';

const initialState = {
	jobs: null,
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
		// case GET_PROFILES:
		// 	return {
		// 		...state,
		// 		profiles: payload,
		// 		loading: false
		// 	};
		case JOB_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				jobs: null
			};
		// case CLEAR_PROFILE:
		// 	return {
		// 		...state,
		// 		profile: null,
		// 		repos: [],
		// 		loading: false
		// 	};
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
