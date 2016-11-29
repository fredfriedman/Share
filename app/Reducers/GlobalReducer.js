import {ADD_PATIENT,REMOVE_PATIENT,ASSIGN_CAREGIVER, NURSE_MESSAGE, PATIENT_MESSAGE, INITIALIZE_PATIENTS, INITIALIZE_NURSES} from '../actions/Actions';
import firebaseHelper from '../screens/CaregiverSettings/firebaseHelper';

initialState = {
	patients: {},
	nurses: {},
}

export default  function globalReducer(state = initialState, action){
	let f = new firebaseHelper();
	switch(action.type) {
		case ADD_PATIENT:
			f.createNewPatient(action.patientName, action.patientStatus);

		case REMOVE_PATIENT:
		case ASSIGN_CAREGIVER:
		case NURSE_MESSAGE:
		case PATIENT_MESSAGE:
		case INITIALIZE_PATIENTS:
			return {...state, patients: action.patientList}
		case INITIALIZE_NURSES:
			// console.log("NEW********************************************************************************************&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
			return  {...state, nurses: action.nurseList}
		default:
			return state
	}
}