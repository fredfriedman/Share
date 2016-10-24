'use strict';
import React, { Component } from 'react';
import {KeyboardAvoidingView , Navigator, Text, TextInput, TouchableHighlight, View} from 'react-native';

var Header = require('./header').default
var { xIcon, butterfly } = require('../config/images')

export default class noteInput extends Component {

    constructor() {
        super();

        this.state = {
            text: "",
            length: 160
        }
    }

    onSubmit() {

        // Submit to firebase

        this.props.navigator.pop()
    }

    exit() {
        this.props.navigator.pop()
    }

    onChangeText(text) {
        this.setState({text: text})
        this.setState({length: this.state.length - 1})
    }

    render(){
        return (
            <View stye={{backgroundColor: "white"}}>
                <Header
                    leftAction={() => console.log()}
                    leftIcon={butterfly}
                    rightAction={this.exit.bind(this)}
                    rightIcon={xIcon}
                    headerStyle={{ alignItems: 'center', height: 60, backgroundColor: 'white' }}/>
                <TextInput
                    maxLength={160}
                    multiline={true}
                    placeholder={"What's Happening"}
                    placeholderTextColor={'#607D8B'}
                    style={{fontSize: 12, height: 200, color: '#607D8B', marginLeft: 30, marginRight: 30}}
                    onChangeText={(text) => this.onChangeText(text)}
                    value={this.state.text}/>
                <View style={{height: 60, borderWidth: 1, borderColor: "#f3f3f3" ,flexDirection: "row", justifyContent: "flex-end"}}>
                    <Text style={{color: "#607D8B", marginTop: 20, paddingRight: 10}}>{this.state.length}</Text>
                    <TouchableHighlight
                        disabled={false}
                        underlayColor={'#00BCD4'}
                        onPress={this.onSubmit.bind(this)}
                        style={{borderRadius: 5, backgroundColor: "#00BCD4", width: 80, height: 30, marginTop: 15, marginRight: 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: "white"}}> Post </Text>
                    </TouchableHighlight>
                </View>

            </View>
        );
    }
}
