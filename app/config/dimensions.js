import { Platform } from 'react-native';

module.exports = {
	dimensions: {
		iconSize: (Platform.OS === 'ios') ? 30 : 25,
	    tabBarHeight: (Platform.OS === 'ios') ? 49 : 49,
		rowHeight: (Platform.OS === 'ios') ? 49 : 49,
	},
	fonts: {
		fontFamily: (Platform.OS === 'ios') ? 'Helvetica Neue' : "Noto",
		fontSize: 12,
		color: '#C7C7CC',
	},
}
