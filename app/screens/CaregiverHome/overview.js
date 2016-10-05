import React, { Component } from 'react';
import { ListView,
        TouchableHighlight,
        StyleSheet,
        RecyclerViewBackedScrollView,
        Text,
        Image,
        View, } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class Overview extends Component {

    constructor() {
        super();
    }

    onPressAction(sectionID, rowID) {
        console.log("action")
    }

    onPressHeader() {

    }

    onPressPatient(patient) {
        this.props.navigator.push({
            component: PatientDetailView,
            backButtonTitle: 'Back',
            passProps: {
            patient: patient,
            }
        })
    }

    render() {
        return (
        <View style={{ backgroundColor: '#E9E9E9', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Header text={"Home"}/>
            <Grid>
            	<Row></Row>
            	<Row>
            		<Col></Col>
            		<Col></Col>
            	</Row>
            	<Row>
            		<Col></Col>
            		<Col></Col>
            	</Row>
            </Grid>
        </View>
        );
    }
}

var styles = StyleSheet.create({
});
