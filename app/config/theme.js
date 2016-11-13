import { Platform, StyleSheet} from 'react-native';
import Dimensions from 'Dimensions'

export default {

    colors: {
        main: '#00BCD4',      // Teal
        status: '#0097A7',  // Darker Teal
        secondary: '#E7E7E7', // Silver
        mainText: '#00BCD4',
        secondaryText: '#f7f7f7',
        button: 'green',
        header: 'red',
        navBar: '#E9E9E9',
        accent: '#FFC107',    //orange
        lightGray: '#E7E7E7',
        mediumGray: '#8E8E8E',
        darkGray: '#2E2E2E',

        critical: '#e50000',
        static: '#FFC107',
        improving: '#228B22',

    },

    dimensions: {
        iconSize: (Platform.OS === 'ios') ? 30 : 25,
        navBarHeight: (Platform.OS === 'ios') ? 60 : 60,
        rowHeight: (Platform.OS === 'ios') ? 55 : 55,
        hairlineWidth: StyleSheet.hairlineWidth,
        screenHeight: Dimensions.get('window').width,
        screenWidth: Dimensions.get('window').width,
    },

    fonts: {
        size: 14,
        weight: '400',
		family: (Platform.OS === 'ios') ? 'Helvetica Neue' : "Noto"
	}
}
