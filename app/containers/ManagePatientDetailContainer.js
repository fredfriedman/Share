import React from 'react';
import {ListView} from 'react-native';
import {connect} from 'react-redux';
import ManagePatientDetail from '../screens/NurseSettings/ManagePatientDetail';
import { addPatient ,removePatient, nurseAssignPatient, initializeCaregiverList, initializePatientList} from '../actions/Actions';
import firebaseHelper from '../screens/CaregiverSettings/firebaseHelper'

const mapStateToProps = (state, ownProps) => {
	return {
		patients: state.patients,
		nurses: state.nurses,
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onRemove: (patientId) => { dispatch(removePatient(patientId)) },
		onAdd: (patientName, patientStatus) => { dispatch(addPatient(patientName, patientStatus, nurseId)) },
		initializePatientList: () => {dispatch(initializePatientList())},
		initializeCaregiverList: () => {dispatch(initializeCaregiverList())},
	}
}

export default connect(
	mapStateToProps, 
	mapDispatchToProps
	) (ManagePatientDetail);