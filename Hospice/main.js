import React, { Component } from 'react';
import { Navigator, StyleSheet, View, Text } from 'react-native';
 
var Login = require('./app/screens/Login/login').default
var Dashboard = require('./app/screens/Home/dashboard').default
 
var ROUTES = { 
                login: Login,
                dashboard: Dashboard
              }
 
export default class Main extends Component {
  constructor(props){
        super(props);
        this.state = {};
    }

  renderScene(route, navigator) {
    var Component = ROUTES[route.name]
    return <Component route={route} navigator={navigator} />
  }

  render() {
    return (
     <Navigator
      initialRoute = {{ title: 'login', index: 0 }}
      renderScene  = {(route, navigator) => {
                        return <Login title={route.title} />
                      }}/>
    )
  }
}

