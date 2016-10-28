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
var NotesTable = require('../../components/notesTable').default
var NotesInput = require('./notesInput').default

export default class NotesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
        }
        this.notesRef = this.getRef().child('caregivers')
                                     .child(props.caregiver.name)
                                     .child('notes')
    }

    componentDidMount() {
        //this.listenForItems(this.notesRef);
    }

    getRef() {
        return firebase.database().ref();
    }

    addNote() {
        this.props.navigator.push({
            component: NotesInput,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            passProps: {
                user: this.props.user,
                caregiver: this.props.caregiver,
            }
        })
    }

    listenForItems(notesRef) {
        notesRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    _key: child.key,
                    pID: child.val().pid,
                    poster: child.val().poster,
                    text: child.val().text,
                    timestamp: child.val().timestamp
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });
        });
    }

    render(){
        return (
            <View style={styles.scrollView}>
                <Text style={{color: 'white', paddingTop: 20}}> Notes </Text>
                <NotesTable
                    dataSource={this.props.notes}
                    addNote={this.addNote.bind(this)}/>
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
    }
})
