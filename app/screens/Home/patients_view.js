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

export default class PatientsView extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows(['Bill Clinton', 'Cindy Johnson', 'Tom Haverford', 'Homer Simpson', 'Chase Jeter',
                                        'Max Kellermueller', 'Marge Simpson', 'Claire Fox']),
        };
    }

  _pressData(key: number) {
      true
  }

  render() {
    return (
        <View
          noSpacer={true}
          noScroll={true}
          style={{backgroundColor: '#E9E9E9'}}>
          <TableViewGroup
              title={"Patients"}
              onPress={this._pressData}
              style={{}}
              textStyle={{textAlign: 'center', marginTop: 25, color: '#FFFFFF', fontSize: 18, textAlign: 'center', marginTop: 25,}}
              headerStyle={{height: 60, backgroundColor: "#3498DB"}}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow.bind(this)}
              renderSeparator={this._renderSeparator}/>
        </View>
    );
  }

  _renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    return (
      <TouchableHighlight onPress={() => {
          //this._pressRow(rowID);
          highlightRow(sectionID, rowID);
        }}>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={whiteGradient} />
            <Text style={styles.text}> {rowData} </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
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
