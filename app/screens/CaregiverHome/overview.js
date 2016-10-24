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
let CaregiverHistory = require('../CaregiverHistory/history').default


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
	            			style={{fontSize: 20, color: 'steelblue'}}
					        styleDisabled={{color: 'red'}}
					        buttype={'assessment'}
					        onPress={() => this.handlePress.bind(this)}>
					        What would you like to do?
					    </Button>
                </Row>
            	<Row>
            		<Col>
            			<Button
	            			containerStyle={{flex: 1, margin:5, overflow:'hidden', borderRadius:4, backgroundColor: 'steelblue', justifyContent: 'center'}}
	            			style={{color: 'skyblue'}}
					        styleDisabled={{color: 'red'}}
					        onPress={this.handlePress.bind(this)}>
					        Complete Daily Assessment
				    	</Button>
				    </Col>
            		<Col>
            			<Button
	            			containerStyle={{flex: 1, margin:5, overflow:'hidden', borderRadius:4, backgroundColor: 'skyblue', justifyContent: 'center'}}
	            			style={{color: 'steelblue'}}
					        styleDisabled={{color: 'red'}}
					        onPress={() => this.handlePress()}>
					        Message Nurse
				    	</Button>
				    </Col>
            	</Row>
            	<Row>
            		<Col>
            			<Button
	            			containerStyle={{flex: 1, margin:5, overflow:'hidden', borderRadius:4, backgroundColor: 'skyblue', justifyContent: 'center'}}
	            			style={{color: 'steelblue'}}
					        styleDisabled={{color: 'red'}}
					        onPress={() => this.handlePress('history')}>
					        View Assessment History
				    	</Button>
				    </Col>
            		<Col>
            			<Button
	            			containerStyle={{flex: 1, margin:5, overflow:'hidden', borderRadius:4, backgroundColor: 'steelblue', justifyContent: 'center'}}
	            			style={{color: 'skyblue'}}
					        styleDisabled={{color: 'red'}}
					        onPress={() => this._handlePress()}>
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
