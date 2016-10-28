'use strict'

import React, { Component } from 'react';
import {
  PropTypes,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'

var PatientTrendBar = require('./patientTrendBar').default

const barInterval = 2
const barItemTop = 16

export default class PatientTrend extends Component {

    constructor (props) {
        super(props)
        this.unitHeight = 3
    }
  /**
   * calculate lowest, highest, average, total of a froup of data
   * @params data{Array} indicatior{String}
   * @return {low, high, lowDate, highDate, avg, sum, count}
   */
    calculateLog (data) {
        console.log(data)
        const count = data.length
        let high = 10
        let low = 0
        let highDate = new Date(data[0].timestamp*1000)
        let lowDate = new Date(data[0].timestamp*1000)
        console.log(high,low,highDate,lowDate)
        let sum = 0

        let value
        data.forEach((d, index) => {
            value = d.level
            sum += value
            if (value < low) {
                low = value
                lowDate = new Date(data[index].timestamp*1000)
            } else if (value > high) {
                high = value
                highDate = new Date(data[index].timestamp*1000)
            }
        })
        return {
            low,
            high,
            count,
            sum,
            avg: sum / count,
            highDate,
            lowDate
        }
    }

    renderBars (data, high, low, color) {
        const {unitHeight} = this

        return data.map((value, index) => {
            return (
                <PatientTrendBar
                    key={index}
                    value={value}
                    high={high}
                    low={low}
                    color={color}
                    unitHeight={unitHeight}
                    date={new Date(this.props.data[index].timestamp*1000)}
                    barItemTop={barItemTop}
                    barInterval={barInterval} />
                )
            })
    }

    render () {
        const {data, color} = this.props
        if (data.length == 0) {
            return (<View/>)
        }
        const {unitHeight} = this
        const footData = this.calculateLog(data)
        console.log(footData)
        const scrollHeight = footData.high * unitHeight + Math.abs(footData.low) * unitHeight + barItemTop

        return (
            <View style={styles.container}>
                <Text style={styles.title}> Pain Score </Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    directionalLockEnabled
                    style={[styles.scrollView, {height: scrollHeight}]}>
                    {this.renderBars(data.map(d => d.level), footData.high, footData.low, color)}
                </ScrollView>
                <View style={styles.summary}>
                    <View style={styles.sumLeft}>
                        <Text style={styles.sumAvg}>{(footData.avg).toFixed(2)}</Text>
                        <Text style={styles.sumAvgLabel}>avg</Text>
                    </View>
                    <View style={styles.sumRight}>
                        <View style={styles.sumPolarItem}>
                            <Text style={styles.sumPolarLabel}>Highest:</Text>
                            <Text style={styles.sumPolarNumber}>{footData.high}</Text>
                            <Text style={styles.sumPolarLabel}>{': ' + footData.highDate.getMonth() + "-" + footData.highDate.getDay() + "-" + footData.highDate.getFullYear()}</Text>
                        </View>
                        <View style={styles.sumPolarItem}>
                            <Text style={styles.sumPolarLabel}>Lowest:</Text>
                            <Text style={styles.sumPolarNumber}>{footData.low}</Text>
                            <Text style={styles.sumPolarLabel}>{': ' + footData.lowDate.getMonth() + "-" + footData.lowDate.getDay() + "-" + footData.lowDate.getFullYear()}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  title: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600'
  },
  // Bar chart
  scrollView: {
    position: 'relative'
  },
  // Summary
  summary: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    marginTop: 20
  },
  sumLeft: {
    alignItems: 'flex-end',
    bottom: -4, // Why flex-end can't align them...
    flex: 1,
    flexDirection: 'row',
    position: 'relative'
  },
  sumAvg: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '200'
  },
  sumAvgLabel: {
    color: '#ffffff',
    marginLeft: 2,
    position: 'relative',
    top: -3
  },
  sumRight: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  sumPolarItem: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 2
  },
  sumPolarLabel: {
    color: '#ffffff',
    fontSize: 11,
    marginLeft: 3
  },
  sumPolarNumber: {
    color: '#ffffff',
    fontSize: 15,
    marginLeft: 3,
    position: 'relative',
    top: 1.5
  }
})
