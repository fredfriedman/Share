import React, { Component } from 'react';
import {
        ListView,
        Modal,
        StyleSheet,
        Text,
        View, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button'
import Communications from 'react-native-communications';
var firebase = require('../../config/firebase')
var ModalCallCell = require('../../components/modalCallCell').default

export default class ModalCallView  extends Component {

    constructor(props) {
        super()

        this.patientsRef = this.getRef().child('Patients/')
        this.caregiversRef = this.getRef().child('Caregivers/')

        this.state = {
            datasource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
        }
    }

    getRef() {
        return firebase.database().ref();
    }

    getPatientCaregivers() {

        var self = this

        this.patientsRef.child(this.props.patientID + "/Caregivers").on('child_added', function(snap) {

            var items = [];

            self.caregiversRef.child(snap.key).once('value', function(snapshot) {
                items.push({ profile: snapshot.val().Profile, });

                self.setState({ datasource: self.state.datasource.cloneWithRows(items) })

            }, function(error) {
                console.error(error);
            });

        }, function(error) {
            console.error(error);
        });
    }

    onCallCaregiver(phone) {
        Communications.phonecall(phone.replace(/ /g,'-'), true)
    }

    renderCallRow(caregiver: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        return (
            <ModalCallCell
                onPress={()=>this.onCallCaregiver(caregiver.phone)}
                caregiver={caregiver.profile}/>
        )
    }

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
                onShow={this.getPatientCaregivers.bind(this)}>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.labelText}> Listed Caregivers </Text>
                        <ListView
                            dataSource={this.state.datasource}
                            renderRow={this.renderCallRow.bind(this)}
                            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                            scrollEnabled={false}/>
                        <Button
                            onPress={() => this.props.closeModal()}
                            style={styles.modalButton}>
                            Close
                        </Button>
                    </View>
                </View>
            </Modal>
        )
    }
}

var styles = StyleSheet.create({
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
        fontWeight: '500'
    },
    innerContainer: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 5
    },
    modalButton: {
        marginTop: 10,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E'
    }
})
