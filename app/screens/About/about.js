import React, { Component } from 'react';
import {
    ListView,
    Text,
    View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../../components/header';

export default class About extends Component {

    constructor() {
        super();

        this.dukeTeam = ["Aaron Liberatore", "Michael Lee", "Daniel Song"]
        this.cancerTeam = ["Jon Nicolla", "Arif Kamal", "Fred Friedman", "Tisha Broyles"]
    }

    /////////////////
    // Navigation //
    ////////////////

    onBack() {
        this.props.navigator.pop()
    }

    render() {
        const backIcon = (<Icon name="ios-arrow-back" ios="ios-arrow-back" md="md-arrow-back" size={30} color="#E7E7E7" />);

        return (
            <View style={styles.container}>
                <Header
                    text={""}
                    headerStyle={styles.header}
                    textStyle={styles.header_text}
                    leftAction={this.onBack.bind(this)}
                    leftIcon={backIcon}/>
                <View style={styles.textBox}>
                    <Text style={[styles.text, {fontSize: 20, fontWeight: 'bold'}]}>
                        About Us
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.line}/>
                        <Text style={[styles.text, {fontSize: 14, paddingTop: 5}]}> OUR STORY </Text>
                        <View style={styles.line}/>
                    </View>
                    <Text style={[styles.text, {paddingBottom: 20}]} multiline={true}>
                        Share creates a transparent, simple, and reliable communication channel between end­-of-­life patients, caregivers, and hospice nurses. By automating this communications process, Share aims to alleviate stress, save time for both caregivers and medical personnel, and give nurses the information they need to provide the best service possible.
                    </Text>

                    <Text style={[styles.text, {fontSize: 16, fontWeight: 'bold', paddingBottom: 10}]} multiline={true}>Special Thanks to </Text>
                    <Text style={[styles.text, {alignSelf: 'flex-start'}]}>Duke University</Text>
                    <Text style={[styles.text, {alignSelf: 'flex-start'}]}>Duke Cancer Institute</Text>
                    <Text style={[styles.text, {alignSelf: 'flex-start'}]}>Development Team:{"\n\t"}Aaron Liberatore '17{"\n\t"}Michael Lee '17{"\n\t"}Daniel Song '17</Text>
                    <Text style={[styles.text, {alignSelf: 'flex-start'}]}>Cancer Care Research Team:{"\n\t"}Jon Nicolla{"\n\t"}Arif Kamal{"\n\t"}Fred Friedman{"\n\t"}Tisha Broyles</Text>
                </View>
            </View>
        );
    }
}

var styles = EStyleSheet.create({
    container: {
        backgroundColor:'$colors.main',
        flex:1
    },
    header: {
        height: 60,
        backgroundColor: '$colors.main',
        borderColor: '$colors.main',
    },
    header_text: {
        color: '$colors.lightGray',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: '$fonts.family',
    },
    line: {
        width: 25,
        height: '$dimensions.hairlineWidth',
        backgroundColor: '$colors.lightGray',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
    },
    text: {
        color: '$colors.lightGray',
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
    textBox: {
        paddingLeft: 50,
        paddingRight: 50,
        alignItems: 'center',
    },

});
