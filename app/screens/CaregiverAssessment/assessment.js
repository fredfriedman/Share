import React, { Component } from 'react';
import { ListView,
        TouchableOpacity,
        TouchableHighlight,
        StyleSheet,
        Text,
        Alert,
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
import SubmitPage from './submit';
import CommentsPage from './comments';
import Header from '../../components/header';
import QuestionNavigationButton from '../../components/questionNavigationButton'
import ToggleButton from '../../components/toggleButton';



export default class Assessment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swiperHeight: 0,
            user: this.props.user,
            questionTypes: ["Pain", "Tiredness", "Nausea", "Depression", "Anxiety", "Drowsiness", "Appetite", "Shortness Of Breath", "Caregiver"],
            databaseKey: null,
            assessmentObject: {
                timestamp: new Date().getTime(), //change this to timestamp
                submittedBy: this.props.user.id,
                comments: null,
                ESAS: 0,
                Results: {
                    Pain: {
                        value: 0,
                        medicationChange: 'none'
                    },
                    Tiredness: {
                        value: 0,
                        medicationChange: 'none'
                    },
                    Nausea: {
                        value: 0,
                        medicationChange: 'none'
                    },
                    Depression: {
                        value: 0,
                        medicationChange: 'none'
                    },
                    Anxiety: {
                        value: 0,
                        medicationChange: 'none'
                    },
                    Drowsiness: {
                        value: 0,
                        medicationChange: 'none'
                    },
                    Appetite: {
                        value: 0,
                        medicationChange: 'none'
                    },
                    "Shortness Of Breath": {
                        value: 0,
                        medicationChange: 'none'
                    },
                    Caregiver: {
                        value: 0
                    }
                },
            }
        };
        console.log("Object is: " + JSON.stringify(this.state.assessmentObject));
        console.log("User is: " + JSON.stringify(this.state.user));
    }

    updateESAS() {
        var sum = 0;
        sum += this.state.assessmentObject.Results.Pain.value;
        sum += this.state.assessmentObject.Results.Tiredness.value;
        sum += this.state.assessmentObject.Results.Nausea.value;
        sum += this.state.assessmentObject.Results.Depression.value;
        sum += this.state.assessmentObject.Results.Anxiety.value;
        sum += this.state.assessmentObject.Results.Drowsiness.value;
        sum += this.state.assessmentObject.Results.Appetite.value;
        sum += this.state.assessmentObject.Results['Shortness Of Breath'].value;
        var newAssessmentObject = _.clone(this.state.assessmentObject);
        newAssessmentObject.ESAS = sum;

        this.setState({assessmentObject: newAssessmentObject});
        this.saveAssessmentObject();
    }

    saveAssessmentObject() {
        var serializedAssessment = JSON.stringify(this.state.assessmentObject);
        return store.save(this.state.assessmentObject.timestamp.toString(), serializedAssessment)
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
        var patientRef = firebase.database().ref().child('Patients').child(this.state.user.Patient);
        var patientId = this.state.user.Patient;
        var nurseRef = firebase.database().ref().child('Nurses').child(this.state.user.Nurse);
        var updates = {};
        updates['Patients/' + this.state.user.Patient + '/Assessments/' + databaseKey] = this.state.assessmentObject;

        var sumLastThree = 0;
        var lastAverage = patientRef.child('status');
        var lastThreeAssessments = [];

        firebase.database().ref().update(updates)
            .then(snap => {
                patientRef.child('Assessments').orderByChild("timestamp").limitToLast(3)
                    .on("child_added", function(snapshot) {
                        lastThreeAssessments.push(snapshot.val());
                        var databaseAssessmentObject = snapshot.val();
                        sumLastThree += databaseAssessmentObject.ESAS;
                        var average = sumLastThree / 3;
                        patientRef.child('status').set(average);

                        var critical = 8 * 10 * 0.7;
                        if (average > critical) {
                            nurseRef.child('Critical Patients').set({[patientId]: true});
                        } else {
                            nurseRef.child('Critical Patients').child(patientId).remove();
                        }
                        if (Math.abs(average - lastAverage) >= 10) {
                            nurseRef.child('RC Patients').set({[patientId]: true});
                        } else {
                            nurseRef.child('RC Patients').child(patientId).remove();
                        }
                        if (databaseAssessmentObject.Results.Caregiver.value >= 7) {
                            nurseRef.child('Distressed Patients').set({[patientId]: true});
                        } else {
                            nurseRef.child('RC Patients').child(patientId).remove();
                        }
                    });
            })
    }



    saveComments(text) {
        var newAssessmentObject = _.clone(this.state.assessmentObject);
        newAssessmentObject.comments = text;

        this.setState({assessmentObject: newAssessmentObject});
        this.saveAssessmentObject();
    }

    onSlideComplete = (questionType, value) => {
        var newAssessmentObject = _.clone(this.state.assessmentObject);
        newAssessmentObject.Results[questionType].value = value;
        
        this.setState({assessmentObject: newAssessmentObject});
        this.updateESAS();
    }

    onMedicationChange = (questionType, medicationChange) => {
        var newAssessmentObject = _.clone(this.state.assessmentObject);
        newAssessmentObject.Results[questionType].medicationChange = medicationChange;
        
        this.setState({assessmentObject: newAssessmentObject});
        this.updateESAS();
    }

    generateQuestions() {
        var assessmentQuestions = [];
        for (var i = 0; i < this.state.questionTypes.length; i++) {
            var currentQuestionType = this.state.questionTypes[i];

            var questionValue = this.state.assessmentObject.Results[currentQuestionType].value;
            var questionMedicationChange = this.state.assessmentObject.Results[currentQuestionType].medicationChange;

            assessmentQuestions.push(
                <Question
                    style={{flex: 1}}
                    questionType={currentQuestionType}
                    value={questionValue}
                    medicationChange={questionMedicationChange}
                    onSlideComplete={this.onSlideComplete.bind(this)}
                    onMedicationChange={this.onMedicationChange.bind(this)}
                />
            );
        }
        return assessmentQuestions;
    }

    generateAssessmentPages() {
        var assessmentPages = this.generateQuestions();
        assessmentPages.push(
            <CommentsPage
                saveComments={this.saveComments.bind(this)}
            />
        );
        assessmentPages.push(
            <SubmitPage
                saveAssessmentToFirebase={this.saveAssessmentToFirebase.bind(this)}
            />
        );
        return assessmentPages;
    }

    onBack() {
        Alert.alert(
            'Confirm Quit',
            "Are you sure you want to go back? Your assessment hasn't been submitted yet.",
            [
              {text: 'Cancel', onPress: () => console.log('Cancelled')},
              {text: 'Quit', onPress: () => this.props.navigator.pop()}
            ]
        )
    }


    render() {

        const backIcon = (<Icon name="angle-left" size={35} color="white" />);
        var assessmentPages = this.generateAssessmentPages();

        return (
            <View 
                style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <Header 
                    text={"Assessment - " + new Date(this.state.assessmentObject.timestamp).toLocaleDateString()} 
                    textStyle={{color: 'white'}} 
                    leftAction={this.onBack.bind(this)} 
                    leftIcon={backIcon}/> 
                <View
                    style={{ flex: 1 }}
                    onLayout={ (e) => {
                    var {x, y, width, height} = e.nativeEvent.layout;
                        this.setState({
                            swiperHeight: height
                        })}}> 
                    <Swiper
                        height={this.state.swiperHeight}
                        horizontal={true}
                        loop={false}
                        showsButtons={true}
                        scrollEnabled={false}
                        buttonWrapperStyle={Styles.buttonWrapperStyle}
                        nextButton={<QuestionNavigationButton type='next'/>}
                        prevButton={<QuestionNavigationButton type='previous'/>}
                        activeDot={<View style={{backgroundColor: '#FF9800', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                    >
                        {assessmentPages}
                        
                    </Swiper>
                </View>
            </View>
        );
    }
}

var Styles = EStyleSheet.create({
  buttonWrapperStyle: {
    backgroundColor: 'transparent', 
    flexDirection: 'row', 
    paddingHorizontal: 5, 
    paddingBottom: 15, 
    flex: 1, 
    justifyContent: 'space-between', 
    alignItems: 'flex-end'
  }
});