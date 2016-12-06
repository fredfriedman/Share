import React, { Component } from 'react';
import { AsyncStorage, Navigator} from 'react-native';
import { Provider,  } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore,applyMiddleware } from 'redux';
import globalReducer from './app/Reducers/GlobalReducer';

import Home from './app/screens/Login/home'
import TabBar from './app/screens/Home/TabBar'
import CaregiverHome from './app/screens/CaregiverHome/overview'
import Firebase from './app/config/firebase'
import EStyleSheet from 'react-native-extended-stylesheet';
import Theme from './app/config/theme'

const { NURSE, CAREGIVER } = require('./app/lib/constants').default

EStyleSheet.build(Theme);

console.disableYellowBox = true

let store = createStore(globalReducer, applyMiddleware(thunk));

export default class Main extends Component {

    constructor(){
        super();

        this.state = {
            component: Home,
        };

        this.handleAlreadySignIn()
    }

    handleAlreadySignIn() {

        /*var self = this

        Firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                AsyncStorage.getItem('user_data')
                    .then((usr) => {
                        console.log("main", usr)
                        try {
                            var user_data = JSON.parse(usr)
                            console.log(1)
                            var component = user_data["type"] == CAREGIVER ? CaregiverHome : TabBar
                            console.log(2)
                            self.refs.navigator.resetTo({ component: component, passProps: {user: user_data} })
                        } catch(e) {
                            console.log("main error", e)
                            throw e
                        }
                    }, function(error) {
                        console.log("Error: No stored user data")
                    })
            }
        });*/
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
