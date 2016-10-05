import React, { Component } from 'react';
import { AppRegistry, Navigator, StyleSheet, View, Text, AsyncStorage } from 'react-native';

var Login   = require('./app/screens/Login/login').default
var TabBar   = require('./app/components/TabBar').default
var firebase = require('./app/config/firebase')

export default class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            component: Login,
            loaded: false
        };
    }

    componentWillMount(){

        AsyncStorage.getItem('user_data')
            .then( function(user_data_json) {
                let user_data = JSON.parse(user_data_json);
                let component = {component: Login};

                firebase.signInWithCustomToken(user_data.token)
                    .then( function(success) {
                        this.setState({component: TabBar});
                    }, function(error) {
                        this.setState(component)
                    });
            }, function(error) {
                this.setState(component);
            })
    }

    render(){
        return (
            <Navigator
                initialRoute={{component: this.state.component}}
                configureScene={() => {
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    if(route.component){
                        return React.createElement(route.component, { ...this.props, ...route.passProps, navigator });
                    }
                }}
            />
        );
    }
}

AppRegistry.registerComponent('Hospice', () => Main);