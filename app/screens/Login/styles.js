import { Platform, StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import EStyleSheet from 'react-native-extended-stylesheet';

module.exports = EStyleSheet.create({
    accountLabel: {
        fontSize: 14,
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
        paddingTop: 15,
    },
    body: {
        flex: 9,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    bottomLabel: {
        width: 400,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '300',
        color: '#ffffff',
        marginBottom: 20,
    },
    button: {
        width: Dimensions.get('window').width - 100,
        height: 45,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    centeredIcon: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        height: 35,
        width: 35,
        top: 20
    },
    container: {
        flex: 1,
        backgroundColor: '$colors.main'
    },
    formContainer: {
        marginTop: 5,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
    formContainerHoshi: {
        width: Dimensions.get('window').width - 30,
    },
    header: {
        borderColor: 'white',
        backgroundColor: 'white',
        width: '$dimensions.screenWidth'
    },
    icon: {
        height: '$dimensions.iconSize',
        width:  '$dimensions.iconSize'
    },
    line: {
        marginTop: 5,
        flex: 0,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '$colors.mediumGray',
        width: Dimensions.get('window').width - 20,
    },
    mainColor: {
        backgroundColor: '$colors.main',
    },
    mainText: {
        color: '$colors.mainText',
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
    navBar: {
        backgroundColor: 'transparent',
        height: 100,
    },
    passwordResetTextInput: {
        width: Dimensions.get('window').width - 30,
        height: 35,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        fontFamily: '$fonts.family',
        fontWeight: '$fonts.weight',
        fontSize: 16,
        color: '#44688E'
    },
    row: {
        width: Dimensions.get('window').width - 20
    },
    secondaryColor: {
        backgroundColor: '$colors.secondary',
    },
    secondaryText: {
        color: '$colors.secondaryText',
        fontSize: '$fonts.size',
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
    signInBox: {
        flexDirection: 'row',
        height: 45,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        backgroundColor: '$colors.secondary',
        paddingHorizontal: 5,
        borderTopWidth: 1,
        borderTopColor: '$colors.mediumGray',
    },
    signInBoxButton: {
        height: 27.5,
        width: 85,
        justifyContent: 'center',
        backgroundColor: "$colors.main",
        marginRight: 5,
        borderRadius: 8,
    },
    submitButton: {
        height: 30,
        width: Dimensions.get('window').width - 20,
        borderWidth: 0.5,
        borderRadius: 2.5,
        borderColor: 'transparent',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: "$colors.main",
        marginTop: 10,
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
    },
    textInput: {
        width: Dimensions.get('window').width - 30,
        height: 35,
        color: '#44688E',
        fontSize: 16,
        fontWeight: '$fonts.weight',
        fontFamily: '$fonts.family',
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    textHomeScreen: {
        marginLeft: 50,
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold'
    },
    topLeftLogo: {
        height: 50,
        width: 50,
        marginTop: 30,
        marginLeft: 30
    },
    userTypeContainer: {
        height: 40,
        width: '$dimensions.screenWidth',
        alignItems: 'center',
        backgroundColor: "#4DD0E1"
    },
    userTypeButton: {
        marginTop: -17.5,
        width: 150,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#00BCD4',
    },
});
