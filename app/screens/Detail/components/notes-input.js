'use strict';
import React, { Component } from 'react';
import {
        Image,
        Text,
        TextInput,
        TouchableHighlight,
        View
    } from 'react-native';

// Assets
import Icon from 'react-native-vector-icons/Ionicons'
import { butterfly } from '../../../config/images'

// Components
import Header from '../../../components/header'

// Utiilities
import Firebase from '../../../config/firebase'
import dismissKeyboard from 'dismissKeyboard'
import EStyleSheet from 'react-native-extended-stylesheet';

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
                    leftAction={this.exit.bind(this)}
                    leftIcon={closeIcon}
                    centerIcon={<Image style={styles.icon} source={butterfly}/>}
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
                        <Text style={this.state.text.length == 0 ? styles.inactiveButtonText : styles.activeButtonText}> Post </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    activeButton: {
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "$colors.main",
        borderRadius: 5,
        borderColor: "$colors.lightGray",
        marginTop: 15,
        marginRight: 30,

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
        borderColor: 'white',
        backgroundColor: 'white'
    },
    icon: {
        height: '$dimensions.iconSize',
        width:  '$dimensions.iconSize'
    },
    inactiveButton: {
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "$colors.lightGray",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "white",
        marginTop: 15,
        marginRight: 30,
    },
    inactiveButtonText: {
        color: "$colors.status",
    },
    submissionView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        height: 60,
        borderWidth: 1,
        borderColor: "$colors.lightGray" ,
    },
    text: {
        fontSize: "$fonts.size",
        color: "$colors.status",
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
