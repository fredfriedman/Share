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
	                <Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold', color: '#00ACC1' }}>
	                    Regarding your duties as a caregiver, on a scale of 0 to 10, how much distress have you been experiencing over the past week?
	                </Text>

	                <Slider
	                    style={{ justifyContent: 'center' }}
	                    value={this.state.value}
	                    trackStyle={Styles.track}
	                    thumbStyle={Styles.thumb}
	                    onSlidingComplete={() => {this.props.onSlideComplete(this.props.questionType, this.state.value)}}
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
	    		<View style={{flex: 1}}>
	    			<Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold', color: '#00ACC1' }}>
	                    Please indicate the severity of your {this.props.questionType} on a scale of 0 - 10 with 0 being 
	                    "No {this.props.questionType}" and 10 being "Worst {this.props.questionType} possible".
	                </Text>

	                <Slider
	                    style={{ justifyContent: 'center' }}
	                    value={this.state.value}
	                    trackStyle={Styles.track}
	                    thumbStyle={Styles.thumb}
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
var Styles = StyleSheet.create({
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
  },
  selectedStyle: {
  	borderColor: '#FB8C00', 
  	backgroundColor: '#FF9800'
  },
  unselectedStyle: {
  	borderColor: '#0097A7', 
  	backgroundColor: '#00ACC1'
  }
});
