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
import DefaultEmptyTableViewCell from '../../../components/defaultEmptyTableViewCell'

export default class Overview extends Component {

    constructor(props) {
        super(props);

        this.patientsRef = this.getRef().child('Patients/')
        this.criticalPatientsRef = this.getRef().child('Nurses/' + props.user.id + "/Critical Patients")

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

        var items = {}

        var critical = {}

        var recentChanges = {}

        this.criticalPatientsRef.on('child_added', (snap) => {

            self.patientsRef.child(snap.key).on('value', (snapshot) => {

                var item = {
                    pID: snapshot.key,
                    name: snapshot.val().name,
                    status: snapshot.val().status
                }

                critical[snapshot.key] = item

                self.setState({
                    criticalPatients : self.state.dataSource.cloneWithRows(Object.values(critical).sort(this.compare).splice(0,3))
                });
            })
        })

        this.criticalPatientsRef.on('child_removed', (snap) => {
            delete critical[snap.key]

            self.setState({
                criticalPatients : self.state.dataSource.cloneWithRows(Object.values(critical))
            });
        })
    }

    compare(a,b) {
        if (a.status == b.status) {
            return 0
        }
        return a.status < b.status ? 1 : -1
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
        this.criticalPatientsRef.child(data.pID).remove()
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
                        title={"Distressed Caregivers"}
                        headerIsEnabled={true}
                        onPress={this.onPressHeader.bind(this)}
                        onPressArchive={this.onPressArchive.bind(this)}
                        style={[styles.tableView, {marginTop: 20}]}
                        textStyle={styles.tableViewText}
                        headerStyle={styles.distressedHeader}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        renderFooter={() => this.state.dataSource.getRowCount() == 0 ?  <DefaultEmptyTableViewCell text={"Yay! Your caregiver's are okay"}/> : null}/>
                    <TableViewGroup
                        title={"Recent Updates"}
                        headerIsEnabled={true}
                        onPress={this.onPressHeader.bind(this)}
                        onPressArchive={this.onPressArchive.bind(this)}
                        style={[styles.tableView, {marginTop: 20}]}
                        textStyle={styles.tableViewText}
                        headerStyle={styles.recentHeader}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this) }
                        renderFooter={() => this.state.dataSource.getRowCount() == 0 ?  <DefaultEmptyTableViewCell text={"There are no updates"}/> : null}/>
                </ScrollView>
                <ModalView
                    modalVisible={this.state.modalVisible}
                    patientID={this.state.modalVisiblePatient}
                    closeModal={this.setModalVisible.bind(this, null, false)}/>
            </View>
        );
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
    distressedHeader: {
        backgroundColor: "$colors.accent"
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
