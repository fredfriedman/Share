'use strict'

/**
* ## Imports
*
* The actions supported
*/
const {
    SESSION_TOKEN_REQUEST,
    SESSION_TOKEN_SUCCESS,
    SESSION_TOKEN_FAILURE,

    DELETE_TOKEN_REQUEST,
    DELETE_TOKEN_SUCCESS,

    LOGOUT,
    REGISTER,
    LOGIN,
    FORGOT_PASSWORD,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    ON_AUTH_FORM_FIELD_CHANGE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,

    REGISTER_NURSE_REQUEST,
    REGISTER_NURSE_SUCCESS,
    REGISTER_NURSE_FAILURE,

    REGISTER_CAREGIVER_REQUEST,
    REGISTER_CAREGIVER_SUCCESS,
    REGISTER_CAREGIVER_FAILURE,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE

} = require('../../lib/constants').default

/**
* Project requirements
*/

import { appAuthToken } from '../../lib/AppAuthToken'

import BackendFactory from '../../lib/BackendFactory';

const _ = require('lodash')

/**
* ## State actions
* controls which form is displayed to the user
* as in login, register, logout or reset password
*/

export function logoutState () {
    return {
        type: LOGOUT
    }
}
export function registerState () {
    return {
        type: REGISTER
    }
}

export function loginState () {
    return {
        type: LOGIN
    }
}

export function forgotPasswordState () {
    return {
        type: FORGOT_PASSWORD
    }
}

/**
* ## Logout actions
*/
export function logoutRequest () {
    return {
        type: LOGOUT_REQUEST
    }
}

export function logoutSuccess () {
    return {
        type: LOGOUT_SUCCESS
    }
}
export function logoutFailure (error) {
    return {
        type: LOGOUT_FAILURE,
        payload: error
    }
}
/**
* ## Logout
* After dispatching the logoutRequest, get the sessionToken
*
*
* When the response is received and it's valid
* change the state to register and finish the logout
*
* But if the call fails, like expired token or
* no network connection, just send the failure
*
* And if you fail due to an invalid sessionToken, be sure
* to delete it so the user can log in.
*
* How could there be an invalid sessionToken?  Maybe they
* haven't used the app for a long time.  Or they used another
* device and logged out there.
*/
export function logout () {
    return dispatch => {
        dispatch(logoutRequest())
        return appAuthToken.getSessionToken()

        .then((token) => {
            return fb.signOut()
        })

        .then(() => {
            dispatch(loginState())
            dispatch(logoutSuccess())
            dispatch(deleteSessionToken())
            Actions.InitialLoginForm()
        })

        .catch((error) => {
            dispatch(loginState())
            dispatch(logoutFailure(error))
        })
    }
}
/**
* ## onAuthFormFieldChange
* Set the payload so the reducer can work on it
*/
export function onAuthFormFieldChange (field, value) {
    return {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: {field: field, value: value}
    }
}
/**
* ## Signup actions
*/
export function signupRequest () {
    return {
        type: SIGNUP_REQUEST
    }
}
export function signupSuccess (json) {
    return {
        type: SIGNUP_SUCCESS,
        payload: json
    }
}
export function signupFailure (error) {
    return {
        type: SIGNUP_FAILURE,
        payload: error
    }
}
export function registerNurseRequest () {
    return {
        type: REGISTER_NURSE_REQUEST
    }
}
export function registerNurseSuccess (json) {
    return {
        type: REGISTER_NURSE_SUCCESS,
        payload: json
    }
}
export function registerNurseFailure (error) {
    return {
        type: REGISTER_NURSE_FAILURE,
        payload: error
    }
}
export function registerCaregiverRequest () {
    return {
        type: REGISTER_CAREGIVER_REQUEST
    }
}
export function registerCaregiverSuccess (json) {
    return {
        type: REGISTER_CAREGIVER_SUCCESS,
        payload: json
    }
}
export function registerCaregiverFailure (error) {
    return {
        type: REGISTER_CAREGIVER_FAILURE,
        payload: error
    }
}
/**
* ## SessionToken actions
*/
export function sessionTokenRequest () {
    return {
        type: SESSION_TOKEN_REQUEST
    }
}
export function sessionTokenRequestSuccess (token) {
    return {
        type: SESSION_TOKEN_SUCCESS,
        payload: token
    }
}
export function sessionTokenRequestFailure (error) {
    return {
        type: SESSION_TOKEN_FAILURE,
        payload: _.isUndefined(error) ? null : error
    }
}

