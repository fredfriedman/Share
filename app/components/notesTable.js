import React, { Component } from 'react';
import { ListView, Image, Text, TouchableHighlight, StyleSheet, View } from 'react-native';

var Note = require('./note').default
var { personIcon } = require('../config/images')

export default class NotesTable extends Component {

    render(){
        return (
            <ListView
                dataSource={this.props.dataSource}
                renderRow={(note) => <Note note={note} poster={personIcon}/>}
                renderFooter={() =>
                    <View style={styles.footer}>
                        <TouchableHighlight
                            onPress={()=>this.props.onComment()}
                            style={styles.button}
                            underlayColor={'transparent'}>
                            <Text style={styles.text}> Comment </Text>
                        </TouchableHighlight>
                    </View>}
                scrollEnabled={true}/>
        );
    }
}

var styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    button: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'white',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30
    },
    text: {
        color: 'white'
    },
})
