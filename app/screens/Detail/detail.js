import React, { Component } from 'react';
import {
        ListView,
        ScrollView,
        StyleSheet,
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

        this.state = {
            data: [],
            graphType: "Pain",
            trendHistory: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, }),
            history: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, }),
            notes: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, }),
            currentPage: 0//'summary'
        };
    }

    componentDidMount() {
        this.listenForItems(this.notesRef, this.setNotes.bind(this), this.parseNotes);
        this.listenForItems(this.historyRef, this.setHistory.bind(this), this.parseAssessments);
    }

    getRef() {
        return Firebase.database().ref();
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

    renderTopBox() {
        const clockIcon = (<Icon name="ios-time-outline" ios="ios-time-outline" md="md-time" size={20} color="#00ACC1" />);

        return (
            <View style={styles.topBox}>
                <Text style={[styles.text,{paddingLeft: 5, color: 'white', fontSize: 13, fontWeight: '200'}]}>  </Text>
                <View>
                    <View style={[styles.row, {alignItems: 'center'}]}>
                        <View style={styles.indicator}/>
                        <Text style={[styles.text,{color: 'white', fontSize: 52, fontWeight: '200'}]}> 67 </Text>
                    </View>
                    <Text style={[styles.text,{color: '#00838F', fontSize: 20, fontWeight: '400'}]}> Current Status </Text>
                </View>
                <View style={[styles.row, {marginTop: 25}]}>
                    { clockIcon }
                    <Text style={[styles.text,{paddingLeft: 5, color: 'white', fontSize: 13, fontWeight: '200'}]}> Last Entry | Jan 16, 2016  </Text>
                </View>
            </View>
        )
    }

    renderBottomBox() {
        const data = [[0, 1], [1, 3], [3, 7], [4, 9], [5, 10] ];

        return (
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
                    <GraphsPage containerStyle={styles.scrollView} data={data} type={this.state.graphType}/>
                    <HistoryPage containerStyle={styles.scrollView} labelStyle={styles.label}/>
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
        backgroundColor: '$colors.lightGray',
    },
    indicator: {
        width: 5,
        height: 40,
        borderRadius: 5,
        backgroundColor: 'orange',
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
        borderBottomWidth: 4
    }
});
