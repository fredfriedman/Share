'use strict';

import React, { Component } from 'react';
import {
        ListView,
        ScrollView,
        View,
    } from 'react-native';

// Utility
import Firebase from '../../../config/firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

// Pages
import PatientsView from './patients_view'
import PatientDetailView from '../../Detail/detail'

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
        this.myPatientsRef = this.getRef().child('Nurses/' + props.user.id + "/Patients")

        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
            criticalPatients: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
            recentChanges: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),

            modalVisible: false,
            modalVisiblePatient: null
        }
    }

    componentDidMount() {
        this.listenForItems(this.patientsRef);
    }

    getRef() {
        return Firebase.database().ref();
    }

    listenForItems(patientsRef) {

        var self = this

        var items = [];

        var critical = []

        var recentChanges = []

        this.myPatientsRef.on('child_added', (snap) => {

            self.patientsRef.child(snap.key).on('value', (snap) => {

                if (snap.val().active) {

                    var item = {
                        pID: snap.key,
                        name: snap.val().name,
                        status: snap.val().status
                    }

                    items.push(item)

                    if ( critical.length < 3 && snap.val().status > 75){ critical.push(item); }
                    else if ( critical.length > 0 && critical[0].status < snap.val().status) { critical.shift(); critical.push(item); }

                } else {
                    if ( (snap.key in items) ) { delete items[snap.key]}
                }
                self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(items),
                    criticalPatients : self.state.dataSource.cloneWithRows(critical)
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
                backEnabled: true
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
    }

    render() {

        return (
            <View style={styles.container}>
                <Header
                    text={"Overview"}
                    headerStyle={styles.header}
                    textStyle={styles.header_text}/>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <TableViewGroup
                        title={"Critical"}
                        headerIsEnabled={true}
                        onPress={this.onPressHeader.bind(this)}
                        onPressArchive={this.onPressArchive.bind(this)}
                        style={styles.tableView}
                        textStyle={styles.tableViewText}
                        headerStyle={styles.criticalHeader}
                        dataSource={this.state.criticalPatients}
                        renderRow={this.renderRow.bind(this)}/>
                    <TableViewGroup
                        title={"Recent Update"}
                        headerIsEnabled={true}
                        onPress={this.onPressHeader.bind(this)}
                        onPressArchive={this.onPressArchive.bind(this)}
                        style={[styles.tableView, {marginTop: 20}]}
                        textStyle={styles.tableViewText}
                        headerStyle={styles.recentHeader}
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

        const phoneIcon = (<Icon name="phone-square" size={30} color="#262626" />);

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

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        height: 60,
        backgroundColor: '$colors.lightGray',
    },
    header_text: {
        color: '$colors.darkGray',
        fontSize: 18,
        fontWeight: '$fonts.weight',
        fontFamily: "$fonts.family",
    },
    criticalHeader: {
        backgroundColor: '#EF9A9A'
    },
    recentHeader: {
        backgroundColor: "$colors.main"
    },
    scrollViewContainer: {
        backgroundColor: 'transparent',
        paddingTop: 10,
        paddingBottom: 10
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
        marginTop: 2,
        marginLeft: 5,
        color: '$colors.darkGray',
        fontWeight: 'bold',
        fontFamily: '$fonts.family',
    },
});
