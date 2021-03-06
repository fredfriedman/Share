'use strict';

import React, { Component } from 'react';
import {
        ListView,
        ScrollView,
        Text,
        View,
    } from 'react-native';

// Utility
import Firebase from '../../../config/firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';
import SharedStyle from '../styles'

// Pages
import PatientsView from './patients_view'
import PatientDetailView from '../../Detail/detail'
import LoadingAnimationView from '../../../components/loadingAnimationView'
// Components
import Button from 'react-native-button'
import Header from '../../../components/header'
import ModalView from './modalCallView'
import TableViewGroup from '../../../components/TableViewGroup'
import PatientTableViewCell from '../../../components/patientTableViewCell'

export default class Overview extends Component {

    constructor(props) {
        super(props);

        this.patientsRef = this.getRef().child('Patients/')
        this.caregiversRef = this.getRef().child('Caregivers/')
        this.updatingPatientsRef = this.getRef().child('Nurses/' + props.user.id + "/RC Patients")
        this.criticalPatientsRef = this.getRef().child('Nurses/' + props.user.id + "/Critical Patients")
        this.distressedPatientsRef = this.getRef().child('Nurses/' + props.user.id + "/Distressed Patients")

        this.state = {
            criticalPatients: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
            updatedPatients: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
            distressedPatients: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
            isVisible: true,
            modalVisible: false,
            modalVisiblePatient: null
        }
        this.listeners = {}
    }

    componentDidMount() {
        this.listenForItems(this.criticalPatientsRef, "criticalPatients", this.callback1.bind(this))
        this.listenForItems(this.updatingPatientsRef, "updatedPatients", this.callback2.bind(this))
        this.listenForItems(this.distressedPatientsRef, "distressedPatients", this.callback3.bind(this))
    }

    componentsWillUnmount() {
        this.patientsRef.off()
        this.caregiversRef.off()
        this.updatingPatientsRef.off()
        this.criticalPatientsRef.off()
        this.distressedPatientsRef.off()
    }
    getRef() {
        return Firebase.database().ref();
    }

    setListState(type, comparison, patients) {
        this.setState({isVisible: false})
        this.setState({ [type] : this.state[type].cloneWithRows(Object.values(patients).sort(comparison)) });
    }

    callback1(patients, state,  snapshot) {
        this.callback(patients, state, snapshot)
    }

    callback2(patients, state,  snapshot) {
        this.callback(patients, state, snapshot)
    }

    callback3(patients, state,  snapshot) {
        this.callback(patients, state, snapshot)
    }

    callback(patients, state, snapshot) {
        var self = this

        self.caregiversRef.child(snapshot.val()["primary caregiver"] + "/Profile/name").once('value', snsht => {

            var item = {
                pID: snapshot.key,
                name: snapshot.val().name,
                status: snapshot.val().status,
                caregiverDistress: snapshot.val()["caregiver distress"],
                primaryCaregiver: snsht.val()
            }

            patients[snapshot.key] = item

            self.setListState(state, self.compare, patients)
        })

    }

    listenForItems(typePatientsRef, state, callback) {

        var self = this

        var patients = {}

        typePatientsRef.on('child_added', (snap) => {

            var listener = self.patientsRef.child(snap.key).on('value', callback.bind(this, patients, state))

            self.listeners[state + snap.key] = listener
        })

        typePatientsRef.on('child_removed', (snap) => {

            delete patients[snap.key]
            console.log(state + snap.key, self.listeners[state + snap.key], self.listeners)
            self.patientsRef.child(snap.key).off('value', self.listeners[state + snap.key])

            self.setListState(state, self.compare, patients)
        })
    }

    compare(av,bv) {
        var a = parseInt(av.status)
        var b = parseInt(bv.status)
        if (a == b) {
            return 0
        }
        return a < b ? 1 : -1
    }

    compareDistress(av,bv) {
        if (a.distress == b.distress) {
            return 0
        }
        return a.distress < b.distress ? 1 : -1
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
    onPressHeader(type) {
        this.props.navigator.push({
            component: PatientsView,
            passProps: {
                user: this.props.user,
                type: type,
                backEnabled: true,
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
        this.patientsRef.child(data.pID + "/active").set(false);
        this.criticalPatientsRef.child(data.pID).remove()
        this.updatingPatientsRef.child(data.pID).remove()
    }

    render() {
        const peopleIcon = <Icon name="users" size={20} color="#E7E7E7" />

        return (
            <View style={SharedStyle.container}>
                <Header
                    text={"Overview"}
                    rightAction={this.onPressHeader.bind(this, "Patients")}
                    rightIcon={peopleIcon}
                    headerStyle={SharedStyle.header}
                    textStyle={SharedStyle.header_text}/>
                { this.renderView()}
                <ModalView
                    modalVisible={this.state.modalVisible}
                    patientID={this.state.modalVisiblePatient}
                    closeModal={this.setModalVisible.bind(this, null, false)}/>
            </View>
        );
    }

    renderView() {
        return ( this.state.isVisible ?
            <LoadingAnimationView animation={this.state.isVisible}/>
            :
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                { this.renderTable("Critical Patients", "All Critical", "criticalPatients", "Critical Patients") }
                { this.renderTable("Status Updates", "All Updates", "updatedPatients", "RC Patients") }
                { this.renderTable("Patients With Distressed Caregivers", "All Distressed", "distressedPatients", "Distressed Patients") }
            </ScrollView>

        )
    }

    renderRow(patient: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {

        const squarePhoneIcon = <Icon name="phone-square" size={30} color="#262626" />

        return (
            <PatientTableViewCell
                onPress={()=>this.onPressPatient(patient)}
                onPressIcon={()=>this.onPressAction(patient.pID)}
                status={patient.status}
                actionIcon={squarePhoneIcon}
                mainText={patient.name}
                subText={patient.primaryCaregiver}/>
        )
    }

    renderTable(title, footerTitle, datasource, fbLabel) {
        var entrance = ['slideInDown', 'slideInUp', 'slideInLeft', 'slideInRight'][Math.floor(Math.random() * 3)]

        return ( this.state[datasource].getRowCount() == 0 ?
                null
                :
                <TableViewGroup

                    headerTitle={title}
                    footerTitle={footerTitle}
                    onPress={this.onPressHeader.bind(this, fbLabel)}
                    onPressArchive={this.onPressArchive.bind(this)}
                    style={[styles.tableView, {marginTop: 15}]}
                    dataSource={this.state[datasource]}
                    renderRow={this.renderRow.bind(this)}/>
            )
    }
}

const styles = EStyleSheet.create({
    scrollViewContainer: {
        backgroundColor: 'transparent',
    },
    tableView: {
        backgroundColor: '#FFFFFF',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowOffset: {
            height: 0.5,
            width: 0
        },
        elevation: 10,
        marginLeft: 10,
        marginRight: 10
    },
    tableViewText: {
        marginTop: 2,
        marginLeft: 5,
        color: '$colors.darkGray',
        fontWeight: 'bold',
        fontFamily: '$fonts.family',
    },
});
