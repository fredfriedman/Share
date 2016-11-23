/*
* action types
*/

//Manage Patients
export const ADD_PATIENT = 'ADD_PATIENT';
export const REMOVE_PATIENT = 'REMOVE_PATIENT';

//Manage Caregivers
export const ASSIGN_CAREGIVER = 'ASSIGN_CAREGIVER';


/*
* action creators
*/

export function addPatient(patientName, patientStatus){
	console.log("HELLO");
	return {type: ADD_PATIENT, patientName, patientStatus}
}

export function removePatient(patientId){
	console.log("goodbye");
	return {type: REMOVE_PATIENT, patientId}
}

export function assignCaregiver(caregiverId, patientId){
	return {type: ASSIGN_CAREGIVER, caregiverId, patientId}
}