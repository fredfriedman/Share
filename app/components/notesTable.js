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
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                renderFooter={() =>
                    <View style={styles.footer}>
                        <TouchableHighlight
                            onPress={()=>this.props.addNote()}
                            style={styles.button}
                            underlayColor={'transparent'}>
                            <Text style={styles.text}> Comment </Text>
                        </TouchableHighlight>
                    </View>}
                scrollEnabled={true}
                enableEmptySections={true} />
        );
    }
}

var styles = StyleSheet.create({
    footer: {
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
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
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
})
