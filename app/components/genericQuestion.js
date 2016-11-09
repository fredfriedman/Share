import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        Dimensions,
        View, } from 'react-native';
import ToggleButton from './toggleButton'


const { width, height } = Dimensions.get('window');

var Slider = require('react-native-slider');
var Carousel = require('react-native-carousel');

export default class Question extends Component {

	constructor(props) {
        super(props);
<<<<<<< HEAD
        this.state = { 
            value: this.props.value,
            medicationChange: this.props.medicationChange
=======
        this.state = {
            sliderVal: 0
>>>>>>> 9a17da08945e78f3de72574026247d1213d8cd4f
        };
    }

    render() {
    	if (this.props.questionType == "Caregiver") {
    		return(
    			<View style={{width: width}}>
	                <Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold', color: '#00ACC1' }}>
	                    Regarding your duties as a caregiver, on a scale of 0 to 10, how much distress have you been experiencing over the past week?
	                </Text>

	                <Slider
	                    style={{ justifyContent: 'center' }}
	                    value={this.state.value}
	                    trackStyle={customStyles2.track}
	                    thumbStyle={customStyles2.thumb}
	                    //onSlidingComplete={(value) => this.setState({value: value})}
	                    maximumValue={10}
	                    step={1}
	                    minimumTrackTintColor='#00BCD4'
	                    maximumTrackTintColor='#b7b7b7'
	                />
	                <Text style={{ fontSize: 45, textAlign: 'center', color: '#00ACC1', paddingBottom: 15 }}>
	                    {this.state.value}
	                </Text>
	            </View>
    		);
    	} else {
	    	return(
	    		<View style={{width: width}}>
	    			<Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold', color: '#00ACC1' }}>
	                    Please indicate the severity of your {this.props.questionType} on a scale of 0 - 10 with 0 being 
	                    "No {this.props.questionType}" and 10 being "Worst {this.props.questionType} possible".
	                </Text>

	                <Slider
	                    style={{ justifyContent: 'center' }}
	                    value={this.state.value}
	                    trackStyle={customStyles2.track}
	                    thumbStyle={customStyles2.thumb}
	                    onValueChange={(value) => this.setState({value: value})}
	                    onSlidingComplete={() => {this.props.onSlideComplete(this.props.questionType, this.state.value)}}
	                    maximumValue={10}
	                    step={1}
	                    minimumTrackTintColor='#00BCD4'
	                    maximumTrackTintColor='#b7b7b7'
	                />
	                <Text style={{ fontSize: 45, textAlign: 'center', color: '#00ACC1', paddingBottom: 15 }}>
	                    {this.state.value}
	                </Text>

	                <Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold', color: '#00ACC1' }}>
	                    Have there been any changes in medication use for this symptom?
	                </Text>
	                <ToggleButton
	                    style={{borderColor: '#0097A7', backgroundColor: '#00ACC1'}} textStyle={{color: 'white'}}
	                    onPress={() => {this.props.onMedicationChange(this.props.questionType, 'more')}}>
	                    More
	                </ToggleButton>
	                <ToggleButton
	                    style={{borderColor: '#0097A7', backgroundColor: '#00ACC1'}} textStyle={{color: 'white'}}
	                    onPress={() => {this.props.onMedicationChange(this.props.questionType, 'none')}}>	                
	                    None
	                </ToggleButton>
	                <ToggleButton
	                    style={{borderColor: '#0097A7', backgroundColor: '#00ACC1'}} textStyle={{color: 'white'}}
	                    onPress={() => {this.props.onMedicationChange(this.props.questionType, 'less')}}>
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
