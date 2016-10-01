import React, { Component } from 'react';
import { AppRegistry, Navigator, StyleSheet, View, Text } from 'react-native';

var Signup = require('./app/screens/Login/login').default

export default class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            component: Signup,
            loaded: false
        };
    }

    /*componentWillMount(){

    AsyncStorage.getItem('user_data').then((user_data_json) => {

    let user_data = JSON.parse(user_data_json);
    let component = {component: Signup};
    if(user_data != null){
    app.authWithCustomToken(user_data.token, (error, authData) => {
    if(error){
    this.setState(component);
    }else{
    this.setState({component: Account});
    }
    });
    }else{
    this.setState(component);
    }
    });

    }*/

    render(){
        if(this.state.component){
            return (
                <Navigator
                    initialRoute={{component: this.state.component}}
                    configureScene={() => {
                        return Navigator.SceneConfigs.FloatFromRight;
                    }}
                    renderScene={(route, navigator) => {
                        if(route.component){
                            return React.createElement(route.component, { navigator });
                        }
                    }}
                />
            );
        } else {
            return (
                <View >
                    <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
                    <View ></View>
                </View>
            );
        }
    }
}

AppRegistry.registerComponent('Hospice', () => Main);
