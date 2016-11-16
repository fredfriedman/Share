import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        Dimensions,
        View, } from 'react-native';
import ToggleButton from './toggleButton';
import Slider from 'react-native-slider';
import EStyleSheet from 'react-native-extended-stylesheet';


export default class Question extends Component {

	constructor(props) {
        super(props);
        this.state = { 
            value: this.props.value,
            medicationChange: this.props.medicationChange
        };
    }

    render() {
    	if (this.props.questionType == "Caregiver") {
    		return(
    			<View style={{flex: 1}}>
	                <Text style={Styles.questionText}>
	                    Regarding your duties as a caregiver, on a scale of 0 to 10, how much distress have you been experiencing over the past week?
	                </Text>

	                <Slider
	                    style={{ justifyContent: 'center' }}
	                    value={this.state.value}
	                    trackStyle={Styles.sliderTrack}
	                    thumbStyle={Styles.sliderThumb}
	                    onSlidingComplete={() => {this.props.onSlideComplete(this.props.questionType, this.state.value)}}
	                    maximumValue={10}
	                    step={1}
	                    minimumTrackTintColor='#00BCD4'
	                    maximumTrackTintColor='#b7b7b7'
	                />
	                <Text style={Styles.sliderText}>
	                    {this.state.value}
	                </Text>
	            </View>
    		);
    	} else {
	    	return(
	    		<View style={{flex: 1}}>
	    			<Text style={Styles.questionText}>
	                    Please indicate the severity of your {this.props.questionType} on a scale of 0 - 10 with 0 being 
	                    "No {this.props.questionType}" and 10 being "Worst {this.props.questionType} possible".
	                </Text>

	                <Slider
	                    style={{ justifyContent: 'center' }}
	                    value={this.state.value}
	                    trackStyle={Styles.sliderTrack}
	                    thumbStyle={Styles.sliderThumb}
	                    onValueChange={(value) => this.setState({value: value})}
	                    onSlidingComplete={() => {this.props.onSlideComplete(this.props.questionType, this.state.value)}}
	                    maximumValue={10}
	                    step={1}
	                    minimumTrackTintColor='#00BCD4'
	                    maximumTrackTintColor='#b7b7b7'
	                />
	                <Text style={Styles.sliderText}>
	                    {this.state.value}
	                </Text>

	                <Text style={Styles.questionText}>
	                    Have there been any changes in medication use for this symptom?
	                </Text>
	                <ToggleButton
	                    style={this.state.medicationChange == 'more' ? Styles.selectedStyle : Styles.unselectedStyle} 
	                    textStyle={{color: 'white'}}
	                    onPress={() => {
	                    	this.setState({ medicationChange: 'more' });
	                    	this.props.onMedicationChange(this.props.questionType, 'more');
	                    }}>
	                    More
	                </ToggleButton>
	                <ToggleButton
	                    style={this.state.medicationChange == 'none' ? Styles.selectedStyle : Styles.unselectedStyle} 
	                    textStyle={{color: 'white'}}
	                    onPress={() => {
	                    	this.setState({ medicationChange: 'none' });
	                    	this.props.onMedicationChange(this.props.questionType, 'none');
	                    }}>
	                    None
	                </ToggleButton>
	                <ToggleButton
	                    style={this.state.medicationChange == 'less' ? Styles.selectedStyle : Styles.unselectedStyle} 
	                    textStyle={{color: 'white'}}
	                    onPress={() => {
	                    	this.setState({ medicationChange: 'less' });
	                    	this.props.onMedicationChange(this.props.questionType, 'less');
	                    }}>
	                    Less
	                </ToggleButton>
	            </View>
	    	);
	    }
    }
}
var Styles = EStyleSheet.create({
  questionText: {
  	padding: 10, 
  	textAlign: 'center', 
  	fontWeight: 'bold', 
  	color: '$colors.main'
  },
  sliderTrack: {
    height: 4,
    borderRadius: 2,
  },
  sliderThumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: '$colors.main',
    borderWidth: 2,
  },
  sliderText: {
  	fontSize: 45, 
  	textAlign: 'center', 
  	color: '$colors.main', 
  	paddingBottom: 15
  },
  selectedStyle: {
  	backgroundColor: '$colors.answerSelectedBackground',  	
  	borderColor: '$colors.answerSelectedBorder'
  },
  unselectedStyle: {
  	backgroundColor: '$colors.answerUnselectedBackground',
  	borderColor: '$colors.answerUnselectedBorder' 
  }
});
