import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        Alert,
        Dimensions,
        TextInput,
        View, } from 'react-native';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: this.props.text
        };
    }

    render() {
        return(
            <View style={Styles.container}>
                <View style={{height: height * 0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={Styles.submissionBody}>
                        Are there any comments you would like to add before you submit?
                    </Text>
                </View>
                <View style={{height: height * 0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <TextInput 
                        style={Styles.submissionBody}
                        placeholder="Tap here to type"
                        placeholderTextColor="FF9800"
                        onChangeText={(text) => {
                            this.setState({text: text});
                            this.props.saveComments(text);
                        }}>
                    </TextInput>
                </View>
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
  textInputStyle: {
    flex: 1,
    fontFamily: '$fonts.family',
    padding: 10, 
    textAlign: 'center', 
    borderColor: '$colors.answerSelectedBackground'
  },
  submissionBody: {
    flex: 1,
    fontSize: 20,
    fontFamily: '$fonts.family',
    padding: 10, 
    textAlign: 'center', 
    color: '$colors.main'
  }
});