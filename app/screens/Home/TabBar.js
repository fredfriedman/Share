'use strict';

import React, { Component } from 'react';
import { AppRegistry, ViewPagerAndroid, View, Text, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

var { whiteGradient, homeIcon, writeIcon, calIcon, settingsIcon, overviewIcon } = require('../../config/images')

// Page in Tab Bar
var Profile = require('./profile').default
var Overview = require('./overview').default
var Patients = require('./patients_view').default
var Settings = require('../Settings/settings').default



export default class TabBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Overview'
        };
    }

    setTab(title) {
        this.setState({selectedTab: title})
    }

    render() {
      return (
        <TabNavigator tabBarShadowStyle={styles.tabBarShadow} tabBarStyle={styles.tabBar}>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Profile'}
                title="Profile"
                titleStyle={styles.tabBarTitle}
                selectedTitleStyle={styles.tabBarSelectedTitle}
                renderIcon={() => <Image style={styles.icon} source={homeIcon} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={homeIcon} />}
                onPress={() => this.setTab('Profile')}>
                <Profile navigator={this.props.navigator} user={this.props.user}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Overview'}
                title="Overview"
                titleStyle={styles.tabBarTitle}
                selectedTitleStyle={styles.tabBarSelectedTitle}
                renderIcon={() => <Image style={styles.icon} source={overviewIcon} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={overviewIcon} />}
                onPress={() => this.setTab('Overview')}>
                <Overview navigator={this.props.navigator} user={this.props.user}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Calendar'}
                title="Calendar"
                titleStyle={styles.tabBarTitle}
                selectedTitleStyle={styles.tabBarSelectedTitle}
                renderIcon={() => <Image style={styles.icon} source={calIcon} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={calIcon} />}
                onPress={() => this.setTab('Calendar')}>
                <Patients navigator={this.props.navigator} user={this.props.user}/>
            </TabNavigator.Item>
        </TabNavigator>
      );
    }
}

var styles = {
    view: {
        height: 10
    },
    tabBar: {
        backgroundColor: '#ECEFF1',
        height: 40
    },
    tabBarShadow: {
        backgroundColor: '#ECEFF1',
        shadowColor: "#05054F",
        shadowOpacity: 0.5,
        shadowRadius: 0.5,
        shadowOffset: {
            height: 1,
            width: 0
        },
        elevation: 20,
    },
    tabBarTitle: {
        fontFamily: 'Helvetica',
        fontWeight: '100',
        fontSize: 10,
        color: '#90A4AE'
    },
    icon: {
        marginBottom: -3,
        height: 24,
        width: 24
    },
    tabBarSelectedTitle: {
        color: '#0097A7'
    }
}
