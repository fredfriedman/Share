'use strict';

import React, { Component } from 'react';
import {
        ListView,
        View,
    } from 'react-native';

// Components
import  Header from '../../../components/header'
import  ModalView from './modalCallView'
import  PatientTableViewCell from '../../../components/patientTableViewCell'

// Pages
import  PatientDetailView from '../../Detail/detail'

// Tools
import Firebase from '../../../config/firebase'
import EStyleSheet from 'react-native-extended-stylesheet'
import SharedStyle from '../styles'
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PatientsView extends Component {

    constructor(props) {
        super(props);

        this.patientRef = this.getRef().child('Nurses/' + props.user.id + "/").child(props.type)
        this.caregiversRef = this.getRef().child('Caregivers/')
        this.patientDataRef = this.getRef().child('Patients/')

        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            modalVisible: false,
            modalVisiblePatient: null,
        };
    }

    componentDidMount() {
        this.listenForItems();
    }

    getRef() {
        return Firebase.database().ref();
    }

    listenForItems() {

        var self = this

        var patients = {};

        this.patientRef.on('child_added', (snap) => {

            self.patientDataRef.child(snap.key).on('value', (snap) => {

                if (snap.val().active) {

                    self.caregiversRef.child(snap.val()["primary caregiver"] + "/Profile/name").once('value', snsht => {

                        var patient = {
                            pID: snap.key,
                            name: snap.val().name,
                            status: snap.val().status,
                            primaryCaregiver: snsht.val()
                        };

                        patients[snap.key] = patient

                        self.setState({ dataSource: self.state.dataSource.cloneWithRows(Object.values(patients).sort(this.compare)) });
                    })

                } else {
                    delete patients[snap.key]

                    self.setState({ dataSource: self.state.dataSource.cloneWithRows(Object.values(patients).sort(this.compare)) });
                }
            });
        });
    }

    compare(a,b) {
        if (a.status == b.status) {
            return 0
        }
        return a.status < b.status ? 1 : -1
    }

    //////////////////
    // UI Functions //
    //////////////////

    setModalVisible(patient, visible) {
        this.setState({modalVisible: visible, modalVisiblePatient: patient});
    }

    onPressCallAction(patient) {
        this.setModalVisible(patient, true)
    }

    onPressPatient(patient) {
        this.props.navigator.push({
          component: PatientDetailView,
          backButtonTitle: 'Back',
          passProps: {
              user: this.props.user,
              patient: patient,
          }
      })
    }

    onPressArchive(title, data, secdId, rowId) {
        this.patientDataRef.child(data.pID + "/active").set(false);
        this.userPatientRef.child(props.type).child(data.pID).remove()
    }

    onPressBack() {
        this.props.navigator.pop()
    }

    render() {
        const backIcon = <Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="#262626" />

        return (
            <View style={SharedStyle.container} noSpacer={false} noScroll={false}>
                <Header
                    headerStyle={SharedStyle.header}
                    textStyle={SharedStyle.header_text}
                    leftAction={this.onPressBack.bind(this)}
                    leftIcon={backIcon}
                    text={this.props.type}/>
                <ListView
                    title={"Patients"}
                    style={styles.tableViewContainer}
                    onPress={this.onPressCallAction.bind(this)}
                    onPressArchive={this.onPressArchive.bind(this)}
                    scrollEnabled={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
                <ModalView
                    modalVisible={this.state.modalVisible}
                    patientID={this.state.modalVisiblePatient}
                    closeModal={this.setModalVisible.bind(this, null, false)}/>
            </View>
        );
    }

    renderRow(patient: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        const phoneIcon = <FAIcon name="phone" size={30} color="#262626" />

        return (
            <PatientTableViewCell
                onPress={()=>this.onPressPatient(patient)}
                onPressIcon={this.onPressCallAction.bind(this, patient.pID)}
                status={patient.status}
                actionIcon={phoneIcon}
                mainText={patient.name}
                subText={patient.primaryCaregiver}
            />
        )
    }
}

const styles = EStyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: '$colors.secondary',
    },
    separator: {
        marginLeft: 20,
        flex: 1,
        height: '$dimensions.hairlineWidth',
        backgroundColor: '$colors.lightGray',
    },
    stack: {
        flexDirection: 'column'
    },
    statusBar: {
        width: 6,
        height: 43,
        marginTop: 0.5,
    },
    subTitle: {
        flex: 0,
        paddingTop: 5,
        fontSize: 10,
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
    tableViewContainer: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    text: {
        flex: 0,
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
        textAlign: 'center',
        marginTop: 25,
    },
    thumb: {
        width: 40,
        height: 40,
        marginTop: 2,
        marginLeft: 1,
        marginRight: 10,
    },
});
