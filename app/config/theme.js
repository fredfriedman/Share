import { Platform, StyleSheet} from 'react-native';
import Dimensions from 'Dimensions'

export default {

    colors: {
        main: '#00BCD4',      // Teal
        status: '#0097A7',  // Darker Teal
        secondary: '#f7f7f7', // Silver
        mainText: '#00BCD4',
        secondaryText: '#f7f7f7',
        button: 'green',
        header: 'red',
        navBar: '#E9E9E9',
        accent: '#FFC107',    //orange
        lightGray: '#ECEFF1',
        mediumGray: '#8E8E8E',
        darkGray: '#262626',

        critical: '#e50000',
        static: '#FFC107',
        improving: '#228B22',

        // Colors for the Caregiver overview buttons
        buttonBackground1: '#00BCD4',
        buttonBorder1: '#00ACC1',
        buttonBackground2: '#4DD0E1',
        buttonBorder2: '#26C6DA',
        
        // Colors for the assessment buttons
        answerUnselectedBackground: '#00BCD4',
        answerUnselectedBorder: '#00ACC1',
        answerSelectedBackground: '#FF9800',
        answerSelectedBorder: '#FB8C00',


    },

    dimensions: {
        iconSize: (Platform.OS === 'ios') ? 30 : 25,
        navBarHeight: (Platform.OS === 'ios') ? 60 : 60,
        rowHeight: (Platform.OS === 'ios') ? 49 : 49,
        hairlineWidth: StyleSheet.hairlineWidth,
        screenHeight: Dimensions.get('window').height,
        screenWidth: Dimensions.get('window').width,
    },

    fonts: {
        size: 14,
        weight: '400',
		family: (Platform.OS === 'ios') ? 'Helvetica Neue' : "Noto"
	}
}
