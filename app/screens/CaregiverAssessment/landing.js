import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        Alert,
        Dimensions,
        View, } from 'react-native';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

import CaregiverAssessment from './assessment';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: this.formatDate(new Date()),
        };
    }

    formatDate(date) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];

        var beforeDate = date;
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return (day + ' ' + monthNames[monthIndex] + ' ' + year);
    }

    onBack() {
        this.props.navigator.pop();
    }

    handlePress(component) {
        this.props.navigator.push({
            component: component,
            passProps: {user: this.props.user, date: this.state.date}
        });
    }

    render() {
        return(
            <View style={Styles.container}>
                <View style={{height: height * 0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Text style={Styles.landingBody}>
                        You are about to take an assessment for:
                    </Text>
                </View>
                <View style={{height: height * 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={Styles.landingDate}>
                        {this.state.date}
                    </Text>
                </View>
                
                <View style={Styles.buttonContainer}>
                    <Button
                        style={Styles.optionsButtons}
                        textStyle={{color: 'white'}}
                        onPress={() => this.onBack()}>
                        Go Back
                    </Button>

                    <Button
                        style={Styles.optionsButtons}
                        textStyle={{color: 'white'}}
                        onPress={() => this.handlePress(CaregiverAssessment)}>
                        Take Assessment
                    </Button>
                </View>
            </View>
        );
    }

}

var Styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$colors.main',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  landingDate: {
    flex: 1,
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: '$fonts.family',
    padding: 10, 
    textAlign: 'center', 
    color: 'white'
  },
  landingBody: {
    flex: 1,
    fontSize: 20,
    fontFamily: '$fonts.family',
    padding: 10, 
    textAlign: 'center', 
    color: 'white'
  },
  optionsButtons: {
    backgroundColor: '$colors.answerSelectedBackground',
    borderColor: '$colors.answerSelectedBorder',
    paddingHorizontal: 10,
    marginHorizontal: 5,
  }
});