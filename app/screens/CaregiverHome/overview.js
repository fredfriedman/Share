import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        View, } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Button from 'react-native-button'

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

    render() {
        return (
        <View style={{ backgroundColor: '#E9E9E9', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <Header text={"Home"}/>
            <Grid style={{flex: 1}}>
            	<Row style={{flex: 1}}>
	            		<Button
	            			containerStyle={{flex: 1, justifyContent: 'center'}}
	            			style={{fontSize: 20, color: '#00ACC1'}}
					        styleDisabled={{color: 'red'}}
					        buttype={'assessment'}
					        onPress={() => this.handlePress.bind(this)}>
					        What would you like to do?
					    </Button>
                </Row>
            	<Row>
            		<Col>
            			<Button
	            			containerStyle={{flex: 1, margin:5, overflow:'hidden', borderRadius:4, backgroundColor: '#00ACC1', justifyContent: 'center'}}
	            			style={{color: '#FFFFFF'}}
					        styleDisabled={{color: 'red'}}
					        onPress={this.handlePress.bind(this)}>
					        Complete Daily Assessment
				    	</Button>
				    </Col>
            		<Col>
            			<Button
	            			containerStyle={{flex: 1, margin:5, overflow:'hidden', borderRadius:4, backgroundColor: '#80DEEA', justifyContent: 'center'}}
	            			style={{color: '#FFFFFF'}}
					        styleDisabled={{color: 'red'}}
					        onPress={() => this.handlePress()}>
					        Message Nurse
				    	</Button>
				    </Col>
            	</Row>
            	<Row>
            		<Col>
            			<Button
	            			containerStyle={{flex: 1, margin:5, overflow:'hidden', borderRadius:4, backgroundColor: '#80DEEA', justifyContent: 'center'}}
	            			style={{color: '#FFFFFF'}}
					        styleDisabled={{color: 'red'}}
					        onPress={() => this.handlePress('history')}>
					        View Assessment History
				    	</Button>
				    </Col>
            		<Col>
            			<Button
	            			containerStyle={{flex: 1, margin:5, overflow:'hidden', borderRadius:4, backgroundColor: '#00ACC1', justifyContent: 'center'}}
	            			style={{color: '#FFFFFF'}}
					        styleDisabled={{color: 'red'}}
					        onPress={() => this.handlePress('settings')}>
					        Settings
				    	</Button>
				    </Col>
            	</Row>
            </Grid>
        </View>
        );
    }
}

var styles = StyleSheet.create({
});
