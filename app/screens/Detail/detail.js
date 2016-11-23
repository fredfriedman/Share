import React, { Component } from 'react';
import {
        ListView,
        Navigator,
        ScrollView,
        Text,
        View, } from 'react-native'
// Assets
import Icon from 'react-native-vector-icons/Ionicons';

// Components
import Header from '../../components/header'
import PageControl from 'react-native-page-control'

// SubPages
import NotesPage from './components/notes'
import GraphsPage from './components/graphs'
import HistoryPage from './components/history'

// Utiilities
import Firebase from '../../config/firebase'
import EStyleSheet from 'react-native-extended-stylesheet';
import Dimensions from 'Dimensions'

export default class PatientDetailView  extends Component {

    constructor(props) {
        super(props);

        this.historyRef = this.getRef().child('Patients/' + props.patient.pID + "/Assessments")
        this.notesRef = this.getRef().child('Patients/' + props.patient.pID + "/Notes/")
        this.patientRef = this.getRef().child('Patients/' + props.patient.pID)
        this.nurseRef = this.getRef().child('Nurses/')

        this.state = {
            data: { "Appetite": {max: 0, min: 0, avg: 0, points: []},
                    "Depression": {max: 0, min: 0, avg: 0, points: []},
                    "Drowsiness": {max: 0, min: 0, avg: 0, points: []},
                    "Nausea": {max: 0, min: 0, avg: 0, points: []},
                    "Pain": {max: 0, min: 0, avg: 0, points: []},
                    "Shortness of Breath": {max: 0, min: 0, avg: 0, points: []},
                    "Tiredness": {max: 0, min: 0, avg: 0, points: []}},

            history: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, }),
            notes: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, }),
            lastPost: null,
            currentPage: 0
        };
    }

    //////////////
    // Firebase //
    //////////////

    componentDidMount() {
        this.listenForItems(this.notesRef.orderByChild('timestamp'),this.notesCallback.bind(this))
        this.listenForItems(this.historyRef, this.historyCallback.bind(this));
    }

    getRef() {
        return Firebase.database().ref();
    }

    parseAssessments(snap) {
        var agg = 0
        for (var child in snap.val().Results) {
            if ( child != "Caregiver" ) { agg += parseInt(snap.val().Results[child].level) }
        }
        agg = Math.floor(agg/80*100)
        return {
            completed: snap.val().completed,
            timestamp: snap.val().timestamp,
            submittedBy: snap.val().submittedBy,
            results: snap.val().Results,
            comments: snap.val().comments,
            agg: agg
        }
    }

    setNotes(notes) {
        this.setState({ notes: this.state.notes.cloneWithRows(notes) });
    }

    buildPoints(assessments) {
        var graphData = {   "Appetite": {max: null, min: null, avg: null, points: []},
                            "Depression": {max: null, min: null, avg: null, points: []},
                            "Drowsiness": {max: null, min: null, avg: null, points: []},
                            "Nausea": {max: null, min: null, avg: null, points: []},
                            "Pain": {max: null, min: null, avg: null, points: []},
                            "Shortness of Breath": {max: null, min: null, avg: null, points: []},
                            "Tiredness": {max: null, min: null, avg: null, points: []}}

        for (var i = 0; i < assessments.length; i++) {
            this.updateLatestDate(assessments[i].timestamp)
            this.updateData(graphData, i, assessments[i].results.Appetite.level, "Appetite")
            this.updateData(graphData, i, assessments[i].results.Depression.level, "Depression")
            this.updateData(graphData, i, assessments[i].results.Drowsiness.level, "Drowsiness")
            this.updateData(graphData, i, assessments[i].results.Nausea.level, "Nausea")
            this.updateData(graphData, i, assessments[i].results.Pain.level, "Pain")
            this.updateData(graphData, i, assessments[i].results["Shortness Of Breath"].level, "Shortness of Breath")
            this.updateData(graphData, i, assessments[i].results.Tiredness.level, "Tiredness")
        }

        return graphData
    }

    updateLatestDate(datetime) {
        var date = new Date(datetime)
        if(this.state.lastPost == null || date > this.state.lastPost) {
            this.setState({lastPost: date})
        }
    }

    updateData(gData, i, level, type) {
        if (gData[type]["max"] == null || gData[type]["max"] > level) { gData[type]["max"] = level }
        if (gData[type]["min"] == null || gData[type]["min"] < level) { gData[type]["min"] = level }
        gData[type]["avg"] == null ? gData[type]["avg"] = level : gData[type]["avg"] += level
        gData[type]["points"].push([i, level])
    }

    setHistory(hist) {
        this.setState({ history: this.state.history.cloneWithRows(hist) });
        this.setState({ data: this.buildPoints(hist.slice(0, 5)) })
    }

    listenForItems(ref, callback) {

        ref.on('value', (snap) => {

            var items = [];

            snap.forEach(child => callback(items, child));
        })
    }

    historyCallback(items, child) {
        items.push(this.parseAssessments(child))

        this.setState({ history: this.state.history.cloneWithRows(items) });
        this.setState({ data: this.buildPoints(items.slice(0, 5)) })
    }

    notesCallback(notes, child) {
        var self = this

        this.nurseRef.child(child.val().pid + '/Profile/picture').once("value", nursePic => {

            var note = {
                picture: nursePic.val(),
                poster: child.val().poster,
                text: child.val().text,
                timestamp: child.val().timestamp,
            }

            notes.push(note);

            self.setState({ notes: self.state.notes.cloneWithRows(notes) });
        })
    }

    /////////////////
    // Navigation //
    ////////////////

    onBack() {
        this.props.navigator.pop()
    }

    onScroll(event){
        var offsetX = event.nativeEvent.contentOffset.x
        var pageWidth = Dimensions.get('window').width - 10
        this.setState({
            currentPage: Math.floor((offsetX - pageWidth / 2) / pageWidth) + 1
        });
    }

    onItemTap(index) {
        this.setState({ currentPage: index });
    }

    //////////////////////////////
    // Styling Helper Functions //
    //////////////////////////////

    statusToColor(status) {
        if(status > 90) {
            return '#B71C1C'
        } else if (status > 80) {
            return '#C62828'
        } else if (status > 70) {
            return '#D32F2F'
        } else if (status > 60) {
            return '#EF6C00'
        } else if (status > 50) {
            return '#FF9800'
        } else if (status > 40) {
            return '#FFCA28'
        } else if (status > 30) {
            return '#FDD835'
        } else if (status > 20) {
            return '#7CB342'
        } else if (status > 10) {
            return '#4CAF50'
        } else {
            return '#388E3C'
        }
    }

    parseDate(date) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    }

    /////////////////////////
    // Rendering Functions //
    /////////////////////////

    renderTopBox() {
        const clockIcon = (<Icon name="ios-time-outline" ios="ios-time-outline" md="md-time" size={20} color="#00ACC1" />);
        const alertIcon = (<Icon name="ios-warning-outline" ios="ios-warning-outline" md="md-warning-outline" size={30} color="#e50000"/>);
        const pulseIcon = (<Icon name="ios-pulse" ios="ios-pulse" md="md-pulse" size={30} color="orange"/>);
        return (
            <View style={styles.topBox}>
                <Text style={[styles.text,{paddingLeft: 5, color: 'white', fontSize: 13, fontWeight: '200'}]}>{this.props.patient.phone}</Text>
                <View>
                    <View style={[styles.row, {alignItems: 'center'}]}>
                        <View style={[styles.indicator, {backgroundColor: this.statusToColor(this.props.patient.status)}]}/>
                        <Text style={[styles.text, {color: 'white', fontSize: 60, fontWeight: '200'}]}> {this.props.patient.status} </Text>
                        { this.props.patient.caregiverDistress ? alertIcon : null}
                    </View>
                    <Text style={[styles.text, {color: '#00838F', fontSize: 20, fontWeight: '400'}]}> Current Status </Text>
                </View>
                <View style={[styles.row, {marginTop: 25}]}>
                    { clockIcon }
                    <Text style={[styles.text, {paddingLeft: 5, color: 'white', fontSize: 13, fontWeight: '200'}]}> Last Entry | {this.state.lastPost == null ? "None" : this.parseDate(this.state.lastPost)} </Text>
                </View>
            </View>
        )
    }

    renderBottomBox() {

        return (
            <View style={styles.bottomBox}>
                <ScrollView
                    ref="pageControl"
                    pagingEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    onScroll={this.onScroll.bind(this)}
                    scrollEventThrottle={16}>
                    <GraphsPage containerStyle={styles.scrollView} data={this.state.data}/>
                    <HistoryPage containerStyle={styles.scrollView} labelStyle={styles.label} assessments={this.state.history} navigator={this.props.navigator}/>
                    <NotesPage containerStyle={styles.scrollView} navigator={this.props.navigator} notes={this.state.notes} user={this.props.user} patient={this.props.patient} labelStyle={styles.label}/>
                </ScrollView>
            </View>
        )
    }

    render() {
        const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="#262626" />);
        const currentPageColor = '#00BCD4'
        const pageIndicatorColor = '#262626'

        return (
            <View style={{flexDirection: 'column', flex: 1}}>
                <Header text={this.props.patient.name} headerStyle={styles.header} textStyle={styles.text} leftAction={this.onBack.bind(this)} leftIcon={backIcon}/>
                { this.renderTopBox() }
                { this.renderBottomBox() }
                <PageControl style={styles.pageControl}
                    numberOfPages={3}
                    currentPage={this.state.currentPage}
                    pageIndicatorTintColor={pageIndicatorColor}
                    currentPageIndicatorTintColor={currentPageColor}
                    indicatorStyle={{borderRadius: 5}}
                    currentIndicatorStyle={{borderRadius: 5}}
                    indicatorSize={{width:8, height:8}}
                    onPageIndicatorPress={this.onItemTap.bind(this)} />
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    bottomBox: {
        flex: 1,
        backgroundColor: '$colors.lightGray',
    },
    header: {
        height: 60,
        backgroundColor: '$colors.lightGray',
    },
    indicator: {
        width: 5,
        height: 50,
        borderRadius: 5,
    },
    label: {
        alignSelf: 'center',
        color: '$colors.darkGray',
    },
    pageControl: {
        position:'absolute',
        left: 0,
        right: 0,
        bottom: 10
    },
    row: {
        flexDirection: 'row'
    },
    scrollView: {
        flex: 1,
        width: '$dimensions.screenWidth',
        backgroundColor: 'transparent',
    },
    text: {
        color: '$colors.darkGray',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: '$fonts.family',
    },
    topBox: {
        flex: .8,
        paddingLeft: 30,
        backgroundColor: '$colors.darkGray',
        justifyContent: 'space-between',
        borderBottomColor: '$colors.status',
        borderBottomWidth: 7
    }
});
