'use strict';

import React, { Component } from 'react';
import {
    Image,
    Text,
    View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

// Pages in Tab Bar
import Profile from './components/profile'
import Overview from './components/overview'
import Patients from './components/patients_view'
import Settings from '../../containers/NurseSettingContainer'

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
        const selectedColor = "#0097A7"
        const unselectedColor = "#8E8E8E"
        const size = 30
        const home = (<Icon name="home" size={size} color={unselectedColor} />);
        const gear = (<Icon name="cog" size={size} color={unselectedColor} />);
        const cal = (<Icon name="calendar" size={size} color={unselectedColor} />);
        const over = (<Icon name="modx" size={size} color={unselectedColor} />);
        const homeS = (<Icon name="home" size={size} color={selectedColor} />);
        const calS = (<Icon name="calendar" size={size} color={selectedColor} />);
        const overS = (<Icon name="modx" size={size} color={selectedColor} />);
        const gearS = (<Icon name="cog" size={size} color={selectedColor} />);

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
