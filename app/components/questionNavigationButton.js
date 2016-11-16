import React, { Component } from 'react';
import { ListView,
        StyleSheet,
        Text,
        View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class QuestionNavigationButton extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.type == 'next') {
			return(
				<View
		            style={Styles.viewWrapperStyle}>

		            <Text style={{color: '#FFFFFF', backgroundColor: 'transparent', fontSize: 20}}>
		                Next
		            </Text>
		            <Icon 
		                style={{marginLeft: 10}}
		                name="angle-right"
		                size={20}
		                color='#FFFFFF'>
		            </Icon>
		            
		        </View>
	        );
	    } else if (this.props.type == 'previous') {
	    	return(
	    		<View
                    style={Styles.viewWrapperStyle}>

                    <Icon 
                        style={{marginRight: 10}}
                        name="angle-left"
                        size={20}
                        color='#FFFFFF'>
                    </Icon>
                    <Text style={{color: '#FFFFFF', backgroundColor: 'transparent', fontSize: 20}}>
                        Previous
                    </Text>

                </View>
	    	);
	    }
	}

}

var Styles = EStyleSheet.create({
  viewWrapperStyle: {
    borderRadius: 10, 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    paddingVertical: 5,
    backgroundColor: '$colors.main'
  }
});