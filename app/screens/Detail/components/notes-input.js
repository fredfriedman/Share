'use strict';
import React, { Component } from 'react';
import {
        Image,
        KeyboardAvoidingView,
        Navigator,
        StyleSheet,
        Text,
        TextInput,
        TouchableHighlight,
        View
    } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import Header from '../../../components/header'
import Firebase from '../../../config/firebase'
import { butterfly } from '../../../config/images'
import dismissKeyboard from 'dismissKeyboard'

export default class noteInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            notesRef: this.getRef().child('Patients').child(this.props.patient.pID).child('Notes')
        }
    }

    getRef() {
        return Firebase.database().ref();
    }

    onSubmit() {
        this.state.notesRef.push({
            pid: this.props.user.id,
            poster: this.props.user.Profile.name,
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
        this.setState({text: text})
    }

    render() {

        const iconColor="#1e1e1e"
        const placeholderTextColor = '#607D8B'
        const closeIcon = ( <Icon name="ios-close" ios="ios-close" md="md-close" size={30} color={iconColor} />);

        return (
            <View stye={styles.container}>
                <Header
                    leftAction={() => console.log()}
                    leftIcon={<Image style={styles.icon} source={butterfly}/>}
                    rightAction={this.exit.bind(this)}
                    rightIcon={closeIcon}
                    headerStyle={styles.header}/>
                <TextInput
                    maxLength={140}
                    multiline={true}
                    placeholder={"What's Happening"}
                    placeholderTextColor={placeholderTextColor}
                    style={[styles.text, styles.textInput]}
                    onChangeText={(text) => this.onChangeText(text)}
                    value={this.state.text}/>
                <View style={styles.submissionView}>
                    <Text style={[styles.text, styles.textLengthLabel]}>{140 - this.state.text.length}</Text>
                    <TouchableHighlight
                        disabled={this.state.text.length == 0}
                        underlayColor={'#00BCD4'}
                        onPress={this.onSubmit.bind(this)}
                        style={this.state.text.length == 0 ? styles.inactiveButton : styles.activeButton}>
                        <View><Text style={this.state.text.length == 0 ? styles.inactiveButtonText : styles.activeButtonText}> Post </Text></View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    activeButton: {
        borderRadius: 5,
        backgroundColor: "#00BCD4",
        width: 80,
        height: 30,
        marginTop: 15,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeButtonText: {
        color: "white"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white"
    },
    header: {
        height: 60,
        borderColor: 'white',
        backgroundColor: 'white'
    },
    icon: {
        height:30,
        width: 30
    },
    inactiveButton: {
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
    inactiveButtonText: {
        color: "#607D8B"
    },
    submissionView: {
        height: 60,
        borderWidth: 1,
        borderColor: "#f3f3f3" ,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    text: {
        fontSize: 14,
        color: "#607D8B",
    },
    textLengthLabel: {
        marginTop: 20,
        paddingRight: 10
    },
    textInput: {
        fontSize: 16,
        height: 200,
        marginLeft: 30,
        marginRight: 30
    },
})
