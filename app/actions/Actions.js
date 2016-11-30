
import firebaseHelper from '../screens/CaregiverSettings/firebaseHelper';
/*
* action types
*/

//Manage Patients
export const ADD_PATIENT = 'ADD_PATIENT';
export const REMOVE_PATIENT = 'REMOVE_PATIENT';
export const NURSE_ASSIGN_PATIENT = 'NURSE_ASSIGN_PATIENT';

//Manage Caregivers
export const ASSIGN_CAREGIVER = 'ASSIGN_CAREGIVER';

//Messaging
//Patients to Nurses

export const NURSE_MESSAGE = 'NURSE_MESSAGE';
//Nurses to Patients

export const PATIENT_MESSAGE = 'PATIENT_MESSAGE';

export const INITIALIZE_PATIENTS = 'INITIALIZE_PATIENTS';

export const INITIALIZE_CAREGIVERS = 'INITIALIZE_CAREGIVERS';




/*
* action creators
*/

//Firebase Functionality
export function addPatient(patientName, patientStatus, nurseId){
	return {type: ADD_PATIENT, patientName, patientStatus, nurseId};
}

export function removePatient(patientId){
	return {type: REMOVE_PATIENT, patientId};
}

export function nurseAssignPatient(nurseId, patientId){
	return {type: NURSE_ASSIGN_PATIENT, nurseId, patientId};
}

export function assignCaregiver(caregiverId, patientId){
	return {type: ASSIGN_CAREGIVER, caregiverId, patientId};
}

export function removeCaregiver(caregiverId){
	console.log("***************************To Be Implemented*****************************");
}

//Messaging Actions
export function messagePatient(patientId, caregiverId, message){
	return {type: PATIENT_MESSAGE, patientId, caregiverId};
}

export function messageNurse(nurseId, patientId, message){
	return {type: NURSE_MESSAGE, nurseId, patientId};
}

export function initializePatientList(){
	return function(dispatch){
		let f = new firebaseHelper();
		return f.getPatientsPromise().then(function(patientList){
			dispatch({type: INITIALIZE_PATIENTS, patientList});
		})

	};
}

export function initializeCaregiverList(){
	return function(dispatch){
		let f = new firebaseHelper();
		return f.getCaregiverListPromise().then(function(caregiverList){
			dispatch({type: INITIALIZE_CAREGIVERS, caregiverList});
		})

	};
}