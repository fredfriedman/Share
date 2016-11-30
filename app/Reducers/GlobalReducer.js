import {ADD_PATIENT,REMOVE_PATIENT,ASSIGN_CAREGIVER, NURSE_MESSAGE, PATIENT_MESSAGE, INITIALIZE_PATIENTS, INITIALIZE_CAREGIVERS} from '../actions/Actions';
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