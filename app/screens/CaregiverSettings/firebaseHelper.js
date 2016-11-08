/* @flow */
//@author michael; temporary helper class. I suspect that we will need this class as a backend autoCapitalize

var firebase = require('../../config/firebase');

const firebaseConfig = {
    apiKey: "AIzaSyAGduZMnMEfsoknetJyYk7kJayWSgOAVbE",
    authDomain: "https://reactcs408.firebaseio.com/",
    databaseURL: "https://reactcs408.firebaseio.com/",
};
export default class firebaseHelper {
    constructor(){
        
    }

//fetch caregiver firebase caregiver data as promise. Do as you wish
  getCaregiverPromise(caregiverId) {
      return firebase.database().ref('Caregivers/'+ caregiverId).once('value').then(function(snapshot) {
        return snapshot.child('Patient').val();
    });
  }

  /**
  @access public
  @param int: caregiver id
  @param int: patient id
  @return void; function sets patientId of caregiver taking care of patient
  */
  updatepatientId(caregiverId, patientId){

      firebase.database().ref('Caregivers/'+ caregiverId).once('value', function(snapshot) {
          var exists = ( snapshot.val() !== null );
          if(exists){
            var patientIdRef = firebase.database().ref('Caregivers/'+ caregiverId);
            patientIdRef.update({'Patient': patientId});
          }
          else {
            alert('fail');
          }
        });
  }



  /**
  @access public
  @param int: patientId
  @return alert: if patientId is not valid patient id
  */
isValidPatientId(patientId){
    firebase.database().ref('Patients/'+patientId).once('value', function(snapshot) {
        if( snapshot.val() === null ) {
            /* does not exist */
            alert("Patient ID not found");
            throw new Error();
        }
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



}
