import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        Text,
        Image,
        Dimensions,
        View, } from 'react-native';
import Button from 'react-native-button';
import store from 'react-native-simple-store';
import firebase from '../../config/firebase'


const { width, height } = Dimensions.get('window');

var { backIcon, whiteGradient } = require('../../config/images')
var Header = require('../../components/header').default
var Slider = require('react-native-slider');
var Carousel = require('react-native-carousel');
var _ = require('lodash');
var Question = require('../../components/genericQuestion').default




export default class Assessment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollViewEnabled: true,
            user: this.props.user,
            questionTypes: ["Pain", "Tiredness", "Nausea", "Depression", "Anxiety", "Drowsiness", "Appetite", "Shortness of Breath", "Caregiver"],
            size: { width, height },
            databaseKey: null,
            assessmentObject: {
                date: this.formatDate(new Date()),
                caregiver: this.props.user.id,
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

        var assessmentQuestions = this.generateQuestions();

        return (
            <View style={{ backgroundColor: '#FFFFFF', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                <Header text={"Assessment"}/>
                <TouchableHighlight
                    onPress={()=>this.onBack()}
                    style={{position: 'absolute', width: 20, height: 20, top: 25, left: 15, backgroundColor: 'transparent'}}
                    underlayColor={'#f8f8f8'}>
                    <Image source={backIcon}/>
                </TouchableHighlight>
                <Carousel
                    width={this.state.size.width}
                    loop={false}
                    animate={false}
                    indicatorAtBottom={true}
                    indicatorOffset={50}
                    indicatorColor='#0097A7'
                    inactiveIndicatorColor='#B2EBF2'
                >
                    {assessmentQuestions}
                </Carousel>
            </View>
        );
    }
}
