'use strict';

import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        RecyclerViewBackedScrollView,
        Text,
        Image,
        View, } from 'react-native';

var Header = require('../../components/header').default
var { backIcon, phoneIcon, whiteGradient } = require('../../config/images')
var TableViewGroup = require('../../components/TableViewGroup').default
var PatientDetailView = require('../Detail/detail').default
var PatientTableViewCell = require('../../components/patientTableViewCell').default

export default class PatientsView extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
            {name:'Homer Simpson', phone:"552-822-0874", status:"#D32F2F"},
            {name:'Chase Jeter', phone:"398-112-4458", status:"#F44336"},
            {name:'Max Kellermueller', phone:"685-919-2231", status:"#F57C00"},
            {name:'Marge Simpson', phone:"443-822-0842", status: "#FFC107"},
            {name:'Claire Fox', phone:"661-333-4444", status: "#FDD835"},
            {name:'Jabari Parker', phone:"773-731-0981", status: "#FFEE58"},
            {name:'Tom Haverford', phone:"342-822-3243", status: "#CDDC39"},
            {name:'Cindy Johnson', phone:"792-822-3145", status:"#8BC34A"},
            {name:'Bill Clinton', phone:"732-882-3145", status:"#388E3C"}
            ]),
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

    onBack() {
        this.props.navigator.pop()
    }

    render() {
        return (
            <View style={{flexDirection: 'column', flex: 1 }} noSpacer={false} noScroll={false}>
                <Header text={"Patients"}/>
                <TouchableHighlight
                    onPress={this.onBack.bind(this)}
                    style={{position: 'absolute', width: 20, height: 20, top: 25, left: 15, backgroundColor: 'transparent'}}
                    underlayColor={'#f8f8f8'}>
                    <Image source={backIcon}/>
                </TouchableHighlight>
                <TableViewGroup
                    title={"Patients"}
                    style={{backgroundColor: 'red', flex: 1}}
                    onPress={this._pressData}
                    scrollEnabled={true}
                    textStyle={{marginTop: 25, color: '#FFFFFF', fontSize: 18, textAlign: 'center'}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
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
