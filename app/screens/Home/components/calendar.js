import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    View
    } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Calendar from 'react-native-calendar';
import Header from '../../../components/header'
import moment from 'moment';

const customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const customMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
  'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class CalendarPage extends Component {

    constructor() {
        super();

        this.state = {
            selectedDate: moment().format(),
        };
    }

    onDateSelect() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    text={"Calendar"}
                    headerStyle={styles.header}
                    textStyle={styles.header_text}/>
                <Calendar
                    ref="calendar"
                    eventDates={['2016-07-03', '2016-07-05', '2016-07-28', '2016-07-30']}
                    events={[{date: '2016-07-04', hasEventCircle: {backgroundColor: 'powderblue'}}]}
                    scrollEnabled
                    showControls
                    dayHeadings={customDayHeadings}
                    monthNames={customMonthNames}
                    titleFormat={'MMMM YYYY'}
                    prevButtonText={'Prev'}
                    nextButtonText={'Next'}
                    onDateSelect={(date) => this.setState({ selectedDate: date })}
                    onTouchPrev={() => console.log('Back TOUCH')}     // eslint-disable-line no-console
                    onTouchNext={() => console.log('Forward TOUCH')}  // eslint-disable-line no-console
                    onSwipePrev={() => console.log('Back SWIPE')}     // eslint-disable-line no-console
                    onSwipeNext={() => console.log('Forward SWIPE')}  // eslint-disable-line no-console
                />
                <Text>Selected Date: {moment(this.state.selectedDate).format('MMMM DD YYYY')}</Text>
            </View>
            )
        }
    }

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: '$colors.status',
    },
    header_text: {
        color: '$colors.lightGray',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: "$fonts.family",
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
