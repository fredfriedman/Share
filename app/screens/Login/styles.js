import React, { Component } from 'react';
import { StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    body: {
        flex: 9,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        backgroundColor: 'transparent',
    },
    backgroundImage: {
        // Have to figure out how to change these to device size
        width: 375,
        height: 700,
        justifyContent: 'center',
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
        paddingTop: 20,
        top: 150,
    },
    textInput: {
        width: 250,
        height: 50,
        padding: 5,
        borderColor: '#191919',
        borderWidth: 0.5,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        fontFamily: 'Helvetica',
        fontWeight: '100',
        fontSize: 11,
        color: '#000000'
    },
    button: {
        padding: 10,
        marginTop: 15,
        backgroundColor: '#191919'
    },
    forgotPasswordButton: {
        paddingTop:10,
    },
    signUpButton: {
        marginBottom: 50,
    },
    LoginLabel: {
        width: 230,
        flex: 1,
        marginBottom: -5,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '200',
        color: '#ffffff'
    },
    placeholderLabel: {
        fontSize: 12,
        fontWeight: '200',
        color: '#ffffff'
    },
    bottomLabel: {
        width: 400,
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 11,
        fontWeight: '100',
        color: '#ffffff'
    },
    transparent_button: {
        marginTop: 10,
        padding: 15
    },
    transparent_button_text: {
        color: '#0485A9',
        fontSize: 16
    },
    primary_button: {
        margin: 10,
        padding: 15,
        backgroundColor: '#529ecc'
    },
    primary_button_text: {
        color: '#FFF',
        fontSize: 18
    },
});
