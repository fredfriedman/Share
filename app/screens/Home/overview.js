'use strict';

import React, { Component } from 'react';
import {
        Image,
        ListView,
        Modal,
        Platform,
        ScrollView,
        StyleSheet,
        Text,
        TouchableHighlight,
        View, } from 'react-native';
import Dimensions from 'Dimensions';
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome';

var TableViewGroup = require('../../components/TableViewGroup').default
var PatientTableViewCell = require('../../components/patientTableViewCell').default
var PatientDetailView = require('../Detail/detail').default
var PatientsView = require('../Home/patients_view').default
var ModalView = require('./modalCallView').default
var Header = require('../../components/header').default
var firebase = require('../../config/firebase')
var { dimensions } = require('../../config/dimensions')

export default class Overview extends Component {

    constructor(props) {
        super(props);

        this.patientsRef = this.getRef().child('Patients/')
        this.myPatientsRef = this.getRef().child('Nurses/' + props.user.id + "/Patients")

        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),

            modalVisible: false,
            modalVisiblePatient: null
        }
    }

    componentDidMount() {
        this.listenForItems(this.patientsRef);
    }

    getRef() {
        return firebase.database().ref();
    }

    listenForItems(patientsRef) {

        var self = this

        this.myPatientsRef.on('child_added', (snap) => {

            var items = [];

            self.patientsRef.child(snap.key).on('value', (snap) => {

                if (snap.val().active) {
                    items.push({
                        pID: snap.key,
                        name: snap.val().name,
                    });
                }
                self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(items)
                });
            });
        });
    }

    //////////////////////////
    // Phone Call Functions //
    //////////////////////////

    setModalVisible(patient, visible) {
        this.setState({modalVisible: visible, modalVisiblePatient: patient});
    }

    /**
        Called when the phone icon is selected

        Parameters:
            - patient : the patient or caregiver that was selected

        Presents a modal view to calls the selected patients caregivers
    */
    onPressAction(patient) {
        this.setModalVisible(patient, true)
    }

    //////////////////////////////
    // TableViewGroup Functions //
    //////////////////////////////

    /**
        Called when section header is selected

        Parameters:
            -

        Navigaters to patient detail page
    */
    onPressHeader() {
        this.props.navigator.push({
            component: PatientsView,
            passProps: {
                user: this.props.user,
            }
        })
    }

    /**
        Called when tableView cell is clicked

        Parameters:
            - patient : the patient or caregiver that was clicked

        Navigaters to patient detail page
    */
    onPressPatient(patient) {
        this.props.navigator.push({
            component: PatientDetailView,
            backButtonTitle: 'Back',
            passProps: {
                patient: patient,
                user: this.props.user,
            }
        })
    }

    /**
        Called when hidden archive button is selected

        Parameters:
            - patient: the selected patient

        Archives the selected patient; removing it from the table view
    */
    onPressArchive(title, data, secdId, rowId) {
        this.patientsRef.child(data.pid + "/active").set(false);
    }

    render() {

        return (
            <View style={{flexDirection: 'column', flex: 1 }}>
                <Header
                    text={"Overview"}
                    headerStyle={styles.header}
                    textStyle={{fontFamily: (Platform.OS === 'ios') ? 'Helvetica Neue' : "Noto", color: '#333333', fontSize: 32, fontWeight: '400', marginLeft: 10, marginTop: 65}}/>
                <ScrollView style={{marginTop: 5, backgroundColor: '#f8f8f8'}} contentContainerStyle={{paddingTop: 10, paddingBottom: 10}}>
                    <TableViewGroup
                        title={"Critical"}
                        headerIsEnabled={true}
                        onPress={this.onPressHeader.bind(this)}
                        onPressArchive={this.onPressArchive.bind(this)}
                        style={styles.tableView}
                        textStyle={styles.tableViewText}
                        headerStyle={[styles.headerStyle, {backgroundColor: "#EF9A9A"}]}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}/>
                    <TableViewGroup
                        title={"Recent Update"}
                        headerIsEnabled={true}
                        onPress={this.onPressHeader.bind(this)}
                        onPressArchive={this.onPressArchive.bind(this)}
                        style={[styles.tableView, {marginTop: 20}]}
                        textStyle={styles.tableViewText}
                        headerStyle={[styles.headerStyle, {backgroundColor: "#A5D6A7"}]}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}/>
                </ScrollView>
                <ModalView
                    modalVisible={this.state.modalVisible}
                    patientID={this.state.modalVisiblePatient}
                    closeModal={this.setModalVisible.bind(this, null, false)}/>
            </View>
        );
    }

    renderRow(patient: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {

        const phoneIcon = (<Icon name="phone-square" size={dimensions.iconSize} color="#1e1e1e" />);

        return (
            <PatientTableViewCell
                onPress={()=>this.onPressPatient(patient)}
                onPressIcon={()=>this.onPressAction(patient.pID)}
                status={patient.status}
                image={phoneIcon}
                actionIcon={phoneIcon}
                mainText={patient.name}
                subTitleText={patient.phone}/>
        )
    }
}

var styles = StyleSheet.create({
    header: {
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0
        },
        elevation: 20,
        height: 150,
        backgroundColor: 'white'
    },
    headerStyle: {
        height: 20,
        backgroundColor: "blue"
    },
    tableView: {
        backgroundColor: '#FFFFFF',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        elevation: 20,
        marginLeft: 10,
        marginRight: 10
    },
    tableViewText: {
        marginLeft: 5,
        fontWeight: 'bold',
        color: '#1B1B1B',
        marginTop: 2
    },
});
