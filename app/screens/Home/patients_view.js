'use strict';

import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        RecyclerViewBackedScrollView,
        Text,
        Image,
        View, } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

var firebase = require('../../config/firebase')
var Header = require('../../components/header').default
var TableViewGroup = require('../../components/TableViewGroup').default
var ModalView = require('./modalCallView').default
var PatientDetailView = require('../Detail/detail').default
var PatientTableViewCell = require('../../components/patientTableViewCell').default

var styles = require('../../config/styles')

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

        const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" style={{marginTop: -5}} size={30} color="white" />);

        return (
            <View style={{flexDirection: 'column', flex: 1 }} noSpacer={false} noScroll={false}>
                <Header leftAction={this.onBack.bind(this)} leftIcon={backIcon} text={"Patients"}/>
                <TableViewGroup
                    title={"Patients"}
                    style={{backgroundColor: '#f8f8f8', flex: 1}}
                    onPress={this.onPressAction.bind(this)}
                    onPressArchive={this.onPressArchive.bind(this)}
                    scrollEnabled={true}
                    textStyle={{marginTop: 25, color: '#FFFFFF', fontSize: 18, textAlign: 'center'}}
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

        const phoneIcon = (<FAIcon name="phone" size={30} color="#212121" />);

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

var styles = StyleSheet.create({
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    stack: {
        flexDirection: 'column'
    },
    statusBar: {
        backgroundColor: 'red',
        width: 6,
        height: 43,
        marginTop: 0.5,
    },
    row: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        marginTop: 2,
        width: 40,
        height: 40,
        marginLeft: 1,
        marginRight: 10,
    },
    text: {
        flex: 0,
        marginTop: 10,
        fontSize: 14,
        fontWeight: '100',
    },
    subTitle: {
        flex: 0,
        paddingTop: 5,
        fontSize: 10,
        fontWeight: '100',
    },
});
