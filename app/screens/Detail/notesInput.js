'use strict';
import React, { Component } from 'react';
import {
        KeyboardAvoidingView,
        Navigator,
        StyleSheet,
        Text,
        TextInput,
        TouchableHighlight,
        View
    } from 'react-native';
import dismissKeyboard from 'dismissKeyboard'

var Header = require('../../components/header').default
var { xIcon, butterfly } = require('../../config/images')
var firebase = require('../../config/firebase')

export default class noteInput extends Component {

    constructor() {
        super();

        this.state = {
            text: "",
            isSubmitActive: false,
            notesRef: this.getRef().child('caregivers')
        }
    }

    componentWillMount() {
        this.setState({notesRef: this.getRef().child('caregivers').child(this.props.caregiver.name).child('notes') })
    }

    getRef() {
        return firebase.database().ref();
    }

    onSubmit() {
        // Submit to firebase
        this.state.notesRef.push({
            pid: "uid",
            poster: this.props.user.email, // get from props
            text: this.state.text,
            timestamp: new Date().getTime(),
        })

        dismissKeyboard()
        this.props.navigator.pop()
    }

    exit() {
        dismissKeyboard()
        this.props.navigator.pop()
    }

    onChangeText(text) {
        text == "" ?  this.setState({isSubmitActive: false}) : this.setState({isSubmitActive: true})
        this.setState({text: text})
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
                    style={{fontSize: 16, height: 200, color: '#607D8B', marginLeft: 30, marginRight: 30}}
                    onChangeText={(text) => this.onChangeText(text)}
                    value={this.state.text}/>
                <View style={{height: 60, borderWidth: 1, borderColor: "#f3f3f3" ,flexDirection: "row", justifyContent: "flex-end"}}>
                    <Text style={{fontSize: 14, color: "#607D8B", marginTop: 20, paddingRight: 10}}>{160 - this.state.text.length}</Text>
                    <TouchableHighlight
                        disabled={false}
                        underlayColor={'#00BCD4'}
                        onPress={this.onSubmit.bind(this)}
                        style={this.state.isSubmitActive ? styles.activePost : styles.inActivePost}>
                        <Text style={this.state.isSubmitActive ? styles.activeText : styles.inActiveText}> Post </Text>
                    </TouchableHighlight>
                </View>

            </View>
        );
    }
}

var styles = StyleSheet.create({
    activePost: {
        borderRadius: 5,
        backgroundColor: "#00BCD4",
        width: 80,
        height: 30,
        marginTop: 15,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inActivePost: {
        borderWidth: 1,
        borderColor: "#f3f3f3",
        borderRadius: 5,
        backgroundColor: "white",
        width: 80,
        height: 30,
        marginTop: 15,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeText: {
        color: "white"
    },
    inActiveText: {
        color: "#607D8B"
    },
})