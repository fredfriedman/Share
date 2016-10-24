import Firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import Dimensions from 'Dimensions'

export default class Note extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <Image style={styles.posterPicture} source={this.props.poster}/>
                <View style={{marginTop: 7, paddingLeft: 10, flexDirection: 'column'}}>
                    <Text style={styles.title}>{this.props.note.poster}</Text>
                    <Text style={styles.text}>{this.props.note.text}</Text>
                </View>
                <View style={{flex: 1}}/>
                <Text style={styles.date}>{this.props.note.date}</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    posterPicture: {
        marginTop: 7,
        marginLeft: 5,
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'transparent'
    },
    row: {
        height: 60,
        backgroundColor: 'transparent',
        borderColor: 'gray',
        borderWidth: 1,
        width: Dimensions.get('window').width
    },
    date: {
        marginTop: 7,
        marginRight: 10,
        fontSize: 11,
        fontWeight: 'bold',
        color: 'white'
    },
    title: {
        fontSize: 12,
        fontWeight: '500',
        color: 'white'
    },
    text: {
        fontSize: 9,
        fontWeight: '200',
        color: 'white'
    },
});
