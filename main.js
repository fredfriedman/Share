import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Model, Navigator, StyleSheet, View, Text } from 'react-native';

var Login   = require('./app/screens/Login/home').default
var TabBar   = require('./app/components/TabBar').default
var firebase = require('./app/config/firebase')

export default class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            component: Login,
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
                        console.log(error)
                    });
            }, function(error) {
                console.log(error)
            })
    }

    render(){
        return (
            <Navigator
                ref="navigator"
                initialRoute={{component: this.state.component}}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    if(route.component){
                        return React.createElement(route.component, { ...this.props, ...route.passProps, navigator });
                    }
                }}
                onDidFocus={(route) => {
                    if (route.reset) {
                        this.refs.navigator.immediatelyResetRouteStack([{ component: route.component }])
                    }
                }}
            />
        );
    }
}

AppRegistry.registerComponent('Hospice', () => Main);
