'use strict';

import React, { Component } from 'react';
import { AppRegistry, ViewPagerAndroid, View, Text, Image } from 'react-native';

let styles   = require('../../screens/Login/styles')
let Question = require("../../components/question").default
var Button   = require('../../components/button').default
var Slider = require('react-native-slider');

export default class DailyLog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sliderValue: 0,
            symptoms: ["Pain", "Tiredness", "Nausea", "Depression", "Anxiety", "Drowsiness", "Appetite", "Shortness of breath"]
        }
    }

    onSliderValueChange(value) {
        this.setState({
            sliderValue: Math.round(value)
        });
    }

    getSymptom(index) {
        return this.state.symptoms[index]
    }

    response(resp) {
        console.log(resp)
    }

    createQuestion(index) {
        if (index >= this.state.symptoms.length) {
            return "No More Questions!"
        }
        return "Please indicate the severity of your " + this.state.symptoms[index] + " on a scale of 0 – 10 with 0 being No " + this.state.symptoms[index] + " and 10 the being Worst possible."
    }

    render() {
        return (
         <View style={styles.container}>
            <Text stye={{height: 60, backgroundColor: 'red'}}></Text>
            <Question
                text={this.createQuestion(0)}
                viewStyle={styles.container}>
                <Slider
                    step={1}
                    value={this.state.value}
                    maximumValue={10}
                    onValueChange={(value) => this.onSliderValueChange(value)} />
                <Question
                    text="Are there any changes in medication use for this symptom?"
                    viewStyle={styles.container}>
                    <Button
                        text="None"
                        onpress={this.response("None")}
                        button_styles={styles.button}
                        button_text_styles={styles.LoginLabel} />
                    <Button
                        text="More"
                        onpress={this.response("More")}
                        button_styles={styles.button}
                        button_text_styles={styles.LoginLabel} />
                    <Button
                        text="Less"
                        onpress={this.response("Less")}
                        button_styles={styles.button}
                        button_text_styles={styles.LoginLabel} />
                </Question>
            </Question>
        </View>
      );
    }
}

AppRegistry.registerComponent('TabBar', () => TabBar);
