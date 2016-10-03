'use strict';

import React, { Component } from 'react';
import { AppRegistry, ViewPagerAndroid, View, Text, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

var { whiteGradient, homeIcon, writeIcon, calIcon, settingsIcon, overviewIcon } = require('../config/images')

// Page in Tab Bar
var Profile = require('../screens/Home/profile').default
var Overview = require('../screens/Home/overview').default
var Patients = require('../screens/Home/patients_view').default
var Settings = require('../screens/Settings/settings').default



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
        <TabNavigator tabBarStyle={styles.tabBar}>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Profile'}
                title="Profile"
                titleStyle={styles.navBarItem}
                renderIcon={() => <Image source={homeIcon} />}
                renderSelectedIcon={() => <Image source={homeIcon} />}
                onPress={() => this.setTab('Profile')}>
                <Profile/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Overview'}
                title="Overview"
                titleStyle={styles.navBarItem}
                renderIcon={() => <Image source={overviewIcon} />}
                renderSelectedIcon={() => <Image source={overviewIcon} />}
                onPress={() => this.setTab('Overview')}>
                <Overview/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Calendar'}
                title="Calendar"
                titleStyle={styles.navBarItem}
                renderIcon={() => <Image source={calIcon} />}
                renderSelectedIcon={() => <Image source={calIcon} />}
                onPress={() => this.setTab('Calendar')}>
                <Patients/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Settings'}
                title="Settings"
                titleStyle={styles.navBarItem}
                renderIcon={() => <Image source={settingsIcon} />}
                renderSelectedIcon={() => <Image source={settingsIcon} />}
                onPress={() => this.setTab('Settings')}>
                <Settings/>
            </TabNavigator.Item>
        </TabNavigator>
      );
    }
}

AppRegistry.registerComponent('TabBar', () => TabBar);

var styles = {
    view: {
        height: 10
    },
    tabBar: {
        backgroundColor: '#EFEFF4',
        borderTopColor: '#CECED2',
        borderTopWidth: 1,
        height: 49
    },
    navBarItem: {
        fontFamily: 'Helvetica',
        fontWeight: '100',
        fontSize: 10,
        color: '#8E8E93'
    }
}
