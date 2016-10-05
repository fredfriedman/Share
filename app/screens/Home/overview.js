'use strict';

import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        RecyclerViewBackedScrollView,
        Text,
        Image,
        View, } from 'react-native';

var { whiteGradient } = require('../../config/images')
var TableViewGroup = require('../../components/TableViewGroup').default
var Header = require('../../components/header').default

export default class Overview extends Component {

    constructor() {
        super();
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            dataSourceImproving: dataSource.cloneWithRows(['Bill Clinton', 'Cindy Johnson','Daniel Moore']),
            dataSourceCritical: dataSource.cloneWithRows(['Tom Haverford', 'Homer Simpson', 'Chase Jeter']),
            dataSourceStatic: dataSource.cloneWithRows(['Max Kellermueller', 'Marge Simpson', 'Claire Fox']),
        }
    }

    _pressData(key: number) {
        true
    }

    onPressHeader() {

    }

    onPressPatient(sectionID, rowID) {
        console.log(sectionID, rowID)
    }

    render() {
        return (
        <View style={{ backgroundColor: '#E9E9E9', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Header text={"Patient Status"}/>
            <TableViewGroup
                title={"Critical"}
                onPress={this.onPressHeader.bind(this)}
                style={{ backgroundColor: '#FFFFFF', shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: {height: 1, width: 0 }, elevation: 20, marginLeft: 10, marginRight: 10}}
                textStyle={{marginLeft: 5, fontWeight: 'bold', color: '#1B1B1B'}}
                headerStyle={{height: 20, backgroundColor: "red", opacity: 0.5}}
                dataSource={this.state.dataSourceCritical}
                renderRow={this.renderRow.bind(this)}></TableViewGroup>
            <TableViewGroup
                title={"Static"}
                onPress={this.onPressHeader.bind(this)}
                style={{ backgroundColor: '#FFFFFF', shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: {height: 1, width: 0 }, elevation: 20, marginLeft: 10, marginRight: 10}}
                textStyle={{marginLeft: 5, fontWeight: 'bold', color: '#1B1B1B'}}
                headerStyle={{height: 20, backgroundColor: "yellow", opacity: 0.5}}
                dataSource={this.state.dataSourceStatic}
                renderRow={this.renderRow.bind(this)}></TableViewGroup>
            <TableViewGroup
                title={"Improving"}
                onPress={this.onPressHeader.bind(this)}
                style={{ backgroundColor: '#FFFFFF', shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: {height: 1, width: 0 }, elevation: 20, marginBottom: 20, marginLeft: 10, marginRight: 10}}
                textStyle={{marginLeft: 5, fontWeight: 'bold', color: '#1B1B1B'}}
                headerStyle={{height: 20, backgroundColor: "green", opacity: 0.5}}
                dataSource={this.state.dataSourceImproving}
                renderRow={this.renderRow.bind(this)}></TableViewGroup>
        </View>
        );
    }

    renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        var self = this
        return (
            <TouchableHighlight onPress={ () => this.onPressPatient(sectionID, rowID)}>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={whiteGradient} />
                        <Text style={styles.text}> {rowData} </Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

  renderSectionHeader(sectionData, category) {
      switch(category) {
          case "Improving":return ( <Text style={{paddingLeft: 10, fontWeight: "300", backgroundColor: "green"}}>{category}</Text> )
          case "Critical": return ( <Text style={{paddingLeft: 10, fontWeight: "300", backgroundColor: "red"}}>{category}</Text> )
          case "Static": return ( <Text style={{paddingLeft: 10, fontWeight: "300", backgroundColor: "yellow"}}>{category}</Text> )
      }
  }

  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID} - ${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    )
    }
}

var styles = StyleSheet.create({
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
  text: {
    flex: 1,
    marginTop: 10,
    fontSize: 14,
    fontWeight: '100',
  },
});
