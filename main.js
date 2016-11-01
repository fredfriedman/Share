import React, { Component } from 'react';
import { AsyncStorage, Navigator} from 'react-native';

import Home from './app/screens/Login/home'
import TabBar from './app/screens/Home/TabBar'
import Firebase from './app/config/firebase'
import EStyleSheet from 'react-native-extended-stylesheet';
import Theme from './app/config/theme'

EStyleSheet.build(Theme);

export default class Main extends Component {

    constructor(props){
        super(props);

        this.state = {
            component: Home,
        };

        this.handleAlreadySignIn()
    }

    handleAlreadySignIn() {

        var self = this

        Firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                AsyncStorage.getItem('user_data')
                    .then((usr) => {

                        var component = usr["type"] == "caregiver" ? CaregiverHome : TabBar

                        self.refs.navigator.resetTo({ component: component, passProps: {user: JSON.parse(usr)} })

                    }, function(error) {
                        console.log("Error: No stored user data")
                    })

            }
        });
    }

    render(){
        return (
            <Navigator
                ref="navigator"
                initialRoute={{component: this.state.component}}
                configureScene={(route) => {
                    return route.sceneConfig ? route.sceneConfig : Navigator.SceneConfigs.FloatFromRight
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
