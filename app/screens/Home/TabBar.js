'use strict';

import React, { Component } from 'react';
import {
    Image,
    Text,
    View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
// Pages in Tab Bar
import Profile from './components/profile'
import Overview from './components/overview'
import Patients from './components/patients_view'
import Calendar from './components/calendar'
import Settings from '../NurseSettings/NurseSettings'

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
        const selectedColor = "#00ACC1"
        const unselectedColor = "#8E8E8E"
        const size = 30

        const gear = (<Icon name="ios-settings-outline" size={size} color={unselectedColor} />);
        const over = (<Icon name="md-aperture" size={size} color={unselectedColor} />);
        const overS = (<Icon name="md-aperture" size={size} color={selectedColor} />);
        const gearS = (<Icon name="ios-settings-outline" size={size} color={selectedColor} />);

        const home = (<Icon name="ios-home-outline" size={size} color={unselectedColor} />);
        const homeS = (<Icon name="ios-home-outline" size={size} color={selectedColor} />);
        const cal = (<Icon name="ios-calendar-outline" size={size} color={unselectedColor} />);
        const calS = (<Icon name="ios-calendar-outline" size={size} color={selectedColor} />);
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
                <Calendar navigator={this.props.navigator} user={this.props.user}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Settings'}
                title="Settings"
                titleStyle={styles.tabBarTitle}
                selectedTitleStyle={styles.tabBarSelectedTitle}
                renderIcon={() => gear}
                renderSelectedIcon={() => gearS}
                onPress={() => this.setTab('Settings')}>
                <Settings navigator={this.props.navigator} user={this.props.user}/>
            </TabNavigator.Item>
        </TabNavigator>
        );
    }
}

const styles = EStyleSheet.create({
    tabBar: {
        backgroundColor: '$colors.navBar',
    },
    tabBarShadow: {
        backgroundColor: '$colors.secondary',
        borderWidth: '$dimensions.hairlineWidth',
        borderColor: '$colors.mediumGray',
    },
    tabBarTitle: {
        fontSize: 10,
        color: '$colors.mediumGray',
        fontFamily: '$fonts.family',
        fontWeight: '$fonts.weight',
    },
    tabBarSelectedTitle: {
        color: '$colors.status'
    }
});
