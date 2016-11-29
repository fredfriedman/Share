import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class Note extends Component {

    constructor(props) {
        super(props);
    }

    timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " yrs";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " mths";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " d";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " h";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " m";
        }
        return Math.floor(seconds) + " s";
    }

    render() {
        console.log(this.props.note)
        return (
            <View style={styles.row}>
                <Image style={styles.profilePicture} source={{uri: this.props.note.picture, isStatic: true}}/>
                <View style={styles.stack}>
                    <Text style={styles.title}>{this.props.note.poster}</Text>
                    <Text style={styles.text}>{this.props.note.text}</Text>
                </View>
                <View style={{flex: 1}}/>
                <Text style={styles.date}>{this.timeSince(this.props.note.timestamp)}</Text>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    date: {
        marginRight: 10,
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: '$fonts.family',
        color: '#1e1e1e'
    },
    profilePicture: {
        marginLeft: 2.5,
        height: 35,
        width: 35,
        borderRadius: 17.5,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    stack: {
        flexDirection: 'column',
        paddingLeft: 10,
        flexWrap: 'wrap'
    },
    text: {
        fontSize: 12,
        fontWeight: '200',
        fontFamily: '$fonts.family',
        color: '$colors.darkGray'
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: '$fonts.family',
        color: '$colors.darkGray'
    },
    userPicture: {
        height: 40,
        width: 40,
        marginLeft: 5,
        borderRadius: 20,
        backgroundColor: 'transparent'
    }
});
