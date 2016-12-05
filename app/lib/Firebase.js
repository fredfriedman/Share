
/**
* # Firebase.js
*
* This class interfaces with Firebase-server using the rest api
*
*/
'use strict'

/**
* ## Imports
*
* Config for defaults and underscore for a couple of features
*/
import FB from '../config/firebase'
import _ from 'lodash'
import Backend from './Backend'
const { NURSE, CAREGIVER } = require('./constants').default
export class Firebase extends Backend {
    /**
    * ## Parse.js client
    *
    *
    * @throws tokenMissing if token is undefined
    */
    initialize (token) {
        /*if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
            throw new Error('TokenMissing')
        }
        this._sessionToken =
        _.isNull(token) ? null : token.sessionToken.sessionToken

        this._masterKey = CONFIG.FIREBASE.apiKey
        this.API_BASE_URL = CONFIG.FIREBASE.remote.databaseURL*/
    }
    /**
    * ### signup
    *
    * @param data object
    *
    * {username: "barton", email: "foo@gmail.com", password: "Passw0rd!"}
    *
    * @return
    * if ok, res.json={createdAt: "2015-12-30T15:17:05.379Z",
    *   objectId: "5TgExo2wBA",
    *   sessionToken: "r:dEgdUkcs2ydMV9Y9mt8HcBrDM"}
    *
    * if error, {code: xxx, error: 'message'}
    */
    async signup (user) {
        /*return await FirebaseInstance.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(function(user) {

                var ref = user.isCaregiver ? "Caregivers/" + user.uid : "Nurses/" + user.uid

                if (user.isCaregiver) {
                    return Firebase.database().ref().child("Patients/" + self.state.caregiver.patient + "/nurse").once('value')
                        .then(function(res) {

                            user["Nurse"] = res.val()

                            return Firebase.database().ref().child(ref).set(user);
                        })

                } else {
                    return Firebase.database().ref().child(ref).set(user);
                }

            })
            .then(function(success) {

            })
            .catch((error) => {
                throw(error)
            })*/
    }
    /**
    * ### login
    * encode the data and and call _fetch
    *
    * @param data
    *
    *  {username: "barton", password: "Passw0rd!"}
    *
    * @returns
    *
    * createdAt: "2015-12-30T15:29:36.611Z"
    * updatedAt: "2015-12-30T16:08:50.419Z"
    * objectId: "Z4yvP19OeL"
    * email: "barton@foo.com"
    * sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
    * username: "barton"
    *
    */
    async login (credentials) {

        var user;
        var self = this;

        return await FB.auth().signInWithEmailAndPassword(credentials.username, credentials.password)
            .then(function(usr) {

                user = usr

                return FB.database().ref().child("Caregivers/" + usr.uid).once('value').then(function(snapshot) {
                    return self.createUser(user, snapshot.val(), CAREGIVER)
                })

            }).then(function(user) {
                if (user["type"] == null) {
                     return FB.database().ref().child("Nurses/" + user.uid).once('value')
                        .then(function(snapshot) {
                            return self.createUser(user, snapshot.val(), NURSE)
                        })
                        .catch((error) => {
                            throw(error)
                        })
                } else {
                    return user
                }
            })
            .catch((error) => {
                throw(error)
            })
    }

    createUser(authProfile, userProfile, type) {
        if ( userProfile === null ) { return authProfile }
        userProfile["id"] = authProfile.uid
        userProfile["type"] = type
        userProfile["email"] = authProfile.email
        userProfile.Profile["picture"] = authProfile.photoURL
        return userProfile
    }

    /**
    * ### logout
    * prepare the request and call _fetch
    */
    async logout () {

    }
    /**
    * ### resetPassword
    * the data is already in a JSON format, so call _fetch
    *
    * @param data
    * {email: "barton@foo.com"}
    *
    * @returns empty object
    *
    * if error:  {code: xxx, error: 'message'}
    */
    async resetPassword (data) {

    }
    /**
    * ### getProfile
    * Using the sessionToken, we'll get everything about
    * the current user.
    *
    * @returns
    *
    * if good:
    * {createdAt: "2015-12-30T15:29:36.611Z"
    *  email: "barton@acclivyx.com"
    *  objectId: "Z4yvP19OeL"
    *  sessionToken: "r:uFeYONgIsZMPyxOWVJ6VqJGqv"
    *  updatedAt: "2015-12-30T15:29:36.611Z"
    *  username: "barton"}
    *
    * if error, {code: xxx, error: 'message'}
    */
    async getProfile () {

    }
    /**
    * ### updateProfile
    * for this user, update their record
    * the data is already in JSON format
    *
    * @param userId  _id of Parse.com
    * @param data object:
    * {username: "barton", email: "barton@foo.com"}
    */
    async updateProfile (userId, data) {

    }
    /**
    * ### _fetch
    * A generic function that prepares the request
    * @returns object:
    *  {code: response.code
    *   status: response.status
    *   json: reponse.json()
    */
    async _fetch (opts) {

    }
}
// The singleton variable
export let firebase = new Firebase()
