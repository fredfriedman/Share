'use strict';

import React, { Component } from 'react';
import {
        Image,
        ListView,
        StyleSheet,
        Text,
        TouchableHighlight,
        View,
    } from 'react-native';

import {personIcon} from '../../../config/images'
import Header from '../../../components/header'
import Firebase from '../../../config/firebase'
import EStyleSheet from 'react-native-extended-stylesheet';

// Assets
import Icon from 'react-native-vector-icons/Ionicons';

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
        }

        console.log(props)
    }

    componentWillMount() {
        console.log(this.props)
    }
    render() {
        const defaultImage = <Icon name="md-person" ios="ios-person" md="md-person" size={50} color='white'/>

        return (
        <View style={styles.container}>
            <View style={styles.topBox}>
                <View style={styles.profilePictureContainer}>
                    <Image style={styles.profilePicture} source={personIcon}/>
                </View>
                <Text style={[styles.text, {paddingTop: 20}]}>{this.props.user.Profile.name}</Text>
                <Text style={[styles.text, {fontSize: 12, paddingTop: 10}]}>{this.props.user.Profile.phone}</Text>
            </View>
            <View style={styles.box}>
                <ListView
                    style={styles.listViewContainer}
                    dataSource={this.state.dataSource.cloneWithRows([1,2,3])}
                    renderRow={(data) => <View style={styles.cell}/>}
                    renderSeparator={() => <View style={styles.separator}/>}/>
            </View>
        </View>
        );
    }
}

const styles = EStyleSheet.create({
    bottomBox: {
        flex: 1,
        backgroundColor: '$colors.lightGray',
    },
    box: {
        marginTop: 25,
        shadowColor: "$colors.darkGray",
        shadowOpacity: 0.8,
        shadowRadius: 4,
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 20,
    },
    cell: {
        height: '$dimensions.rowHeight',
        width: '$dimensions.screenWidth',
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: '$colors.lightGray',
    },
    header: {
        backgroundColor: '$colors.lightGray',
    },
    indicator: {
        width: 5,
        height: 50,
        borderRadius: 5,
        backgroundColor: 'orange',
    },
    label: {
        alignSelf: 'center',
        color: '$colors.darkGray',
    },
    listViewContainer: {

    },
    pageControl: {
        position:'absolute',
        left: 0,
        right: 0,
        bottom: 10
    },
    profilePicture: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    profilePictureContainer: {
        height: 100,
        width: 100,
        borderRadius: 50,
        shadowColor: "$colors.darkGray",
        shadowOpacity: 0.8,
        shadowRadius: 4,
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 20,
    },
    row: {
        flexDirection: 'row'
    },
    scrollView: {
        flex: 1,
        width: '$dimensions.screenWidth',
        backgroundColor: 'transparent',
    },
    separator: {
        flex: 1,
        height: '$dimensions.hairlineWidth',
        backgroundColor: '#8E8E8E'
    },
    text: {
        color: '$colors.lightGray',
        fontSize: 20,
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
    topBox: {
        height: 300,
        backgroundColor: '$colors.main',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "$colors.darkGray",
        shadowOpacity: 0.8,
        shadowRadius: 4,
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 20,
    }
});
