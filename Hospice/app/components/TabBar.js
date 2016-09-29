'use strict';

import React, { Component } from 'react';
import { AppRegistry, ViewPagerAndroid, View, Text, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

var { whiteGradient, homeIcon, writeIcon, calIcon, settingsIcon, overviewIcon } = require('../config/images')
var Login = require('../screens/Login/login').default

export default class TabBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Profile'
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
                <Login/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Overview'}
                title="Overview"
                titleStyle={styles.navBarItem}
                renderIcon={() => <Image source={overviewIcon} />}
                renderSelectedIcon={() => <Image source={overviewIcon} />}
                onPress={() => this.setTab('Overview')}>
                <View><Text> Overview </Text></View>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Calendar'}
                title="Calendar"
                titleStyle={styles.navBarItem}
                renderIcon={() => <Image source={calIcon} />}
                renderSelectedIcon={() => <Image source={calIcon} />}
                onPress={() => this.setTab('Calendar')}>
                <View><Text> Calendar </Text></View>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Settings'}
                title="Settings"
                titleStyle={styles.navBarItem}
                renderIcon={() => <Image source={settingsIcon} />}
                renderSelectedIcon={() => <Image source={settingsIcon} />}
                onPress={() => this.setTab('Settings')}>
                <View><Text> Settings </Text></View>
            </TabNavigator.Item>
        </TabNavigator>
      );
    }
}

AppRegistry.registerComponent('Dashboard', () => Dashboard);

var styles = {
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
