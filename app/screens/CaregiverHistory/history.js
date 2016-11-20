import React, { Component } from 'react';
import { Text, TouchableHighlight, View, ListView } from 'react-native';
import Header from '../../components/header'
import TableViewGroup from '../../components/TableViewGroup'
// Utility
import Firebase from '../../config/firebase'
import Icon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

import HistoryDetailPage from '../HistoryDetail/assessmentDetail'

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
        return {
            completed: snap.val().completed,
            timestamp: snap.val().timestamp,
            submittedBy: snap.val().submittedBy,
            results: snap.val().Results,
            distress: snap.val().distress
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

    parseDate(date) {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
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

    renderRow(data: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        const checkmark = <Icon name="md-checkmark" size={30} color="#262626" />
        const x = <Icon name="md-close" size={30} color="#262626" />
        const disclosureIcon = (<Icon name="ios-arrow-forward" style={{marginRight: 10}} size={20} color="#212121" />);

        return (
            <TouchableHighlight
                onPress={() => { this.onPressHistoryCell(data) }}
                underlayColor={'#0097A7'}>
                <View style={{alignItems: 'center', marginLeft: 10, flexDirection: "row", height: 60, justifyContent: 'space-between'}}>
                    <View style={{flexDirection: "row"}}>
                        {data.completed ? checkmark : x}
                        <View style={{paddingLeft: 10, flexDirection: 'column'}}>
                            <Text style={styles.text}>Score: {57}</Text>
                            <Text style={styles.subText}>{this.parseDate(new Date(data.timestamp))}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, paddingLeft: 10}}>
                        <Text>Comments about ajsdfnkjs</Text>
                    </View>
                    { disclosureIcon }
                </View>
            </TouchableHighlight>
        )
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
                    renderRow={this.renderRow.bind(this)}
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
