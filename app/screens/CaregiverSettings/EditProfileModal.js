import React, { Component } from 'react';
import {
        ListView,
        Modal,
        TextInput,
        View,
    } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from 'react-native-button'

export default class EditProfileModal  extends Component {

    constructor() {
        super()

        this.state = {
            text: ""
        }
    }

    save(value) {

        this.setState({text: ""})

        this.props.saveInfo(value)
    }

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({text: text})}
                            placeholder={this.props.placeholder}
                            multiline={false}
                            value={this.state.text}
                        />
                        <View style={styles.separator}/>
                        <View style={styles.row}>
                            <View style={{flex: 1}}/>
                            <Button
                                onPress={() => this.save(this.state.text)}
                                style={styles.modalButton}>
                                Save
                            </Button>
                            <View style={{flex: 2}}/>
                            <Button
                                onPress={() => this.props.closeModal()}
                                style={styles.modalButton}>
                                Close
                            </Button>
                            <View style={{flex: 1}}/>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    labelText: {
        alignSelf: 'center',
        paddingBottom: 5,
        fontSize: 18,
        fontWeight: '500',
        fontFamily: '$fonts.family'
    },
    innerContainer: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 5
    },
    modalButton: {
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        flex: 1,
        height: '$dimensions.hairlineWidth',
        backgroundColor: '#8E8E8E'
    },
    textInput: {
        marginTop: 5,
        marginLeft: 5,
        height: 50,
        color: '$colors.darkGray'
    },
})
