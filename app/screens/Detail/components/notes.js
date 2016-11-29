import React, { Component } from 'react';
import {
    ListView,
    Navigator,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import NotesInput from './notes-input'
import Note from './note'

export default class NotesPage extends Component {

    constructor() {
        super();
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
                <ListView
                    ref={ref => this.listView = ref}
                    dataSource={this.props.notes}
                    renderRow={(note) => <Note note={note}/>}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    scrollEnabled={true}
                    enableEmptySections={true} />
                <View style={styles.footer}>
                    <TouchableHighlight
                        onPress={this.addNote.bind(this)}
                        style={styles.button}
                        underlayColor={'transparent'}>
                        <Text style={styles.text}> Comment </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    button: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '$colors.darkGray',
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
        marginLeft: 25,
        height: '$dimensions.hairlineWidth',
        backgroundColor: '$colors.mediumGray',
    },
    text: {
        color: '$colors.darkGray',
    },
})
