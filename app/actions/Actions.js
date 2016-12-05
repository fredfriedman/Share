
import firebaseHelper from '../screens/CaregiverSettings/firebaseHelper';
/*
* action types
*/

// User Managemnet
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
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

export const INITIALIZE_CAREGIVERS = 'INITIALIZE_CAREGIVERS';




/*
* action creators
*/

export function login(credentials){
	if(credentials.username === 'testuser' && credentials.password === 'test'){
		return {type: LOGIN_SUCCESS}
	} else {
		return {type: LOGIN_ERROR}
	}

}

//Firebase Functionality
export function addPatient(patientName, patientStatus){
	return {type: ADD_PATIENT, patientName, patientStatus}
}

export function removePatient(patientId){
	return {type: REMOVE_PATIENT, patientId}
}

export function assignCaregiver(caregiverId, patientId){
	return {type: ASSIGN_CAREGIVER, caregiverId, patientId}
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
