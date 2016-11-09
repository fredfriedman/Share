import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        View, } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Button from 'apsl-react-native-button'

var Header = require('../../components/header').default
var {assignmentIcon} = require('../../config/images')
let CaregiverAssessment = require('../CaregiverAssessment/assessment').default
let CaregiverHistory = require('../CaregiverHistory/historyTest').default
let CaregiverSettings = require('../CaregiverSettings/caregiversettings').default

export default class Overview extends Component {

    constructor() {
        super();
    }

    handlePress(component) {
    	switch (component) {
            //test history
            case "history":
                this.props.navigator.push({
                    component: CaregiverHistory
                })
                break;
    		case "assessment":
    			this.props.navigator.push({
    				component: CaregiverAssessment
    			})
    			break;

        case "settings":
          this.props.navigator.push({
            component: CaregiverSettings
          })
          break;
    		default:
    			this.props.navigator.push({
    				component: CaregiverAssessment
    			})
    	}
    }

    handlePressIn(newStyle) {
        this.setState({style: newStyle});
    }

    pressedStyle() {

        return {
            borderColor: '#4DD0E1',
            backgroundColor: '#80DEEA',
            flex: 1
        }
    }

    render() {
        return (
        <View style={{ backgroundColor: '#E9E9E9', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <Header text={"Home"}/>
            <Grid style={{flex: 1}}>
            	<Row style={styles.container}>
	            		<Text
	            			style={{fontSize: 20, fontWeight: 'bold', color: '#00ACC1', flex: 1, textAlign: 'center', justifyContent: 'center'}}>
					        What would you like to do?
					    </Text>
                </Row>
            	<Row>
            		<Col style={styles.container}>
            			<Button
                            pressed={false}
                            style={styles.buttonStyle1} textStyle={styles.textStyle}
                            onPress={() => this.handlePress()}>
					        Complete Daily Assessment
				    	</Button>
				    </Col>
            		<Col style={styles.container}>
            			<Button
                            style={styles.buttonStyle2} textStyle={styles.textStyle}
					        onPress={() => this.handlePress()}>
					        Message Nurse
				    	</Button>
				    </Col>
            	</Row>
            	<Row>
            		<Col style={styles.container}>
            			<Button
	            			style={styles.buttonStyle2} textStyle={styles.textStyle}
					        onPress={() => this.handlePress('history')}>
					        View Assessment History
				    	</Button>
				    </Col>
            		<Col style={styles.container}>
            			<Button
                            style={styles.buttonStyle1} textStyle={styles.textStyle}
					        onPress={() => this._handlePress('settings')}>
					        Settings
				    	</Button>
				    </Col>
            	</Row>
            </Grid>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  textStyle: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  textStyle6: {
    color: '#8e44ad',
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  },
  buttonStylePressing: {
    borderColor: 'red',
    backgroundColor: 'red'
  },
  buttonStyle: {
    borderColor: '#f39c12',
    backgroundColor: '#f1c40f'
  },
  buttonStyle1: {
    borderColor: '#0097A7',
    backgroundColor: '#00ACC1',
    flex: 1
  },
  buttonStyle2: {
    borderColor: '#4DD0E1',
    backgroundColor: '#80DEEA',
    flex: 1
  },
  buttonStyle3: {
    borderColor: '#16a085',
    backgroundColor: '#1abc9c'
  },
  buttonStyle4: {
    borderColor: '#27ae60',
    backgroundColor: '#2ecc71'
  },
  buttonStyle5: {
    borderColor: '#2980b9',
    backgroundColor: '#3498db'
  },
  buttonStyle6: {
    borderColor: '#4DD0E1',
    backgroundColor: '#80DEEA',
    flex: 1
  },
  buttonStyle7: {
    borderColor: '#8e44ad',
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 3,
  },
  buttonStyle8: {
    backgroundColor: 'white',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 22,
  },
  textStyle8: {
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    color: '#333',
  },
  customViewStyle: {
    width: 120,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
  }
})