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
var PatientTableViewCell = require('../../components/patientTableViewCell').default

export default class PatientsView extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['Bill Clinton', 'Cindy Johnson', 'Tom Haverford', 'Homer Simpson', 'Chase Jeter',
                                        'Max Kellermueller', 'Marge Simpson', 'Claire Fox']),
        };
    }

    onPressPatient(sectionID, rowID) {
        console.log("patient",sectionID, rowID)
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

    renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        return (
            <PatientTableViewCell
                onPress={()=>this.onPressPatient(sectionID, rowID)}
                onPressIcon={()=>this.onPressIcon(sectionID, rowID)}
                image={whiteGradient}
                actionIcon={phoneIcon}
                mainText={rowData}
                subTitleText={"732-882-3142"}
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
