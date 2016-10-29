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

  /**
  @access public
  @param int: caregiver id
  @param int: patient id
  @return void; function sets patientid of caregiver taking care of patient
  */
  updatePatientID(caregiverID, patientID){

    firebase.database().ref('Caregivers/'+ caregiverID).once('value', function(snapshot) {
        var exists = ( snapshot.val() !== null );
        if(exists){
          var patientIDRef = firebase.database().ref('Caregivers/'+ caregiverID);
          patientIDRef.update({'Patient': patientID});
        }
        else {
          alert('fail');
        }
    });
  }



  /**
  @access public
  @param int: patientID
  @return alert: if patientId is not valid patient id
  */
  isValidPatientID(patientID){
    firebase.database().ref('Patients/'+patientID).once('value', function(snapshot) {
        if( snapshot.val() === null ) {
            /* does not exist */
            alert("Patient ID not found");
            throw new Error();
        }
    });
  }

  /**
  @access public
  @param int: caregiverID
  @return alert: if isn't valid patient id
  */
  isValidCaregiverID(caregiverID){
    firebase.database().ref('Caregivers/'+ caregiverID).once('value', function(snapshot) {
        if( snapshot.val() === null ) {
            /* does not exist */
            alert("Caregiver ID not found");
        }
    });
  }



}
