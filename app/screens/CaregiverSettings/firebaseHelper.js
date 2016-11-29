/* @flow */
//@author michael; temporary helper class. I suspect that we will need this class as a backend autoCapitalize

import firebase from '../../config/firebase'
import { Alert, AsyncStorage } from 'react-native';

export default class firebaseHelper {
    constructor(){

    }

    //fetch caregiver firebase caregiver data as promise. Do as you wish
    getCaregiverPromise(caregiverId) {
        return firebase.database().ref('Caregivers/'+ caregiverId).once('value').then(function(snapshot) {
            return snapshot.child('Patient').val();
        });
    }

    getCaregiverProfilePromise(caregiverId){
        return firebase.database().ref('Caregivers/'+ caregiverId).once('value').then(function(snapshot) {
            return snapshot.child('Profile').val();
        });
    }

    updateCaregiveProfile(caregiverID, type, value) {
        var valueRef = firebase.database().ref('Caregivers/'+ caregiverID + "/Profile/")
        return valueRef.update({[type]: value});
    }


    /**
    @access public
    @param int: caregiver id
    @param int: patient id
    @return void; function sets patientId of caregiver taking care of patient
    */
    updatePatientId(caregiverId, patientId) {
        var patientIdRef = firebase.database().ref('Caregivers/'+ caregiverId);
        return patientIdRef.update({'Patient': patientId});
    }



    /**
    @access public
    @param int: patientId
    @return alert: if patientId is not valid patient id
    */
    isValidPatientId(patientId){
        return firebase.database().ref('Patients/' + patientId).once('value', function(snapshot) {
            snapshot.val() === null ? false : true
        });
    }

    /**
    @access public
    @param int: caregiverId
    @return alert: if isn't valid patient id
    */
    isValidCaregiverId(caregiverId){
        firebase.database().ref('Caregivers/'+ caregiverId).once('value', function(snapshot) {
            if( snapshot.val() === null ) {
                /* does not exist */
                alert("Caregiver ID not found");
            }
        });
    }

    /**
    @access public
    @return alert: if isn't valid patient id
    */
    signOut() {
        return firebase.auth().signOut()
            .then(function() {
                return AsyncStorage.removeItem("user_data")
            })
            .then(function() {
                return true
            }, function(error) {
                return false
            });
    }
}
