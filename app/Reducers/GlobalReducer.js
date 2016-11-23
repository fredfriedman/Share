import {ADD_PATIENT,REMOVE_PATIENT,ASSIGN_CAREGIVER} from '../actions/Actions';
import firebaseHelper from '../screens/CaregiverSettings/firebaseHelper';

initialState = {
	id: 0,
}

export default  function globalReducer(state = initialState, action){
	let f = new firebaseHelper()
	switch(action.type) {
		case ADD_PATIENT:
			f.createNewPatient(action.patientName, action.patientStatus);

		case REMOVE_PATIENT:
		case ASSIGN_CAREGIVER:
		default:
			return state
	}
}