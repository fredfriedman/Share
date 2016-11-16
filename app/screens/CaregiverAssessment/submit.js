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

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Submit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={Styles.container}>
                <View style={{height: height * 0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={Styles.submissionTitle}>
                        Congratulations!
                    </Text>
                </View>
                <View style={{height: height * 0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={Styles.submissionBody}>
                        You have completed the assessment! Please make sure your answers
                        are what you want them to be before submitting.
                    </Text>
                </View>
                <Button
                    style={Styles.submitButton}
                    textStyle={{color: 'white'}}
                    onPress={() => Alert.alert(
                        'Confirm Submission',
                        'Are you sure you want to submit your answers?',
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancelled')},
                          {text: 'Submit', onPress: () => this.props.saveAssessmentToFirebase()}
                        ]
                    )}>
                    Submit Answers
                </Button>
            </View>
        );
    }

}

var Styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  submissionTitle: {
    flex: 1,
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: '$fonts.family',
    padding: 10, 
    textAlign: 'center', 
    color: '$colors.main'
  },
  submissionBody: {
    flex: 1,
    fontSize: 20,
    fontFamily: '$fonts.family',
    padding: 10, 
    textAlign: 'center', 
    color: '$colors.main'
  },
  submitButton: {
    backgroundColor: '$colors.answerUnselectedBackground',
    borderColor: '$colors.answerUnselectedBorder',
    width: width * 0.5,
    alignSelf: 'center'
  }
});