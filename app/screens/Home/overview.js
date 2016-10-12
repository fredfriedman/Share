'use strict';

import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        RecyclerViewBackedScrollView,
        Text,
        Image,
        View, } from 'react-native';
import Communications from 'react-native-communications';

var {plusIcon, phoneIcon, whiteGradient } = require('../../config/images')
var TableViewGroup = require('../../components/TableViewGroup').default
var PatientTableViewCell = require('../../components/patientTableViewCell').default
var PatientDetailView = require('../Detail/detail').default
var PatientsView = require('../Home/patients_view').default
var Header = require('../../components/header').default

export default class Overview extends Component {

    constructor() {
        super();
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            dataSourceImproving: dataSource.cloneWithRows(
                [{name:'Bill Clinton', phone:"732-882-3145", status:"#388E3C"},
                {name:'Cindy Johnson', phone:"792-822-3145", status:"#388E3C"},
                {name:'Tom Haverford', phone:"342-822-3243", status: "#388E3C"}]),
            dataSourceCritical: dataSource.cloneWithRows(
                [{name:'Homer Simpson', phone:"552-822-0874", status:"#D32F2F"},
                {name:'Chase Jeter', phone:"398-112-4458", status:"#D32F2F"},
                {name:'Max Kellermueller', phone:"685-919-2231", status:"#D32F2F"}]),
            dataSourceStatic: dataSource.cloneWithRows(
                [{name:'Marge Simpson', phone:"443-822-0842", status: "#FFEB3B"},
                {name:'Claire Fox', phone:"661-333-4444", status: "#FFEB3B"},
                {name:'Jabari Parker', phone:"773-731-0981", status: "#FFEB3B"}]),
        }
    }

    /**
        Called when section header is selected

        Parameters:
            - patient : the patient or caregiver that was selected

        Calls the selected patient
    */
    onPressAction(patient) {
        Communications.phonecall(patient.phone.replace(/ /g,'-'), true)
    }

    /**
        Called when section header is selected

        Parameters:
            -

        Navigaters to patient detail page
    */
    onPressHeader() {
        this.props.navigator.push({
            component: PatientsView
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
            }
        })
    }

    /**
        Called when corner add button is selected

        Parameters:
            -

        Navigaters to add page
    */
    onAddPatient() {

    }

    /**
        Called when hidden archive button is selected

        Parameters:
            - patient: the selected patient

        Archives the selected patient; removing it from the table view
    */
    onPressArchive(patient) {
        console.log(patient)
    }

    render() {
        return (
        <View style={{ backgroundColor: '#FAFAFA', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Header
                text={"Overview"}
                rightAction={this.onAddPatient.bind(this)}
                rightIcon={plusIcon}/>
            <TableViewGroup
                title={"Critical"}
                headerIsEnabled={true}
                onPress={this.onPressHeader.bind(this)}
                onPressArchive={this.onPressArchive.bind(this)}
                style={styles.tableView}
                textStyle={styles.tableViewText}
                headerStyle={[styles.headerStyle, {backgroundColor: "#EF9A9A"}]}
                dataSource={this.state.dataSourceCritical}
                renderRow={this.renderRow.bind(this)}/>
            <TableViewGroup
                title={"Static"}
                headerIsEnabled={true}
                onPress={this.onPressHeader.bind(this)}
                onPressArchive={this.onPressArchive.bind(this)}
                style={styles.tableView}
                textStyle={styles.tableViewText}
                headerStyle={[styles.headerStyle, {backgroundColor: "#FFF59D"}]}
                dataSource={this.state.dataSourceStatic}
                renderRow={this.renderRow.bind(this)}/>
            <TableViewGroup
                title={"Improving"}
                headerIsEnabled={true}
                onPress={this.onPressHeader.bind(this)}
                onPressArchive={this.onPressArchive.bind(this)}
                style={styles.tableView}
                textStyle={styles.tableViewText}
                headerStyle={[styles.headerStyle, {backgroundColor: "#A5D6A7"}]}
                dataSource={this.state.dataSourceImproving}
                renderRow={this.renderRow.bind(this)}/>
        </View>
        );
    }

    renderRow(patient: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        return (
            <PatientTableViewCell
                onPress={()=>this.onPressPatient(patient)}
                onPressIcon={()=>this.onPressAction(patient)}
                status={patient.status}
                image={whiteGradient}
                actionIcon={phoneIcon}
                mainText={patient.name}
                subTitleText={patient.phone}/>
        )
    }
}

var styles = StyleSheet.create({
    headerStyle: {
        height: 20,
        backgroundColor: "blue"
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 5,
        paddingLeft: 10,
        paddingBottom: 5,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 40,
        height: 40,
        marginRight: 10,
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
