import React, { Component } from 'react';
import { ListView,
        TouchableOpacity,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        Dimensions,
        View, } from 'react-native';
import Swiper from 'react-native-swiper';
import store from 'react-native-simple-store';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';


import firebase from '../../config/firebase'
import Question from '../../components/genericQuestion';
import Header from '../../components/header';
import QuestionNavigationButton from '../../components/questionNavigationButton'
import ToggleButton from '../../components/toggleButton';



export default class Assessment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollViewEnabled: true,
            user: this.props.user,
            questionTypes: ["Pain", "Tiredness", "Nausea", "Depression", "Anxiety", "Drowsiness", "Appetite", "Shortness of Breath", "Caregiver"],
            databaseKey: null,
            assessmentObject: {
                date: this.formatDate(new Date()),
                submittedBy: this.props.user.id,
                results: {
                    Pain: {
                        value: 0,
                        medicationChange: 'none'
                    },
                    Tiredness: {
                        value: 1,
                        medicationChange: 'none'
                    },
                    Nausea: {
                        value: 2,
                        medicationChange: 'none'
                    },
                    Depression: {
                        value: 3,
                        medicationChange: 'none'
                    },
                    Anxiety: {
                        value: 4,
                        medicationChange: 'none'
                    },
                    Drowsiness: {
                        value: 5,
                        medicationChange: 'none'
                    },
                    Appetite: {
                        value: 6,
                        medicationChange: 'none'
                    },
                    ShortnessOfBreath: {
                        value: 7,
                        medicationChange: 'none'
                    },
                    Caregiver: {
                        value: 8
                    }
                }
            }
        };
        console.log("Object is: " + JSON.stringify(this.state.assessmentObject));
        console.log("User is: " + JSON.stringify(this.state.user));
    }

    saveAssessmentObject() {
        var serializedAssessment = JSON.stringify(this.state.assessmentObject);
        return store.save(this.state.assessmentObject.date.toString(), serializedAssessment)
            .then(json => console.log('Save success!'))
            .catch(error => console.log('Save error!'));
    }

    retrieveAssessmentObject(key) {
        return store.get(key)
            .then(req => JSON.parse(req))
            .then(json => console.log(json))
            .catch(error => console.log('Retrieval error!'));
    }

    generateDatabaseKey() {
        if (!this.state.databaseKey)
            this.state.databaseKey = firebase.database().ref().child('Patients').child(this.state.user.Patient).child('Assessments').push().key;
        return this.state.databaseKey;
    }

    saveAssessmentToFirebase() {
        var databaseKey = this.generateDatabaseKey();
        var updates = {};
        updates['Patients/' + this.state.user.Patient + '/Assessments/' + databaseKey] = this.state.assessmentObject;

        return firebase.database().ref().update(updates);
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

    removeSpacesAndCapitalize(questionType) {
        return questionType.replace(/\b\w/g, l => l.toUpperCase()).replace(/\s+/g, '');
    }

    onSlideComplete = (questionType, value) => {
        var newAssessmentObject = _.clone(this.state.assessmentObject);
        var sanitizedQuestionType = this.removeSpacesAndCapitalize(questionType);
        newAssessmentObject.results[sanitizedQuestionType].value = value;
        this.setState({assessmentObject: newAssessmentObject});

        this.saveAssessmentObject();
        this.saveAssessmentToFirebase();
    }

    onMedicationChange = (questionType, medicationChange) => {
        var newAssessmentObject = _.clone(this.state.assessmentObject);
        var sanitizedQuestionType = this.removeSpacesAndCapitalize(questionType);
        newAssessmentObject.results[sanitizedQuestionType].medicationChange = medicationChange;
        this.setState({assessmentObject: newAssessmentObject});

        this.saveAssessmentObject();
    }

    generateQuestions() {
        var assessmentQuestions = [];
        for (var i = 0; i < this.state.questionTypes.length; i++) {
            var currentQuestionType = this.state.questionTypes[i];
            var sanitizedQuestionType = this.removeSpacesAndCapitalize(currentQuestionType);
            var questionValue = this.state.assessmentObject.results[sanitizedQuestionType].value;
            var questionMedicationChange = this.state.assessmentObject.results[sanitizedQuestionType].medicationChange;
            assessmentQuestions.push(
                <Question
                    questionType={currentQuestionType}
                    value={questionValue}
                    medicationChange={questionMedicationChange}
                    onSlideComplete={this.onSlideComplete}
                    onMedicationChange={this.onMedicationChange}
                />
            );
        }
        return assessmentQuestions;
    }

    onBack() {
        this.props.navigator.pop()
    }


    render() {

        const backIcon = (<Icon name="angle-left" size={35} color="white" />);
        var assessmentQuestions = this.generateQuestions();

        return (
            <View style={{ backgroundColor: '#FFFFFF' }}>
                <Header 
                    text={"Assessment - " + this.state.assessmentObject.date} 
                    textStyle={{color: 'white'}} 
                    leftAction={this.onBack.bind(this)} 
                    leftIcon={backIcon}/> 
                <Swiper
                    horizontal={true}
                    loop={false}
                    showsButtons={true}
                    scrollEnabled={false}
                    buttonWrapperStyle={Styles.buttonWrapperStyle}
                    nextButton={<QuestionNavigationButton type='next'/>}
                    prevButton={<QuestionNavigationButton type='previous'/>}
                >
                    {assessmentQuestions}
                </Swiper>
            </View>
        );
    }
}

var Styles = EStyleSheet.create({
  buttonWrapperStyle: {
    backgroundColor: 'transparent', 
    flexDirection: 'row', 
    position: 'absolute', 
    paddingHorizontal: 30, 
    paddingVertical: 0, 
    top: 200, 
    left: 0, 
    flex: 1, 
    justifyContent: 'space-between', 
    alignItems: 'center'
  }
});