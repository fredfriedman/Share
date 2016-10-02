'use strict';

import React, { Component } from 'react';
import { AppRegistry, TabBarIOS, View, Text } from 'react-native';


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'history'
        };
    }

    setTab(tabID) {
        this.setState({selectedTab: tabID})
    }
    render() {
        return (
            <TabBarIOS>
                <TabBarIOS.Item
                    systemIcon="history"
                    selected={this.state.selectedTab === 'history'}
                    onPress={() => { this.setTab('history') }}>
                    <View><Text> history </Text></View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    systemIcon="contacts"
                    selected={this.state.selectedTab === "contacts"}
                    onPress={() => { this.setTab('contacts') }}>
                    <View><Text> contacts </Text></View>
                </TabBarIOS.Item>
                <TabBarIOS.Item systemIcon="bookmarks"
                    selected={this.state.selectedTab === "bookmarks"}
                    onPress={() => { this.setTab('bookmarks') }}>
                    <View><Text> bookmarks </Text></View>
                </TabBarIOS.Item>
                <TabBarIOS.Item systemIcon="more"
                    selected={this.state.selectedTab === "more"}
                    onPress={() => { this.setTab('more') }}>
                    <View><Text> more </Text></View>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('Dashboard', () => Dashboard);
