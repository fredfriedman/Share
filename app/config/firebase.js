import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAGduZMnMEfsoknetJyYk7kJayWSgOAVbE",
    authDomain: "https://reactcs408.firebaseio.com/",
    databaseUrl: "https://reactcs408.firebaseio.com/",
 };

module.exports = firebase.initializeApp(firebaseConfig);
