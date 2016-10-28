import React, { Component } from 'react';
import {
        Image,
        ListView,
        Navigator,
        RecyclerViewBackedScrollView,
        ScrollView,
        StyleSheet,
        TouchableHighlight,
        Text,
        TextInput,
        View, } from 'react-native';

import Dimensions from 'Dimensions';
import PageControl from 'react-native-page-control'

var firebase = require('../../config/firebase')
var { backIcon, personIcon } = require('../../config/images')
var Header = require('../../components/header').default
var PatientTrend = require('../../components/PatientTrendChart').default
var NotesPage = require('./notesPage').default

export default class PatientDetailView  extends Component {

    constructor(props) {
        super(props);

        this.historyRef = this.getRef().child('Patients/' + props.patient.pID + "/Assessments")
        this.notesRef = this.getRef().child('Patients/' + props.patient.pID + "/Notes/")
        this.patientRef = this.getRef().child('Patients/' + props.patient.pID)

        this.state = {
            data: [],
            history: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, }),
            notes: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, }),
            currentPage: 0
        };
    }

    componentDidMount() {
        this.listenForItems(this.notesRef, this.setNotes.bind(this), this.parseNotes);
        this.listenForItems(this.historyRef, this.setHistory.bind(this), this.parseAssessments);
    }

    getRef() {
        return firebase.database().ref();
    }

    createGraphs(history) {
        var painScores = []
        history.forEach((entry) => {
            var ent = entry.results["Pain"]
            ent["timestamp"] = entry.timestamp
            painScores.push(ent)
        })
        this.setState({ data: painScores })
    }
    //////////////
    // Firebase //
    //////////////

    parseNotes(snap) {
        return {
            poster: snap.val().poster,
            text: snap.val().text,
            timestamp: snap.val().timestamp,
        }
    }

    parseAssessments(snap) {
        return {
            completed: snap.val().completed,
            timestamp: snap.val().timestamp,
            filler: snap.val().filler,
            results: snap.val().Results,
        }
    }

    setNotes(notes) {
        this.setState({ notes: this.state.notes.cloneWithRows(notes) });
    }

    setHistory(hist) {
        this.setState({ history: this.state.history.cloneWithRows(hist) });
        this.createGraphs(hist)
    }

    listenForItems(ref, callback, parser) {

        ref.on('value', (snap) => {

            var items = [];

            snap.forEach((child) => { items.push(parser(child)); });

            callback(items)
        });
    }

    //////////////////////
    //Callback Functions//
    //////////////////////

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

    render() {
        return (
            <View style={{flexDirection: 'column', flex: 1}}>
                <View style={[styles.topBox, {borderBottomColor: this.props.patient.status}]}>
                    <Text style={styles.patientName}> {this.props.patient.name} </Text>
                </View>
                <View style={styles.bottomBox}>
                    <Text style={styles.patientPhone}> {this.props.patient.phone} </Text>
                    <ScrollView
                        ref="pageControl"
                        pagingEnabled={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        onScroll={this.onScroll.bind(this)}
                        scrollEventThrottle={16}>

                        <View style={styles.scrollView}>
                            <PatientTrend data={this.state.data} color={'#FFC107'}/>
                        </View>

                        <View style={styles.scrollView}>
                            <Text style={{color: 'white', paddingTop: 20}}> Recent History </Text>
                        </View>

                        <NotesPage navigator={this.props.navigator} user={this.props.user} caregiver={this.props.patient} notes={this.state.notes}/>
                    </ScrollView>
                </View>
                <PageControl style={{position:'absolute', left:0, right:0, bottom:10}}
                    numberOfPages={3}
                    currentPage={this.state.currentPage}
                    pageIndicatorTintColor='white'
                    currentPageIndicatorTintColor='#18FFFF'
                    indicatorStyle={{borderRadius: 5}}
                    currentIndicatorStyle={{borderRadius: 5}}
                    indicatorSize={{width:8, height:8}}
                    onPageIndicatorPress={this.onItemTap.bind(this)} />
                <Image style={[styles.profilePicture, {borderWidth: 1, borderColor: this.props.patient.status}]} source={personIcon}/>
                <TouchableHighlight
                    onPress={()=>this.onBack()}
                    style={{position: 'absolute', width: 20, height: 20, top: 25, left: 15, backgroundColor: 'transparent'}}
                    underlayColor={'transparent'}>
                    <Image source={backIcon}/>
                </TouchableHighlight>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    topBox: {
        borderBottomColor: '#18FFFF',
        borderBottomWidth: 3,
        height: Dimensions.get('window').height/2.5,
        backgroundColor: '#4DD0E1',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    bottomBox: {
        backgroundColor: '#44688E'
    },
    patientName: {
        marginLeft: 100,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    patientPhone: {
        marginLeft: 100,
        marginTop: 5,
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white'
    },
    scrollView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - Dimensions.get('window').height/2.5,
        backgroundColor:'transparent',
        flex: 1
    },
    profilePicture: {
        position: 'absolute',
        height: 75,
        width: 75,
        borderRadius: 40,
        borderWidth: 3,
        top: Dimensions.get('window').height/2.5 - 37.5,
        left: 15,
        backgroundColor: 'transparent'
    },
    profileHeaderView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
