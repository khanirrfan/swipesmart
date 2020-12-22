import {
	GET_PROFILE,
	GET_USER_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	GET_PROFILES,
	GET_REPOS
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	console.log('payload:', action);
	// console.log(typeof(action.payload))
	// for (var key in action.payload) {
	// 	if (!hasOwnProperty.call(action.payload, key)) {
	// 		console.log('empty')
	// 		return action.payload = null;
	// 	};
	// }
	switch (type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
		case GET_USER_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false
			};	
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				profile: null
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				repos: [],
				loading: false
			};
		case GET_REPOS:
			return {
				...state,
				repos: payload,
				loading: false
			};
		default:
			return state;
	}
}
