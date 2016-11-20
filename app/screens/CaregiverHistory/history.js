import React, { Component } from 'react';
import { Text, TouchableHighlight, View, ListView } from 'react-native';
import Header from '../../components/header'
import TableViewGroup from '../../components/TableViewGroup'
// Utility
import Firebase from '../../config/firebase'
import Icon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

import HistoryDetailPage from '../HistoryDetail/assessmentDetail'
import HistoryRow from './HistoryRow'

export default class History extends Component {

    constructor(props){
        super(props)

        this.historyRef = this.getRef().child('Patients/' + props.user.Patient + '/Assessments/')

        this.state = {
            history: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        }
    }

    componentDidMount() {
        this.listenForItems(this.historyRef, this.setHistory.bind(this), this.parseAssessments);
    }

    getRef() {
        return Firebase.database().ref();
    }

    parseAssessments(snap) {
        var agg = 0
        for (var child in snap.val().Results) {
            agg += parseInt(snap.val().Results[child].level)
        }
        return {
            completed: snap.val().completed,
            timestamp: snap.val().timestamp,
            submittedBy: snap.val().submittedBy,
            results: snap.val().Results,
            distress: snap.val().distress,
            comments: snap.val().comments,
            agg: agg
        }
    }

    setHistory(hist) {
        this.setState({ history: this.state.history.cloneWithRows(hist) });
    }

    listenForItems(ref, callback, parser) {

        var items = [];

        this.historyRef.on('value', (snap) => {

            snap.forEach((child) => { items.push(parser(child)); });

            callback(items)
        });
    }

    onPressHistoryCell(assessment) {
        this.props.navigator.push({
            component: HistoryDetailPage,
            passProps: {
                assessment: assessment
            }
        })
    }

    onPressBack() {
        this.props.navigator.pop()
    }

    render(){
        const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="#f7f7f7" />);

        return (
            <View>
                <Header
                    text={"History"}
                    textStyle={{color: 'white'}}
                    leftAction={this.onPressBack.bind(this)}
                    leftIcon={backIcon}/>
                <ListView
                    dataSource={this.state.history}
                    renderRow={(data) => <HistoryRow assessment={data} onPressHistoryCell={this.onPressHistoryCell.bind(this)}/>}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    text: {
        color: '$colors.darkGray',
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
    separator: {
        flex: 1,
        height: '$dimensions.hairlineWidth',
        marginLeft : 20,
        backgroundColor: '#d7d7d7',
    },
    subText: {
        color: '$colors.mediumGray',
        fontSize: 11,
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    }
});
