import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class Header extends Component {

    renderButton(action, icon, style) {
        if ( action == null) {
            return <View/>
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

    renderCenterItem() {
        if (this.props.text != null) {
            return ( <Text style={[styles.header_center, styles.header_text, this.props.textStyle]}>{this.props.text}</Text> )
        } else if (this.props.centerIcon != null) {
            return ( <View style={[styles.header_center, {marginTop: 15}]}>{ this.props.centerIcon }</View>)
        } else {
            return <View/>
        }
    }

    render(){
        return (
            <View style={styles.navBarContainer}>
                <View style={[styles.header, this.props.headerStyle]}>
                    {this.renderCenterItem()}
                    {this.renderButton(this.props.leftAction, this.props.leftIcon, { height: 30, width: 35, marginLeft: 15, paddingTop: 5 })}
                    {this.renderButton(this.props.rightAction, this.props.rightIcon, { height: 30, width: 35, marginRight: 15, paddingTop: 5 })}
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    navBarContainer: {
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '$dimensions.navBarHeight',
        backgroundColor: '$colors.main',
        borderColor: '$colors.mediumGray',
        borderBottomWidth: 0.5,
    },
    header_item: {
        paddingLeft: 10,
        paddingRight: 10
    },
    header_center: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    header_text: {
        color: '$colors.darkGray',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
