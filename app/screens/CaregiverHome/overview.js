import React, { Component } from 'react';
import {
        TouchableHighlight,
        Text,
        View, } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Button from 'apsl-react-native-button'
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '../../components/header';
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
        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column' }}>
            <Header text={"Home"} textStyle={{color: 'white'}}/>
            <Grid>
                <Row style={styles.container}>
                        <Text
                            style={styles.overviewTextStyle}>
                            What would you like to do?
                        </Text>
                </Row>
                <Row style={styles.container}>
                    <Col>
                        <Button
                            pressed={false}
                            style={styles.buttonStyle1} 
                            onPress={() => this.handlePress(AssessmentLandingPage)}>
                            <View
                                style={styles.buttonChildrenContainer}>
                                <Icon name="assignment-late" size={80} color="white" />
                                <Text style={styles.buttonTextStyle}>Complete Assessment</Text>
                            </View>
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            style={styles.buttonStyle2} 
                            onPress={() => this.handlePress(null)}>
                            <View
                                style={styles.buttonChildrenContainer}>
                                <Icon name="message" size={80} color="white" />
                                <Text style={styles.buttonTextStyle}>Message Nurse</Text>
                            </View>
                        </Button>
                    </Col>
                </Row>
                <Row style={styles.container}>
                    <Col>
                        <Button
                            style={styles.buttonStyle2} 
                            onPress={() => this.handlePress(CaregiverHistory)}>
                            <View
                                style={styles.buttonChildrenContainer}>
                                <Icon name="history" size={80} color="white" />
                                <Text style={styles.buttonTextStyle}>View History</Text>
                            </View>
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            style={styles.buttonStyle1} 
                            onPress={() => this.handlePress(CaregiverSettings)}>
                            <View
                                style={styles.buttonChildrenContainer}>
                                <Icon name="settings" size={80} color="white" />
                                <Text style={styles.buttonTextStyle}>Settings</Text>
                            </View>
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </View>
        );
    }
}

var styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
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
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    margin: 5,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonStyle1: {
    backgroundColor: '$colors.buttonBackground1',
    borderColor: '$colors.buttonBorder1',
    justifyContent: 'center',
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 5
  },
  buttonStyle2: {
    backgroundColor: '$colors.buttonBackground2',
    borderColor: '$colors.buttonBorder2',
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 5
  },
});