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

var Header = require('../../components/header').default
var TableViewGroup = require('../../components/TableViewGroup').default
var PatientDetailView = require('../Detail/detail').default
var PatientTableViewCell = require('../../components/patientTableViewCell').default

var { dimensions } = require('../../config/dimensions')

export default class PatientsView extends Component {

    constructor() {
        super();

        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            patients: [
            {name:'Homer Simpson', phone:"552-822-0874", status:"#D32F2F"},
            {name:'Chase Jeter', phone:"398-112-4458", status:"#F44336"},
            {name:'Max Kellermueller', phone:"685-919-2231", status:"#F57C00"},
            {name:'Marge Simpson', phone:"443-822-0842", status: "#FFC107"},
            {name:'Claire Fox', phone:"661-333-4444", status: "#FDD835"},
            {name:'Jabari Parker', phone:"773-731-0981", status: "#FFEE58"},
            {name:'Tom Haverford', phone:"342-822-3243", status: "#CDDC39"},
            {name:'Cindy Johnson', phone:"792-822-3145", status:"#8BC34A"},
            {name:'Bill Clinton', phone:"732-882-3145", status:"#388E3C"}
            ]
        };
    }

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
    Called when hidden archive button is selected

    Parameters:
        - patient: the selected patient

    Archives the selected patient; removing it from the table view
*/
    onPressArchive(title, data, secdId, rowId) {

        // TODO: Call firebase to actually archive data

        var items = this.state.patients
        items.splice(rowId, 1)
        this.setState({patients: items})
    }

    onPressIcon(sectionID, rowID) {
        console.log("icon",sectionID, rowID)
    }

    onBack() {
        this.props.navigator.pop()
    }

    render() {

        const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" style={{marginTop: -5}} size={dimensions.iconSize} color="white" />);

        return (
            <View style={{flexDirection: 'column', flex: 1 }} noSpacer={false} noScroll={false}>
                <Header leftAction={this.onBack.bind(this)} leftIcon={backIcon} text={"Patients"}/>
                <TableViewGroup
                    title={"Patients"}
                    style={{backgroundColor: '#f8f8f8', flex: 1}}
                    onPress={this._pressData}
                    onPressArchive={this.onPressArchive.bind(this)}
                    scrollEnabled={true}
                    textStyle={{marginTop: 25, color: '#FFFFFF', fontSize: 18, textAlign: 'center'}}
                    dataSource={this.dataSource.cloneWithRows(this.state.patients)}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
            </View>
        );
    }

    renderRow(patient: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {

        const phoneIcon = (<FAIcon name="phone" size={dimensions.iconSize} color="#212121" />);

        return (
            <PatientTableViewCell
                onPress={()=>this.onPressPatient(patient)}
                onPressIcon={()=>this.onPressIcon(sectionID, rowID)}
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
