import React, { Component } from 'react';
import {
    ListView,
    Image,
    Navigator,
    Text,
    TouchableHighlight,
    StyleSheet,
    View
} from 'react-native';
import Dimensions from 'Dimensions';

var { personIcon } = require('../../config/images')
var firebase = require('../../config/firebase')
var NotesInput = require('./notesInput').default
var Note = require('../../components/note').default

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
            <View style={styles.scrollView}>
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
    scrollView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - Dimensions.get('window').height/2.5,
        backgroundColor:'transparent',
        flex: 1
    },
    footer: {
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    button: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#1e1e1e',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30
    },
    text: {
        color: '#1e1e1e'
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
})
