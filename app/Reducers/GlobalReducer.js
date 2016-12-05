import {
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	ADD_PATIENT,
	REMOVE_PATIENT,
	ASSIGN_CAREGIVER,
	NURSE_MESSAGE,
	PATIENT_MESSAGE,
	INITIALIZE_PATIENTS,
	INITIALIZE_CAREGIVERS
	} from '../actions/Actions';

import firebaseHelper from '../screens/CaregiverSettings/firebaseHelper';

initialState = {
	patients: {},
	nurses: {},
}

let cloneObj = function(obj){
	return JSON.parse(JSON.stringify(obj))
}

let newState = { user: { loggedIn: false } };

export default function globalReducer(state = initialState, action){
	let f = new firebaseHelper();
	console.log("REDUCER", action, state)
	switch(action.type) {
		case LOGIN_SUCCESS:
			return {...state, user: action.payload};
		case LOGIN_ERROR:
		case ADD_PATIENT:
			console.log("*********************");
			console.log(action.patientName);
			console.log(action.patientStatus);
			f.createNewPatient(action.patientName, action.patientStatus);

		case REMOVE_PATIENT:
			f.setPatientInactive(action.patientId);

		case ASSIGN_CAREGIVER:
		case NURSE_MESSAGE:
		case PATIENT_MESSAGE:
		case INITIALIZE_PATIENTS:
			return {...state, patients: action.patientList}
		case INITIALIZE_CAREGIVERS:
			return  {...state, caregivers: action.caregiverList}
		default:
			return state
	}
}
