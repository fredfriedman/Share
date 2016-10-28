import { StyleSheet} from 'react-native';
import Dimensions from 'Dimensions';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00BCD4',
    },
    navBar: {
        backgroundColor: 'transparent',
        height: 100,
    },
    body: {
        flex: 9,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    KeyboardAvoidingViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    formContainer: {
        marginTop: 5,
        width: Dimensions.get('window').width - 20,
    },
    line: {
        marginTop: 5,
        flex: 0,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
        width: Dimensions.get('window').width - 20,
    },
    textInput: {
        width: Dimensions.get('window').width - 30,
        height: 35,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        fontFamily: 'Helvetica',
        fontWeight: '100',
        fontSize: 11,
        color: 'black'
    },
    signInBox: {
        //flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        height: 45,
        width: Dimensions.get('window').width,
        borderTopWidth: 1,
        borderTopColor: '#bdbdbd',
        paddingVertical: 10,
        backgroundColor: '#f7f7f7',
    },
    button: {
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
    SubmitLabel: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: '300',
        color: '#ffffff',
    },
    placeholderLabel: {
        fontSize: 12,
        fontWeight: '200',
        color: '#ffffff'
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
    transparent_button: {
        marginTop: 10,
        padding: 15
    },
    transparent_button_text: {
        color: '#0485A9',
        fontSize: 16
    },
    primary_button: {
        margin: 10,
        padding: 15,
        backgroundColor: '#529ecc'
    },
    primary_button_text: {
        color: '#FFF',
        fontSize: 18
    },
    userTypeLabel: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '300',
        color: '#00BCD4',
        paddingTop: 15,
    }
});
