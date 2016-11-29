import React from 'react';
import {ListView} from 'react-native';
import {connect} from 'react-redux';
import ManageCaregiverDetail from '../screens/NurseSettings/ManageCaregiverDetail';
import { addPatient ,removePatient, initializeCaregiverList, initializePatientList} from '../actions/Actions';
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
		onAdd: (patientId, patientStatus) => { dispatch(addPatient(patientId, patientStatus)) },
		initializePatientList: () => {dispatch(initializePatientList())},
		initializeCaregiverList: () => {dispatch(initializeCaregiverList())},
	}
}

export default connect(
	mapStateToProps, 
	mapDispatchToProps
	) (ManageCaregiverDetail);