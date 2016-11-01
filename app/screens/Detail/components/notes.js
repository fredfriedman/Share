import React, { Component } from 'react';
import {
    ListView,
    Navigator,
    Text,
    TouchableHighlight,
    StyleSheet,
    View
} from 'react-native';
import Dimensions from 'Dimensions';

import { personIcon } from '../../../config/images'
import NotesInput from './notes-input'
import Note from './note'

export default class NotesPage extends Component {

    constructor(props) {
        super(props);
    }

    addNote() {
        this.props.navigator.push({
            component: NotesInput,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            passProps: {
                user: this.props.user,
                patient: this.props.patient,
            }
        })
    }

    render(){
        return (
            <View style={this.props.containerStyle}>
                <Text style={this.props.labelStyle}> Notes </Text>
                <ListView
                    dataSource={this.props.notes}
                    renderRow={(note) => <Note note={note} poster={personIcon}/>}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    renderFooter={() =>
                        <View style={styles.footer}>
                            <TouchableHighlight
                                onPress={this.addNote.bind(this)}
                                style={styles.button}
                                underlayColor={'transparent'}>
                                <Text style={styles.text}> Comment </Text>
                            </TouchableHighlight>
                        </View>}
                    scrollEnabled={true}
                    enableEmptySections={true} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#1e1e1e',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30
    },
    footer: {
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    text: {
        color: '#1e1e1e'
    },
})
