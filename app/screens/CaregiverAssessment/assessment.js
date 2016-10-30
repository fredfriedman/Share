import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        Dimensions,
        View, } from 'react-native';
import Button from 'react-native-button'


const { width, height } = Dimensions.get('window');

var { backIcon, whiteGradient } = require('../../config/images')
var Header = require('../../components/header').default
var Slider = require('react-native-slider');
var Carousel = require('react-native-carousel');
var Question = require('../../components/genericQuestion').default


export default class Assessment extends Component {

    constructor() {
        super();
        this.state = { 
            symptoms: ["Pain", "Tiredness", "Nausea", "Depression", "Anxiety", "Drowsiness", "Appetite", "Shortness of Breath"], 
            size: { width, height }
        };
    }

    onBack() {
        this.props.navigator.pop()
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    render() {

        var assessmentQuestions = [];
        for (var i = 0; i < this.state.symptoms.length; i++) {
            assessmentQuestions.push(
                <View style={{ backgroundColor: '#FFFFFF', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                    <Header text={"Assessment"}/>

                    <TouchableHighlight
                        onPress={()=>this.onBack()}
                        style={{position: 'absolute', width: 20, height: 20, top: 25, left: 15, backgroundColor: 'transparent'}}
                        underlayColor={'#f8f8f8'}>
                        <Image source={backIcon}/>
                    </TouchableHighlight>

                    <Question
                        symptom={this.state.symptoms[i]}
                    />
                </View>
            );
        }
        assessmentQuestions.push(
            <View style={{ backgroundColor: '#FFFFFF', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                <Header text={"Assessment"}/>

                <TouchableHighlight
                    onPress={()=>this.onBack()}
                    style={{position: 'absolute', width: 20, height: 20, top: 25, left: 15, backgroundColor: 'transparent'}}
                    underlayColor={'#f8f8f8'}>
                    <Image source={backIcon}/>
                </TouchableHighlight>
                <Question/>
            </View>
        );

        return (
            <Carousel 
                width={this.state.size.width}
                loop={false}
                animate={false}
                indicatorAtBottom={true}
                indicatorOffset={50}
                indicatorColor='#0097A7'
                inactiveIndicatorColor='#B2EBF2'
            >
                {assessmentQuestions}
            </Carousel>
        );
    }
}

