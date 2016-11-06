import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        Dimensions,
        View, } from 'react-native';
import Button from 'react-native-button'
import ToggleButton from './toggleButton'


const { width, height } = Dimensions.get('window');

var Slider = require('react-native-slider');
var Carousel = require('react-native-carousel');

export default class Question extends Component {

	constructor(props) {
        super(props);
        this.state = { 
            sliderVal: 0,
            medicationChange: 0
        };
    }

    render() {
    	if (this.props.symptom == null) {
    		return(
    			<View>
	                <Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold', color: '#00ACC1' }}>
	                    Regarding your duties as a caregiver, on a scale of 0 to 10, how much distress have you been experiencing over the past week?
	                </Text>

	                <Slider
	                    style={{ justifyContent: 'center' }}
	                    value={this.state.sliderVal}
	                    trackStyle={customStyles2.track}
	                    thumbStyle={customStyles2.thumb}
	                    onValueChange={(value) => this.setState({sliderVal: value})}
	                    maximumValue={10}
	                    step={1} 
	                    minimumTrackTintColor='#00BCD4'
	                    maximumTrackTintColor='#b7b7b7'
	                />
	                <Text style={{ fontSize: 45, textAlign: 'center', color: '#00ACC1', paddingBottom: 15 }}>
	                    {this.state.sliderVal}
	                </Text>
	            </View>
    		);
    	} else {
	    	return(
	    		<View>
	    			<Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold', color: '#00ACC1' }}>
	                    Please indicate the severity of your {this.props.symptom} on a scale of 0 - 10 with 0 being 
	                    "No {this.props.symptom}" and 10 being "Worst {this.props.symptom} possible".
	                </Text>

	                <Slider
	                    style={{ justifyContent: 'center' }}
	                    value={this.state.sliderVal}
	                    trackStyle={customStyles2.track}
	                    thumbStyle={customStyles2.thumb}
	                    onValueChange={(value) => this.setState({sliderVal: value})}
	                    maximumValue={10}
	                    step={1} 
	                    minimumTrackTintColor='#00BCD4'
	                    maximumTrackTintColor='#b7b7b7'
	                />
	                <Text style={{ fontSize: 45, textAlign: 'center', color: '#00ACC1', paddingBottom: 15 }}>
	                    {this.state.sliderVal}
	                </Text>

	                <Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold', color: '#00ACC1' }}>
	                    Have there been any changes in medication use for this symptom?
	                </Text>
	                <ToggleButton
	                    style={{borderColor: '#0097A7', backgroundColor: '#00ACC1'}} textStyle={{color: 'white'}}>
	                    More
	                </ToggleButton>
	                <ToggleButton
	                    style={{borderColor: '#0097A7', backgroundColor: '#00ACC1'}} textStyle={{color: 'white'}}>
	                    None
	                </ToggleButton>
	                <ToggleButton
	                    style={{borderColor: '#0097A7', backgroundColor: '#00ACC1'}} textStyle={{color: 'white'}}>
	                    Less
	                </ToggleButton>
	            </View>
	    	);
	    }
    }
}
var customStyles2 = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: '#00ACC1',
    borderWidth: 2,
  }
});
