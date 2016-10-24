import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, StyleSheet, View, ListView } from 'react-native';
let Header = require('../../components/header').default
let TableViewGroup = require('../../components/TableViewGroup').default

export default class History extends Component {
    constructor(){
        super()

        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            history: [{date:"1", description: "doesn't hurt that bad"},
            {date:"2", description: "hurts bad"},
            {date:"3", description: "RIP"},
            {date:"4", description: "just a flesh wound"}]
        }
    }

    renderRow(data: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        return (
            <View style = {{flexDirection: "row"}}>
                <Text>{data.date}</Text>
                <Text>{data.description}</Text>
            </View>
        )
    }

    render(){
        return (
            <View>
                <Header text={"History"}/>
                <TableViewGroup
                title={"History"}
                headerIsEnabled={false}
                dataSource={this.dataSource.cloneWithRows(this.state.history)}
                renderRow={this.renderRow.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