/**
* ## DeleteToken actions
*/
export function deleteTokenRequest () {
    return {
        type: DELETE_TOKEN_REQUEST
    }
}
export function deleteTokenRequestSuccess () {
    return {
        type: DELETE_TOKEN_SUCCESS
    }
}

/**
* ## Delete session token
*
* Call the AppAuthToken deleteSessionToken
*/
export function deleteSessionToken () {
    return dispatch => {
        dispatch(deleteTokenRequest())
        return appAuthToken.deleteSessionToken()
        .then(() => {
            dispatch(deleteTokenRequestSuccess())
        })
    }
}
/**
* ## Token
* If AppAuthToken has the sessionToken, the user is logged in
* so set the state to logout.
* Otherwise, the user will default to the login in screen.
*/
export function getSessionToken () {
    return dispatch => {
        dispatch(sessionTokenRequest())
        return appAuthToken.getSessionToken()

        .then((token) => {
            if (token) {
                dispatch(sessionTokenRequestSuccess(token))
                dispatch(logoutState())
                Actions.Tabbar()
            } else {
                dispatch(sessionTokenRequestFailure())
                Actions.InitialLoginForm()
            }
        })

        .catch((error) => {
            dispatch(sessionTokenRequestFailure(error))
            dispatch(loginState())
            Actions.InitialLoginForm()
        })
    }
}

/**
* ## saveSessionToken
* @param {Object} response - to return to keep the promise chain
* @param {Object} json - object with sessionToken
*/
export function saveSessionToken (json) {
    return appAuthToken.storeSessionToken(json)
}
/**
* ## signup
* @param {string} username - name of user
* @param {string} email - user's email
* @param {string} password - user's password
*
* Call the server signup and if good, save the sessionToken,
* set the state to logout and signal success
*
* Otherwise, dispatch the error so the user can see
*/
export function registerNurse(user) {
    return dispatch => {
        dispatch(registerNurseRequest())

        return BackendFactory().registerNurse(user)
            .then(function (usr) {
                dispatch(registerNurseSuccess(usr))
            })
            .catch((error) => {
                dispatch(registerNurseFailure(error))
            })
    }
}

export function registerCaregiver(user) {
    console.log("registering caregiver")
    return dispatch => {
        dispatch(registerCaregiverRequest())

        return BackendFactory().registerCaregiver(user)
            .then(function (usr) {
                dispatch(registerCaregiverSuccess(usr))
            })
            .catch((error) => {
                dispatch(registerCaregiverFailure(error))
            })
    }
}

export function signup (username, email, password) {
}

/**
* ## Login actions
*/
export function loginRequest () {
    return {
        type: LOGIN_REQUEST
    }
}

export function loginSuccess (user) {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

export function loginFailure (error) {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}
/**
* ## Login
* @param {string} username - user's name
* @param {string} password - user's password
*
* After calling Backend, if response is good, save the json
* which is the currentUser which contains the sessionToken
*
* If successful, set the state to logout
* otherwise, dispatch a failure
*/

export function login (credentials) {
    return dispatch => {
        dispatch(loginRequest())

        return BackendFactory().login(credentials)
            .then(function (user) {
                dispatch(loginSuccess(user))
            })
            .catch((error) => {
                dispatch(loginFailure(error))
            })
    }
}

/**
* ## ResetPassword actions
*/
export function resetPasswordRequest () {
    return {
        type: RESET_PASSWORD_REQUEST
    }
}

export function resetPasswordSuccess () {
    return {
        type: RESET_PASSWORD_SUCCESS
    }
}

export function resetPasswordFailure (error) {
    return {
        type: RESET_PASSWORD_FAILURE,
        payload: error
    }
}
/**
* ## ResetPassword
*
* @param {string} email - the email address to reset password
* *Note* There's no feedback to the user whether the email
* address is valid or not.
*
* This functionality depends on the server set
* up correctly ie, that emails are verified.
* With that enabled, an email can be sent w/ a
* form for setting the new password.
*/
export function resetPassword (email) {
    return dispatch => {
        dispatch(resetPasswordRequest())
        return BackendFactory().resetPassword({
            email: email
        })
        .then(() => {
            dispatch(loginState())
            dispatch(resetPasswordSuccess())
            Actions.Login()
        })
        .catch((error) => {
            dispatch(resetPasswordFailure(error))
        })
    }
}
