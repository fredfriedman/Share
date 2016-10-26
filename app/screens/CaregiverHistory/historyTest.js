import React, {Component} from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';
import Row from './Row1';
import Data from './demoData';
var Header = require('../../components/header').default

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

class HistoryTest extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(Data),
    };
  }
  render() {
    return (
	    <View>
	      <Header text={"Patient Questionaire History"}/>
	      <ListView
	        style={styles.container}
	        dataSource={this.state.dataSource}
	        renderRow={(data) => <Row {...data}/>}
	      />
	    </View>
    );
  }
}

export default HistoryTest;