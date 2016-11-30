'use strict';

import React, { Component } from 'react';
import {
        AsyncStorage,
        Image,
        Text,
        TouchableHighlight,
        View,
    } from 'react-native';

import Header from '../../../components/header'
import Firebase from '../../../config/firebase'
import EStyleSheet from 'react-native-extended-stylesheet';
import SharedStyle from '../styles'
import { Col, Row, Grid } from "react-native-easy-grid";
import Platform from 'react-native'
import ImagePicker from 'react-native-image-picker'
// Assets
import Icon from 'react-native-vector-icons/Ionicons';

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            avatarSource: null,
        }

        this.nursePictureRef = this.getRef().child('Nurses/'+ props.user.id + '/Profile/')
    }

    getRef() {
        return Firebase.database().ref();
    }

    editPhoto() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
            skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                this.setState({
                    avatarSource: 'data:image/jpeg;base64,' + response.data
                });

                this.nursePictureRef.update({picture: 'data:image/jpeg;base64,' + response.data});

                var user = this.props.user
                user.Profile["picture"] = 'data:image/jpeg;base64,' + response.data

                AsyncStorage.setItem("user_data", JSON.stringify(user))
            }
        });
    }

    renderProfilePic() {
        const defaultImage = <Icon name="ios-contact" ios="ios-contact" md="ios-contact" size={150} color='#262626'/>

        return ( this.props.user.Profile.picture ?
            <View>
                <Image style={styles.profilePicture} source={{uri: this.props.user.Profile.picture, isStatic: true}}/>
                <View style={styles.overlay}>
                    <Text style={styles.overlayText}>Edit</Text>
                </View>
            </View>
         :
            <View>{ defaultImage }</View>
        )
    }

    render() {
        const messageIcon = (<Icon name="ios-create-outline" size={30} color="#f7f7f7" />);
        const emailIcon = (<Icon name="ios-mail-outline" size={30} color="#f7f7f7" />);
        const phoneIcon = (<Icon name="ios-call" ios="ios-call" md="ios-call" size={30} color="#f7f7f7" />);
        const mapIcon = (<Icon name="ios-map-outline" ios="ios-map-outline" md="ios-map-outline" size={30} color="#f7f7f7" />);

        const emailIcon1 = (<Icon name="ios-mail-outline" size={20} color="#00BCD4" />);
        const phoneIcon1 = (<Icon name="ios-call" ios="ios-call" md="ios-call" size={30} color="#00BCD4" />);

        return (
            <View style={SharedStyle.container}>
                <Header
                    text={"Profile"}
                    headerStyle={SharedStyle.header}
                    textStyle={SharedStyle.header_text}/>
                <View style={styles.topBox}>
                    <TouchableHighlight
                        onPress={this.editPhoto.bind(this)}
                        style={styles.profilePicture}
                        underlayColor={'transparent'}>
                        { this.renderProfilePic() }
                    </TouchableHighlight>
                    <Text style={[styles.text, {paddingTop: 10}]}>{this.props.user.Profile.name}</Text>
                    <Text style={[styles.text, {color: 'gray',fontSize: 12, paddingTop: 5}]}>{this.props.user.Profile.hospital}</Text>
                </View>
                <View style={styles.strip}>
                    <Grid>
                        <Row>
                            <Col style={{borderWidth: 0.5, borderColor: '#f7f7f7', justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableHighlight
                                    onPress={() => console.log()}
                                    style={styles.actionButton}
                                    underlayColor={'transparent'}>
                                    { emailIcon }
                                </TouchableHighlight>
                            </Col>
                            <Col style={{borderWidth: 0.5, borderColor: '#f7f7f7',  justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableHighlight
                                    onPress={() => console.log()}
                                    style={styles.actionButton}
                                    underlayColor={'transparent'}>
                                    { messageIcon }
                                </TouchableHighlight>
                            </Col>
                            <Col style={{borderWidth: 0.5, borderColor: '#f7f7f7',  justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableHighlight
                                    onPress={() => console.log()}
                                    style={styles.actionButton}
                                    underlayColor={'transparent'}>
                                    { mapIcon }
                                </TouchableHighlight>
                            </Col>
                            <Col style={{borderWidth: 0.5, borderColor: '#f7f7f7', justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableHighlight
                                    onPress={() => console.log()}
                                    style={styles.actionButton}
                                    underlayColor={'transparent'}>
                                    { phoneIcon }
                                </TouchableHighlight>
                            </Col>
                        </Row>
                    </Grid>
                </View>
                <Grid style={styles.bottomBox}>
                    <Row style={styles.row}>
                        <Col style={styles.column}>
                            { emailIcon1 }
                            <Text style={[styles.text, {paddingLeft: 10}]}>{this.props.user.email}</Text>
                        </Col>
                        <Col style={styles.column}>
                            { phoneIcon1 }
                            <Text style={[styles.text, {paddingLeft: 10,}]}>{this.props.user.Profile.phone}</Text>
                        </Col>
                    </Row>
                </Grid>
                <View style={{flex: 1, backgroundColor: '#f7f7f7'}}/>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,

    },
    bottomBox: {
        height: 20,
        paddingTop: 5,
        backgroundColor: '#f7f7f7'
    },
    box: {
        backgroundColor: '$colors.lightGray'
    },
    cell: {
        height: '$dimensions.rowHeight',
        width: '$dimensions.screenWidth',
        backgroundColor: 'white',
    },
    column: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicator: {
        width: 5,
        height: 50,
        borderRadius: 5,
        backgroundColor: 'orange',
    },
    label: {
        alignSelf: 'center',
        color: '$colors.darkGray',
    },
    listViewContainer: {

    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 40,
        height: 17.5,
        borderRadius: 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(247,247,247,0.6)'
    },
    overlayText: {
        color: '$colors.darkGray',
        fontSize: 10,
    },
    pageControl: {
        position:'absolute',
        left: 0,
        right: 0,
        bottom: 10
    },
    profilePicture: {
        height: 125,
        width: 125,
        borderRadius: 15,
    },
    row: {
        height: 20 ,
    },
    scrollView: {
        flex: 1,
        width: '$dimensions.screenWidth',
        backgroundColor: 'transparent',
    },
    separator: {
        flex: 1,
        height: '$dimensions.hairlineWidth',
        backgroundColor: '#8E8E8E'
    },
    strip: {
        backgroundColor: '$colors.main',
        height: 70
    },
    text: {
        color: '$colors.status',
        fontSize: 14,
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
    topBox: {
        height: 250,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
