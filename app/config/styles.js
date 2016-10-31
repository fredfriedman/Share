import React from 'react';
import { Platform, StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
	icon: {
		height: (Platform.OS === 'ios') ? 30 : 25,
		width: (Platform.OS === 'ios') ? 30 : 25,
	},
	bottomNavBar: {
		height: (Platform.OS === 'ios') ? 49 : 49,
	},
	fonts: {
		fontFamily: (Platform.OS === 'ios') ? 'Helvetica Neue' : "Noto",
		fontSize: 12,
		color: '#C7C7CC',
	},
	listViewRow: {
		height: (Platform.OS === 'ios') ? 49 : 49,
	},
	primaryBackgroundColor: {
		backgroundColor: 'red'
	},
})
