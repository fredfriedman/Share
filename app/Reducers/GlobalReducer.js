/*import {
	LOGIN_SUCCESS,
	ADD_PATIENT,
	REMOVE_PATIENT,
	ASSIGN_CAREGIVER,
	NURSE_MESSAGE,
	PATIENT_MESSAGE,
	INITIALIZE_PATIENTS,
	INITIALIZE_CAREGIVERS,

} from '../actions/Actions';*/

const {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,

	REGISTER_NURSE_REQUEST,
    REGISTER_NURSE_SUCCESS,
    REGISTER_NURSE_FAILURE,

	REGISTER_CAREGIVER_REQUEST,
    REGISTER_CAREGIVER_SUCCESS,
    REGISTER_CAREGIVER_FAILURE,

	SUCCESS,
    FAILURE,
    REQUESTING,

} = require('../lib/constants').default

import firebaseHelper from '../screens/CaregiverSettings/firebaseHelper';

initialState = {
	user: null,
}

let cloneObj = function(obj){
	return JSON.parse(JSON.stringify(obj))
}

let newState = { user: { loggedIn: false } };

export default function globalReducer(state = initialState, action){
	console.log("REDUCER", action)
	switch(action.type) {
		case LOGIN_REQUEST:
			return {...state, state: {type: REQUESTING}, user: null}
		case LOGIN_SUCCESS:
			return {...state, state: {type: SUCCESS}, user: action.payload}
		case LOGIN_FAILURE:
			return {...state, state: {type: FAILURE, error: action.payload.code}, user: null}
		case REGISTER_CAREGIVER_REQUEST:
			return {...state, state: {type: REQUESTING, result: "ok"}, user: null}
		case REGISTER_CAREGIVER_SUCCESS:
			return {...state, state: {type: SUCCESS, result: action.payload}, user: action.payload}
		case REGISTER_CAREGIVER_FAILURE:
			return {...state, state: {type: FAILURE, result: action.payload.code}, user: null}
		case REGISTER_NURSE_REQUEST:
			return {...state, state: {type: REQUESTING, result: "ok"}, user: null}
		case REGISTER_NURSE_SUCCESS:
			return {...state, state: {type: SUCCESS, result: action.payload}, user: action.payload}
		case REGISTER_NURSE_FAILURE:
			return {...state, state: {type: FAILURE, result: action.payload.code}, user: null}
		/*case ADD_PATIENT:
			let f = new firebaseHelper();
			console.log("*********************");
			console.log(action.patientName);
			console.log(action.patientStatus);
			f.createNewPatient(action.patientName, action.patientStatus);

		case REMOVE_PATIENT:
			let v = new firebaseHelper();
			v.setPatientInactive(action.patientId);

		case ASSIGN_CAREGIVER:
		case NURSE_MESSAGE:
		case PATIENT_MESSAGE:
		case INITIALIZE_PATIENTS:
			return {...state, patients: action.patientList}
		case INITIALIZE_CAREGIVERS:
			return  {...state, caregivers: action.caregiverList}*/
		default:
			return state
	}
}
