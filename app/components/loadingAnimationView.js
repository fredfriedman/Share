import React, { Component } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit'

export default class LoadingAnimationView extends Component {
    constructor(){
        super()
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Spinner
                    style={{alignSelf: 'center'}}
                    isVisible={this.props.animating}
                    size={80}
                    type={'Bounce'}
                    color={'#FFC107'}/>
            </View>
        );
    }
}
