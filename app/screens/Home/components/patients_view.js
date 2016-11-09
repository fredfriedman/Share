'use strict';

import React, { Component } from 'react';
import {
        ListView,
        View,
    } from 'react-native';

// Assets
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

// Components
import  Header from '../../../components/header'
import  ModalView from './modalCallView'
import  TableViewGroup from '../../../components/TableViewGroup'
import  PatientTableViewCell from '../../../components/patientTableViewCell'

// Pages
import  PatientDetailView from '../../Detail/detail'

// Tools
import Firebase from '../../../config/firebase'
import EStyleSheet from 'react-native-extended-stylesheet';

export default class PatientsView extends Component {

    constructor(props) {
        super(props);

        this.patientsRef = this.getRef().child('Patients/')
        this.myPatientsRef = this.getRef().child('Nurses/' + props.user.id + "/Patients")

        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            modalVisible: false,
            modalVisiblePatient: null,
        };
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

        this.myPatientsRef.on('child_added', (snap) => {

            self.patientsRef.child(snap.key).on('value', (snap) => {

                if (snap.val().active) {
                    items.push({
                        pID: snap.key,
                        name: snap.val().name,
                        status: snap.val().status
                    });
                }
                self.setState({ dataSource: self.state.dataSource.cloneWithRows(items) });
            });
        });
    }

    setModalVisible(patient, visible) {
        this.setState({modalVisible: visible, modalVisiblePatient: patient});
    }

    onPressAction(patient) {
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
    /**
        Called when hidden archive button is selected

        Parameters:
            - patient: the selected patient

        Archives the selected patient; removing it from the table view
    */
    onPressArchive(title, data, secdId, rowId) {

        this.patientsRef.child(data.pid + "/active").set(false);

        var items = this.state.patients
        items.splice(rowId, 1)
        this.setState({patients: items})
    }

    onBack() {
        this.props.navigator.pop()
    }

    render() {

        return (
            <View style={styles.container} noSpacer={false} noScroll={false}>
                { this.renderHeader()}
                <TableViewGroup
                    title={"Patients"}
                    style={styles.tableViewContainer}
                    onPress={this.onPressAction.bind(this)}
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

    renderHeader() {

        const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="white" />);

        if (this.props.backEnabled ) {
            return (    <Header
                            textStyle={{color: 'white'}}
                            leftAction={this.onBack.bind(this)}
                            leftIcon={backIcon} text={"Patients"}/> )
        } else {
            return (
                        <Header
                            textStyle={{color: 'white'}}
                            text={"Patients"}/> )
        }
    }

    renderRow(patient: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {

        const phoneIcon = (<FAIcon name="phone" size={30} color="#262626" />);

        return (
            <PatientTableViewCell
                onPress={()=>this.onPressPatient(patient)}
                onPressIcon={this.onPressAction.bind(this, patient.pID)}
                status={patient.status}
                actionIcon={phoneIcon}
                mainText={patient.name}
                subTitleText={patient.phone}
            />
        )
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1
    },
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
