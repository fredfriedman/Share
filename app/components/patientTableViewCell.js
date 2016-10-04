import Firebase from 'firebase';
import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableHighlight, Text } from 'react-native';

export default class PatientTableViewCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ["#d80d0d","#FFD700","#329a22"]
        }
    }

    render() {

        let swipeBtns = [
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => {()=> console.log(1)}
            },
            {
                text: 'Duplicate',
                backgroundColor: 'blue',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { ()=> console.log(1)}
            }
        ];

        return (
            <TouchableHighlight onPress={() => { this.props.onPress() }} underlayColor={'#F8F8F8'}>
                <View style={{flexDirection:'row'}}>
                    <View style={[styles.statusBar, { backgroundColor: this.state.status[Math.floor(Math.random()*this.state.status.length)]}]}/>
                    <Image style={styles.thumb} source={this.props.image} />
                    <View style={styles.stack}>
                        <Text style={styles.text}>{this.props.mainText}</Text>
                        <Text style={styles.subTitle}>{this.props.subTitleText}</Text>
                    </View>
                    <View style={{flex: 1}} />
                    <View style={{width: 50}}>
                        <TouchableHighlight
                            onPress={() => { this.props.onPressIcon() }}
                            style={styles.actionIcon}
                            underlayColor={'transparent'}>
                            <Image style={styles.icon} source={this.props.actionIcon} />
                        </TouchableHighlight>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

var styles = StyleSheet.create({
    stack: {
        flexDirection: 'column',
    },
    statusBar: {
        backgroundColor: 'red',
        width: 6,
        height: 43,
        marginTop: 0.5,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 5,
        height: 44,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        marginTop: 2,
        width: 40,
        height: 40,
        marginLeft: 1,
        marginRight: 10,
    },
    text: {
        flex: 0,
        marginTop: 7,
        fontSize: 14,
        fontWeight: '100',
    },
    subTitle: {
        flex: 0,
        paddingTop: 5,
        fontSize: 10,
        fontWeight: '100',
    },
    icon: {
        width: 30,
        height: 30,
    },
    actionIcon: {
        marginRight: 5,
        marginTop: 7,
    }
});
