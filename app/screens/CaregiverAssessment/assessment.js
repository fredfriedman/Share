import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        Dimensions,
        View, } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Button from 'react-native-button'


const { width, height } = Dimensions.get('window');

var { backIcon, whiteGradient } = require('../../config/images')
var Header = require('../../components/header').default
var Log = require('../DailyLog/log').default
var Slider = require('react-native-slider');
var Carousel = require('react-native-carousel');





export default class Assessment extends Component {

    constructor() {
        super();
        this.state = { 
            sliderVal: 0, 
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
        return (
        <Carousel 
            width={this.state.size.width}
            loop={false}
            animate={false}
            indicatorAtBottom={true}
            indicatorOffset={50}
        >

            <View style={{ backgroundColor: '#E9E9E9', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                <Header text={"Assessment"}/>

                <TouchableHighlight
                    onPress={()=>this.onBack()}
                    style={{position: 'absolute', width: 20, height: 20, top: 25, left: 15, backgroundColor: 'transparent'}}
                    underlayColor={'#f8f8f8'}>
                    <Image source={backIcon}/>
                </TouchableHighlight>

                <Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold', color: 'steelblue' }}>
                    Please indicate the severity of your pain on a scale of 0 - 10 with 0 being "No pain" and 10 being "Worst pain possible".
                </Text>

                <Slider
                    style={{ justifyContent: 'center' }}
                    value={this.state.sliderVal}
                    trackStyle={iosStyles.track}
                    thumbStyle={iosStyles.thumb}
                    onValueChange={(value) => this.setState({sliderVal: value})}
                    maximumValue={10}
                    step={1} 
                    minimumTrackTintColor='#00BCD4'
                    maximumTrackTintColor='#b7b7b7'
                />
                <Text style={{ fontSize: 45, textAlign: 'center', color: 'steelblue', paddingBottom: 15 }}>
                    {this.state.sliderVal}
                </Text>

                <Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold', color: 'steelblue' }}>
                    Have there been any changes in medication use for this symptom?
                </Text>
                <Button
                    containerStyle={{margin:5, overflow:'hidden', borderRadius:4, backgroundColor: 'steelblue', justifyContent: 'center'}}
                    style={{color: 'skyblue'}}
                    styleDisabled={{color: 'red'}}>
                    More
                </Button>
                <Button
                    containerStyle={{margin:5, overflow:'hidden', borderRadius:4, backgroundColor: 'skyblue', justifyContent: 'center'}}
                    style={{color: 'steelblue'}}
                    styleDisabled={{color: 'red'}}>
                    None
                </Button>
                <Button
                    containerStyle={{margin:5, overflow:'hidden', borderRadius:4, backgroundColor: 'steelblue', justifyContent: 'center'}}
                    style={{color: 'skyblue'}}
                    styleDisabled={{color: 'red'}}>
                    Less
                </Button>
            </View>
            <View style={{ backgroundColor: '#E9E9E9', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                <Header text={"Assessment"}/>

                <TouchableHighlight
                    onPress={()=>this.onBack()}
                    style={{position: 'absolute', width: 20, height: 20, top: 25, left: 15, backgroundColor: 'transparent'}}
                    underlayColor={'#f8f8f8'}>
                    <Image source={backIcon}/>
                </TouchableHighlight>

                <Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold', color: 'steelblue' }}>
                    Regarding your duties as a caregiver, on a scale of 0 to 10, how much distress have you been experiencing over the past week?
                </Text>

                <Slider
                    style={{ justifyContent: 'center' }}
                    value={this.state.sliderVal}
                    trackStyle={iosStyles.track}
                    thumbStyle={iosStyles.thumb}
                    onValueChange={(value) => this.setState({sliderVal: value})}
                    maximumValue={10}
                    step={1} 
                    minimumTrackTintColor='#00BCD4'
                    maximumTrackTintColor='#b7b7b7'
                />
                
                <Text style={{ fontSize: 45, textAlign: 'center', color: 'steelblue', paddingBottom: 15 }}>
                    {this.state.sliderVal}
                </Text>
            </View>
            <View style={styles.container}>
              <Text>Page 3</Text>
            </View>
        </Carousel>
        );
    }
}

var iosStyles = StyleSheet.create({
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.35,
  }
});

var styles = StyleSheet.create({
  container: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

