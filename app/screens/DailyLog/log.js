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
    response() {
        console.log("clicked")
    }

    render() {
      return (
         <View style={styles.container}>
            <Text stye={{height: 60, backgroundColor: 'red'}}></Text>
            <Question
                text="Please indicate the severity of your on a scale of 0 – 10 with 0 being No and 10 being Worst possible."
                viewStyle={styles.container}>
                <Slider
                    step={1}
                    value={this.state.value}
                    maximumValue={10}
                    onValueChange={(value) => this.onSliderValueChange(value)} />
            </Question>
            <Question
                text="Are there any changes in medication use for this symptom?"
                viewStyle={styles.container}>
                <Button
                    text="None"
                    onpress={this.response.bind(this)}
                    button_styles={styles.button}
                    button_text_styles={styles.LoginLabel} />
                <Button
                    text="More"
                    onpress={this.response.bind(this)}
                    button_styles={styles.button}
                    button_text_styles={styles.LoginLabel} />
                <Button
                    text="Less"
                    onpress={this.response.bind(this)}
                    button_styles={styles.button}
                    button_text_styles={styles.LoginLabel} />
            </Question>
        </View>
      );
    }
}

AppRegistry.registerComponent('TabBar', () => TabBar);
