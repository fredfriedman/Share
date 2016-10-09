import { StyleSheet} from 'react-native';
import Dimensions from 'Dimensions';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1da1f2',
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
    button: {
        borderRadius: 2.5,
        borderColor: 'transparent',
        borderWidth: 0.5,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#1da1f2',
        height: 30,
        width: Dimensions.get('window').width - 20,
        marginTop: 10,
    },
    SubmitLabel: {
        flex: 1,
        width: 230,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: '300',
        color: '#ffffff',
        paddingTop: 5
    },
    placeholderLabel: {
        fontSize: 12,
        fontWeight: '200',
        color: '#ffffff'
    },
    bottomLabel: {
        width: 400,
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 11,
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
});
