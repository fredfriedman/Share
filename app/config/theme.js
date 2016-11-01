import { Platform, StyleSheet} from 'react-native';

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

        critical: 'red',
        static: 'yellow',
        improving: 'green',

    },

    dimensions: {
        iconSize: (Platform.OS === 'ios') ? 30 : 25,
        navBarHeight: (Platform.OS === 'ios') ? 49 : 49,
        rowHeight: (Platform.OS === 'ios') ? 49 : 49,
        hairlineWidth: StyleSheet.hairlineWidth
    },

    fonts: {
        size: 14,
        weight: '400',
		family: (Platform.OS === 'ios') ? 'Helvetica Neue' : "Noto"
	}
}
