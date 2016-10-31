'use strict';

import React, { Component } from 'react';
import { AppRegistry, ViewPagerAndroid, View, StyleSheet, Text, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';

var dStyles = require('../../config/styles')

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
        const home = (<Icon name="home" size={30} color="gray" />);
        const cal = (<Icon name="calendar" size={30} color="gray" />);
        const over = (<Icon name="modx" size={30} color="gray" />);
        const homeS = (<Icon name="home" size={30} color="#00BCD4" />);
        const calS = (<Icon name="calendar" size={30} color="#00BCD4" />);
        const overS = (<Icon name="modx" size={30} color="#00BCD4" />);

        return (
        <TabNavigator tabBarShadowStyle={styles.tabBarShadow} tabBarStyle={styles.tabBar}>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Profile'}
                title="Profile"
                titleStyle={styles.tabBarTitle}
                selectedTitleStyle={styles.tabBarSelectedTitle}
                renderIcon={() => home}
                renderSelectedIcon={() => homeS}
                onPress={() => this.setTab('Profile')}>
                <Profile navigator={this.props.navigator} user={this.props.user}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Overview'}
                title="Overview"
                titleStyle={styles.tabBarTitle}
                selectedTitleStyle={styles.tabBarSelectedTitle}
                renderIcon={() => over}
                renderSelectedIcon={() => overS}
                onPress={() => this.setTab('Overview')}>
                <Overview navigator={this.props.navigator} user={this.props.user}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Calendar'}
                title="Calendar"
                titleStyle={styles.tabBarTitle}
                selectedTitleStyle={styles.tabBarSelectedTitle}
                renderIcon={() => cal}
                renderSelectedIcon={() => calS}
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
        backgroundColor: '#E9E9E9',
    },
    tabBarShadow: {
        backgroundColor: '#f7f7f7',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#bdbdbd'
    },
    tabBarTitle: {
        fontFamily: 'Helvetica',
        fontWeight: '100',
        fontSize: 10,
        color: '#90A4AE'
    },
    tabBarSelectedTitle: {
        color: '#0097A7'
    }
}
