import React, { Component } from 'react';
import {
        TouchableHighlight,
        Text,
        View, } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CaregiverAssessment from '../CaregiverAssessment/assessment';
import CaregiverHistory from '../CaregiverHistory/history';
import CaregiverSettings from '../CaregiverSettings/caregiversettings';
import AssessmentLandingPage from '../CaregiverAssessment/landing';

export default class Overview extends Component {

    constructor(props) {
        super(props);
    }

    handlePress(component) {
        this.props.navigator.push({
            component: component,
            passProps: {user: this.props.user}
        });
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={{height: 100}}/>
            <Grid style={{marginLeft: 10, marginRight: 10}}>
            	<Row style={styles.row}>
            		<Col>
                        <TouchableHighlight
                            style={styles.buttonStyle2}
                            onPress={() => this.handlePress(CaregiverHistory)}>
                            <View style={styles.buttonChildrenContainer}>
                                <Icon name="history" size={80} color="white" />
                                <Text style={styles.buttonTextStyle}>View History</Text>
                            </View>
                        </TouchableHighlight>
				    </Col>
            		<Col>
                        <View style={styles.buttonStyle1}>
                            <Text style={styles.buttonTextStyle}>Good Evening, {this.props.user.Profile.name.split(" ")[0]}</Text>
                        </View>
				    </Col>
            	</Row>
            	<Row style={styles.row}>
            		<Col>
                        <TouchableHighlight
                            pressed={false}
                            style={styles.buttonStyle1} 
                            onPress={() => this.handlePress(AssessmentLandingPage)}>
                            <View
                                style={styles.buttonChildrenContainer}>
                                <Icon name="assignment-late" size={80} color="white" />
                                <Text style={styles.buttonTextStyle}>Complete Assessment</Text>
                            </View>
                        </TouchableHighlight>
				    </Col>
            		<Col>
            			<TouchableHighlight
                            style={styles.buttonStyle2}
					        onPress={() => this.handlePress(CaregiverSettings)}>
                            <View
                                style={styles.buttonChildrenContainer}>
                                <Icon name="settings" size={80} color="white" />
                                <Text style={styles.buttonTextStyle}>Settings</Text>
                            </View>
				    	</TouchableHighlight>
				    </Col>
            	</Row>
                <Row style={styles.row}>
            		<Col>
                        <View style={styles.buttonChildrenContainer}>
                        </View>
				    </Col>
            		<Col>
            			<TouchableHighlight
                            style={styles.buttonStyle1}
					        onPress={() => this.handlePress(null)}>
                            <View style={styles.buttonChildrenContainer}>
                                <Icon name="message" size={80} color="white" />
                                <Text style={styles.buttonTextStyle}>Message Nurse</Text>
                            </View>
				    	</TouchableHighlight>
				    </Col>
            	</Row>
            </Grid>
            <View style={{flex: 1}}/>
        </View>
        );
    }
}

var styles = EStyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        flex: 1,
    },
    row: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150
    },
    buttonChildrenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overviewTextStyle: {
        fontFamily: '$fonts.family',
        fontSize: 25,
        color: '$colors.main',
        textAlign: 'center'
    },
    buttonTextStyle: {
        color: 'white',
        fontFamily: '$fonts.family',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonStyle1: {
        backgroundColor: '$colors.buttonBackground1',
        borderColor: '$colors.buttonBorder1',
        justifyContent: 'center',
        margin: 4,
        flex: 1,
    },
    buttonStyle2: {
        backgroundColor: '$colors.buttonBackground2',
        borderColor: '$colors.buttonBorder2',
        margin: 4,
        flex: 1,

    },
    welcomeText: {
        fontFamily: '$fonts.family',
        fontSize: 25,
        color: '$colors.darkGray',
        textAlign: 'center'
    },
});
