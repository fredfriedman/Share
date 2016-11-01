import { Platform, StyleSheet} from 'react-native';
import Dimensions from 'Dimensions';

var styles = require('../../config/styles')

module.exports = StyleSheet.create({
    accountLabel: {
        fontSize: 14,
        fontWeight: '300',
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
        backgroundColor: "#00BCD4"
    },
    formContainer: {
        marginTop: 5,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
    formContainerHoshi: {
        paddingTop: 20,
        width: Dimensions.get('window').width - 30,
    },
    homeButton: {
        marginTop: 10,
    },
    icon: {
        height: (Platform.OS === 'ios') ? 30 : 25,
		width: (Platform.OS === 'ios') ? 30 : 25,
    },
    KeyboardAvoidingViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    line: {
        marginTop: 5,
        flex: 0,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
        width: Dimensions.get('window').width - 20,
    },
    mainColor: {
        backgroundColor: '#00BCD4',
    },
    mainTextColor: {
        color: '#00BCD4',
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
        fontFamily: 'Helvetica',
        fontWeight: '100',
        fontSize: 16,
        color: '#44688E'
    },
    placeholderLabel: {
        fontSize: 12,
        fontWeight: '200',
        color: '#ffffff'
    },
    row: {
        width: Dimensions.get('window').width - 20
    },
    secondaryColor: {
        backgroundColor: '#f7f7f7',
    },
    secondaryTextColor: {
        color: '#f7f7f7',
    },
    signInBox: {
        //flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        height: 45,
        width: Dimensions.get('window').width,
        borderTopWidth: 1,
        paddingVertical: 4,
        borderTopColor: '#bdbdbd',
        backgroundColor: '#f7f7f7',
    },
    signInBoxButton: {
        justifyContent: 'center',
        marginRight: 5,
        width: 85,
        backgroundColor: "#00BCD4",
        borderRadius: 8,
        height: 27.5
    },
    submitButton: {
        borderRadius: 2.5,
        borderColor: 'transparent',
        borderWidth: 0.5,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#00BCD4',
        height: 30,
        width: Dimensions.get('window').width - 20,
        marginTop: 10,
    },
    submitLabel: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: '300',
        color: '#ffffff',
    },
    textInput: {
        width: Dimensions.get('window').width - 30,
        height: 35,
        color: '#44688E',
        fontSize: 16,
        fontWeight: '100',
        fontFamily: 'Helvetica',
        alignSelf: 'center',
        backgroundColor: 'transparent',

    },
    text: {

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
    transparent_button: {
        marginTop: 10,
        padding: 15
    },
    transparent_button_text: {
        color: '#0485A9',
        fontSize: 16
    },
    userTypeContainer: {
        height: 40,
        width: 400,
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
