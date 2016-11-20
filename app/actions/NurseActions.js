/*
* action types
*/

export const ADD_PATIENT = 'ADD_PATIENT';


/*
* action creators
*/

export function addPatient(patientName){
	return {type: ADD_PATIENT, patientName}
}