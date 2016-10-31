import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, StyleSheet, View } from 'react-native';
import Dimensions from 'Dimensions';

export default class Header extends Component {

    renderButton(action, icon, style) {
        if ( action == null) {
            return null
        }
        return (
            <TouchableHighlight
                onPress={action}
                style={style}
                underlayColor={'transparent'}>
                {icon}
            </TouchableHighlight>
        )
    }

    getTitle(title) {
        if (title == null) {
            return null
        }
        return (
            <Text style={[styles.header_text, this.props.textStyle]}>{this.props.text}</Text>
        )
    }

    render(){
        return (
            <View style={styles.navBarContainer}>
                <View style={[styles.header, this.props.headerStyle]}>
                    {this.getTitle(this.props.text)}
                    {this.renderButton(this.props.leftAction, this.props.leftIcon, { marginLeft: 8, paddingTop: 10 })}
                    {this.renderButton(this.props.rightAction, this.props.rightIcon, { marginRight: 8, paddingTop: 10 })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navBarContainer: {
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#00BCD4',
        borderColor: '#AAAAAA',
        borderBottomWidth: 0.5,
    },
    header_item: {
        paddingLeft: 10,
        paddingRight: 10
    },
    header_text: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 25,
    }
});
