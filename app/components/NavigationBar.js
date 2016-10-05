'use strict';
import React, { Component } from 'react';
import { Navigator } from 'react-native';

export default class NavigationBar  extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Navigator.NavigationBar
                routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                    if (route.index === 0) {
                        return null;
                    } else {
                        return (
                            <TouchableHighlight onPress={() => navigator.pop()}>
                                <Text> Back </Text>
                            </TouchableHighlight>
                        );
                    }
                },
                RightButton: (route, navigator, index, navState) =>
                    { return (<Text>Done</Text>); },
                Title: (route, navigator, index, navState) =>
                    { return (<Text>Awesome Nav Bar</Text>); },
                }}
                style={{backgroundColor: '#3498DB'}}
            />
        );
    }
}
