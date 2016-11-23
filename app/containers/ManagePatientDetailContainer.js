import React from 'react';
import {connect} from 'react-redux';
import ManagePatientDetail from '../screens/NurseSettings/ManagePatientDetail';
import { addPatient ,removePatient} from '../actions/Actions';

const mapStateToProps = (state, ownProps) => {
	return {

	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onRemove: (patientId) => { dispatch(removePatient(patientId)) },
		onAdd: (patientId, patientStatus) => { dispatch(addPatient(patientId, patientStatus)) }
	}
}

export default connect(
	mapStateToProps, 
	mapDispatchToProps
	) (ManagePatientDetail);