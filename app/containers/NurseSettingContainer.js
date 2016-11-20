import React from 'react';
import { connect } from 'react-redux';
import { addPatient } from '../actions/NurseActions';
import NurseSettings from '../screens/NurseSettings/NurseSettings';

const mapStateToProps = (state, ownProps) => {
	return {
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NurseSettings);