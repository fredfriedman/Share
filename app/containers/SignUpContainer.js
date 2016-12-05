import React from 'react';
import { connect } from 'react-redux';
import { addPatient } from '../actions/Actions';
import signup from '../screens/Login/signup'

const mapStateToProps = (state, ownProps) => {
	return {
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		signUp: (user) => { dispatch(removePatient(user)) },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
