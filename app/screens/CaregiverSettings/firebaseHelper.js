/* @flow */
//@author michael; temporary helper class. I suspect that we will need this class as a backend autoCapitalize

import firebase from '../../config/firebase'
import { AsyncStorage } from 'react-native';

export default class firebaseHelper {
    constructor(){

    }

    setPatientInactive(patientId){
        firebase.database().ref('Patients/' + patientId+'/active').set(false);
    }

    createNewPatient(patientName, patientStatus){
        let userId = new Date().getTime();
        firebase.database().ref('Patients/' + userId).set(
        {
            active: true,
            name: patientName,
            status: patientStatus,
        });
    }

    createNewCaregiver(patientId, caregiverName, phoneNumber, relation){
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('Caregivers/' + userId).set({
        Patient: patientId,
        Profile:{
            name: caregiverName,
            phone: phoneNumber,
            relation: relation
        },
      });
    }

    getPatientsPromise(){
        return firebase.database().ref('Patients/').once('value').then(function(snapshot) {
            return snapshot.val();
        });
    }

    getCaregiverListPromise(){
        return firebase.database().ref('Caregivers/').once('value').then(function(snapshot) {
            return snapshot.val();
        });
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



    updateCaregiverName(caregiverId){
        firebase.database().ref('Caregivers/'+ caregiverId).once('value', function(snapshot) {
            var exists = ( snapshot.val() !== null );
            if(exists && isValid){
                var patientIdRef = firebase.database().ref('Caregivers/'+ caregiverId);
                patientIdRef.update({'Patient': patientId});
            }
            else {
                alert('invalid patientId');
            }
        });
    }


    /**
    @access public
    @param int: caregiver id
    @param int: patient id
    @return void; function sets patientId of caregiver taking care of patient
    */
    updatePatientId(caregiverId, patientId, isValidPatientIdPromise){
        isValidPatientIdPromise.then(function(isValid){
            firebase.database().ref('Caregivers/'+ caregiverId).once('value', function(snapshot) {
                var exists = ( snapshot.val() !== null );
                if(exists && isValid){
                    var patientIdRef = firebase.database().ref('Caregivers/'+ caregiverId);
                    patientIdRef.update({'Patient': patientId});
                    console.log("***************************************YAYYYYY");
                }
                else {
                    alert('invalid patientId');
                }
            });

        });
    }



    /**
    @access public
    @param int: patientId
    @return alert: if patientId is not valid patient id
    */
    isValidPatientId(patientId){
        return firebase.database().ref('Patients/'+patientId).once('value', function(snapshot) {
            if( snapshot.val() === null ) {
                /* does not exist */
                // alert("Patient ID not found");
                // throw new Error();
                return false;
            }
            return true;
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
