import React, { Component } from 'react';
import { StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'purple'
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
  input: {
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
    color: '#ffffff'
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
  bottomLabel: {
    width: 400,
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '100',
    color: '#ffffff'
  }
});