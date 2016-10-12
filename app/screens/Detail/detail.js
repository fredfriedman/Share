'use strict';

import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        RecyclerViewBackedScrollView,
        Text,
        Image,
        ScrollView,
        View, } from 'react-native';

import Dimensions from 'Dimensions';
import PageControl from 'react-native-page-control'

var { backIcon, personIcon } = require('../../config/images')
var Header = require('../../components/header').default
var PatientTrend = require('../../components/PatientTrendChart').default
const barInterval = 2
const barItemTop = 16

export default class PatientDetailView  extends Component {

    constructor() {
        super();
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

    render() {
        return (
            <View style={{flexDirection: 'column', flex: 1}}>
                <View style={styles.topBox}>
                    <Text style={styles.patientName}> {this.props.patient.name} </Text>
                </View>
                <View style={{backgroundColor: '#607D8B',flex: 1}}>
                    <Text style={styles.patientPhone}> {this.props.patient.phone} </Text>
                    <ScrollView ref="ad" pagingEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false} bounces={false} onScroll={this.onScroll.bind(this)} scrollEventThrottle={16}>
                        <View style={styles.scrollView}>
                          <PatientTrend
                              data={this.state.data}
                              color={'#FFC107'}/>
                        </View>
                        <View style={styles.scrollView}>
                          <Text style={{color: 'white', paddingTop: 20}}> Recent History </Text>
                        </View>
                        <View style={styles.scrollView}>
                          <Text style={{color: 'white', paddingTop: 20}}> Notes </Text>
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

    renderBars(data, high, low, color) {
        const {unitHeight} = this

        return data.map((value, index) => {
            return (
                <PlayerTrendBarItem
                    key={index}
                    value={value}
                    high={high}
                    low={low}
                    color={color}
                    unitHeight={unitHeight}
                    date={this.state.data[index].gameDate}
                    barItemTop={barItemTop}
                    barInterval={barInterval} />
            )
        })
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
        backgroundColor:'#607D8B'
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
