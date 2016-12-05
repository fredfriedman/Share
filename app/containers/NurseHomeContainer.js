import React from 'react';
import { connect } from 'react-redux';
import { addPatient } from '../actions/Actions';
import TabBar from '../screens/Home/TabBar'

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.user,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onRemove: (patientId) => { dispatch(removePatient(patientId)) },
		initializeDistressedPatientList: () => {dispatch(initializePatientList())},
		initializeCriticalPatientList: () => {dispatch(initializeCaregiverList())},
		initializeRCPatientList: () => {dispatch(initializeCaregiverList())},
		initializePatientList: () => {dispatch(initializeCaregiverList())},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TabBar);
