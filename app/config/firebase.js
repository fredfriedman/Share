import * as firebase from 'firebase';

const Firebase = {
    apiKey: "AIzaSyAGduZMnMEfsoknetJyYk7kJayWSgOAVbE",
    authDomain: "https://reactcs408.firebaseio.com/",
    databaseURL: "https://reactcs408.firebaseio.com/",
 };

module.exports = firebase.initializeApp(Firebase);
