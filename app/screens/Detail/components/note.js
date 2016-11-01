import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

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
        return (
            <View style={styles.row}>
                <Image style={styles.userPicture} source={this.props.poster}/>
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

var styles = StyleSheet.create({
    date: {
        marginRight: 10,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1e1e1e'
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    stack: {
        flexDirection: 'column',
        paddingLeft: 10,
    },
    text: {
        fontSize: 10,
        fontWeight: '200',
        color: '#1e1e1e'
    },
    title: {
        fontSize: 13,
        fontWeight: '500',
        color: '#1e1e1e'
    },
    userPicture: {
        marginLeft: 5,
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'transparent'
    }
});
