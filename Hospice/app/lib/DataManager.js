import { initializeApp } from 'firebase'

var config = require('../config/firebase')

const firebaseApp = initializeApp({
    apiKey: config.API_KEY,
    authDomain: config.AUTH_DOMAIN,
    databaseURL: config.DATABASE_URL,
    storageBucket: config.STORAGE_BUCKET
})

const nurseRef = firebaseApp.database().ref('nurses')
const patientsRef = firebaseApp.database().ref('patients')
const connectedRef = firebaseApp.database().ref('.info/connected')
