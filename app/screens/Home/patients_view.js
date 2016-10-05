'use strict';

import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        RecyclerViewBackedScrollView,
        Text,
        Image,
        View, } from 'react-native';

var { phoneIcon, whiteGradient } = require('../../config/images')
var TableViewGroup = require('../../components/TableViewGroup').default
var PatientDetailView = require('../Detail/detail').default
var PatientTableViewCell = require('../../components/patientTableViewCell').default

export default class PatientsView extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
            {name:'Bill Clinton', phone:"732-882-3145", status:"#329a22"},
            {name:'Cindy Johnson', phone:"792-822-3145", status:"#329a22"},
            {name:'Tom Haverford', phone:"342-822-3243", status: "#329a22"},
            {name:'Homer Simpson', phone:"552-822-0874", status:"#d80d0d"},
            {name:'Chase Jeter', phone:"398-112-4458", status:"#d80d0d"},
            {name:'Max Kellermueller', phone:"685-919-2231", status:"#d80d0d"},
            {name:'Marge Simpson', phone:"443-822-0842", status: "#FFD700"},
            {name:'Claire Fox', phone:"661-333-4444", status: "#FFD700"},
            {name:'Jabari Parker', phone:"773-731-0981", status: "#FFD700"}]),
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

    onPressIcon(sectionID, rowID) {
        console.log("icon",sectionID, rowID)
    }

    render() {
        return (
            <View noSpacer={false} noScroll={false}>
                <TableViewGroup
                    title={"Patients"}
                    onPress={this._pressData}
                    scrollEnabled={true}
                    style={{}}
                    textStyle={{textAlign: 'center', marginTop: 25, color: '#FFFFFF', fontSize: 18, textAlign: 'center', marginTop: 25,}}
                    headerStyle={{height: 60, backgroundColor: "#3498DB"}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
                <View style={{backgroundColor: '#ABCDFE', flex: 1}}/>
            </View>
        );
    }

    renderRow(patient: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        return (
            <PatientTableViewCell
                onPress={()=>this.onPressPatient(patient)}
                onPressIcon={()=>this.onPressIcon(sectionID, rowID)}
                status={patient.status}
                image={whiteGradient}
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
