import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        View, } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Button from 'apsl-react-native-button'
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '../../components/header';
import CaregiverAssessment from '../CaregiverAssessment/assessment';
import CaregiverHistory from '../CaregiverHistory/historyTest';
import CaregiverSettings from '../CaregiverSettings/caregiversettings';

export default class Overview extends Component {

    constructor(props) {
        super(props);
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
    				component: CaregiverAssessment,
                    passProps: {user: this.props.user}
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
                            textStyle={styles.buttonTextStyle}
                            onPress={() => this.handlePress()}>
					        Complete Daily Assessment
				    	</Button>
				    </Col>
            		<Col>
            			<Button
                            style={styles.buttonStyle2} 
                            textStyle={styles.buttonTextStyle}
					        onPress={() => this.handlePress()}>
					        Message Nurse
				    	</Button>
				    </Col>
            	</Row>
            	<Row style={styles.container}>
            		<Col>
            			<Button
	            			style={styles.buttonStyle2} 
                            textStyle={styles.buttonTextStyle}
					        onPress={() => this.handlePress('history')}>
					        View Assessment History
				    	</Button>
				    </Col>
            		<Col>
            			<Button
                            style={styles.buttonStyle1} 
                            textStyle={styles.buttonTextStyle}
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

var styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  overviewTextStyle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '$colors.main', 
    textAlign: 'center'
  },
  buttonTextStyle: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonStyle1: {
    backgroundColor: '$colors.buttonBackground1',
    borderColor: '$colors.buttonBorder1',
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