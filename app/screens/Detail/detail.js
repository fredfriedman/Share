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
        View, } from 'react-native';

import Dimensions from 'Dimensions';
import PageControl from 'react-native-page-control'

var { backIcon, personIcon } = require('../../config/images')
var Header = require('../../components/header').default
var PatientTrend = require('../../components/PatientTrendChart').default
var Note = require('../../components/note').default
var NoteInput = require('../../components/note_input').default

export default class PatientDetailView  extends Component {

    constructor() {
        super();

        this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, });

        this.state = {
            data: [{painScore: 0, date: Date("JANUARY, 1, 2015")},
                   {painScore: 0, date: Date("JANUARY, 2, 2015")},
                   {painScore: 3, date: Date("JANUARY, 3, 2015")},
                   {painScore: 2, date: Date("JANUARY, 4, 2015")},
                   {painScore: 2, date: Date("JANUARY, 5, 2015")},
                   {painScore: 4, date: Date("JANUARY, 6, 2015")},
                   {painScore: 4, date: Date("JANUARY, 7, 2015")},
                   {painScore: 5, date: Date("JANUARY, 8, 2015")},
                   {painScore: 5, date: Date("JANUARY, 9, 2015")},
                   {painScore: 7, date: Date("JANUARY, 10, 2015")},
                   {painScore: 8, date: Date("JANUARY, 11, 2015")},
                   {painScore: 7, date: Date("JANUARY, 12, 2015")},
                   {painScore: 9, date: Date("JANUARY, 13, 2015")},
                   {painScore: 10, date: Date("JANUARY, 14, 2015")},
                   {painScore: 9, date: Date("JANUARY, 15, 2015")}],
            notes: [{poster: "John See", date: "2h ago", title: "Need to call", text: "I called"},
                    {poster: "Pam Oliver", date: "1d ago", title: "Need to call", text: "I haven't called yet"},
                    {poster: "Pam Oliver", date: "2d ago", title: "Need to call", text: "Client was falling when I visited"},
                    {poster: "Pam Oliver", date: "3d ago", title: "Need to call", text: "I haven't called yet"}],
            currentPage: 0
        };
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

    postNote() {
        this.props.navigator.push({
            component: NoteInput,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        })
    }

    render() {
        return (
            <View style={{flexDirection: 'column', flex: 1}}>
                <View style={styles.topBox}>
                    <Text style={styles.patientName}> {this.props.patient.name} </Text>
                </View>
                <View style={{backgroundColor: '#607D8B'}}>
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

                        <View style={[styles.scrollView, {height: Dimensions.get('window').height}]}>
                            <Text style={{color: 'white', paddingTop: 20}}> Notes </Text>
                            <ListView
                                dataSource={this.dataSource.cloneWithRows(this.state.notes)}
                                renderRow={(note) => <Note note={note} poster={personIcon}/>}
                                renderFooter={() =>
                                    <View>
                                        <TouchableHighlight onPress={this.postNote.bind(this)}>
                                            <Text> New Post </Text>
                                        </TouchableHighlight>
                                    </View>}
                                scrollEnabled={true}/>

                        </View>

                    </ScrollView>
                    <PageControl style={{position:'absolute', left:0, right:0, bottom:10}}
                        numberOfPages={3}
                        currentPage={this.state.currentPage}
                        pageIndicatorTintColor='white'
                        currentPageIndicatorTintColor='#18FFFF'
                        indicatorStyle={{borderRadius: 5}}
                        currentIndicatorStyle={{borderRadius: 5}}
                        indicatorSize={{width:8, height:8}}
                        onPageIndicatorPress={this.onItemTap.bind(this)} />

                </View>
                <Image style={styles.profilePicture} source={personIcon}/>
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
        borderBottomWidth: 2,
        height: Dimensions.get('window').height/2.5,
        backgroundColor: '#4DD0E1',
        flexDirection: 'column',
        justifyContent: 'flex-end'
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
        height:164,
        backgroundColor:'transparent',
        flex: 1
    },
    profilePicture: {
        position: 'absolute',
        height: 75,
        width: 75,
        borderRadius: 40,
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
