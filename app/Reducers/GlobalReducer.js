import {ADD_PATIENT,REMOVE_PATIENT,ASSIGN_CAREGIVER, NURSE_MESSAGE, PATIENT_MESSAGE, INITIALIZE_PATIENTS, INITIALIZE_CAREGIVERS, NURSE_ASSIGN_PATIENT} from '../actions/Actions';
import firebaseHelper from '../screens/CaregiverSettings/firebaseHelper';

initialState = {
	patients: {},
	nurses: {},
}

export default  function globalReducer(state = initialState, action){
	let f = new firebaseHelper();
	switch(action.type) {
		case ADD_PATIENT:
			patientId = f.createNewPatient(action.patientName, action.patientStatus);
			f.nurseAssignPatient(action.nurseId, patientId);

		case REMOVE_PATIENT:
			f.setPatientInactive(action.patientId);
		case NURSE_ASSIGN_PATIENT:
			//add patient to nurse's patient list
			f.nurseAssignPatient(action.nurseId, action.patientId);
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