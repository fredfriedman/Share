/*
* action types
*/

//Manage Patients
export const ADD_PATIENT = 'ADD_PATIENT';
export const REMOVE_PATIENT = 'REMOVE_PATIENT';

//Manage Caregivers
export const ASSIGN_CAREGIVER = 'ASSIGN_CAREGIVER';

//Messaging
//Patients to Nurses

export const NURSE_MESSAGE = 'NURSE_MESSAGE';
//Nurses to Patients

export const PATIENT_MESSAGE = 'PATIENT_MESSAGE';

export const INITIALIZE_PATIENTS = 'INITIALIZE_PATIENTS';

export const INITIALIZE_NURSES = 'INITIALIZE_NURSES';




/*
* action creators
*/

//Firebase Functionality
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

//Messaging Actions
export function messagePatient(patientId, caregiverId, message){
	return {type: PATIENT_MESSAGE, patientId, caregiverId};
}

export function messageNurse(nurseId, patientId, message){
	return {type: NURSE_MESSAGE, nurseId, patientId};
}

export function initializePatientList(){
	return {type: INITIALIZE_PATIENTS};
}

export function initializeNurseList(){
	return {type: INITIALIZE_NURSES};
}