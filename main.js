import React, { Component } from 'react';
import { AsyncStorage, Navigator} from 'react-native';
import { Provider,  } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore,applyMiddleware } from 'redux';
import globalReducer from './app/Reducers/GlobalReducer';

let store = createStore(globalReducer, applyMiddleware(thunk));

//need Reducers for React-redux


// var Login   = require('./app/screens/Login/home').default
// var Login   = require('./app/screens/CaregiverHome/overview').default
// var firebase = require('./app/config/firebase')

import Home from './app/screens/Login/home'
import TabBar from './app/screens/Home/TabBar'
import CaregiverHome from './app/screens/CaregiverHome/overview'
import Firebase from './app/config/firebase'
import EStyleSheet from 'react-native-extended-stylesheet';
import Theme from './app/config/theme'

EStyleSheet.build(Theme);

console.disableYellowBox = true

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

                        try {
                            var user_data = JSON.parse(usr)

                            var component = user_data["type"] == "caregiver" ? CaregiverHome : TabBar

                            self.refs.navigator.resetTo({ component: component, passProps: {user: user_data} })

                        } catch(e) {
                            throw e
                        }

                    }, function(error) {
                        console.log("Error: No stored user data")
                    })

            }
        });
    }

    render(){
        return (
            <Provider store = {store}>
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
            </Provider>
        );
    }
}
