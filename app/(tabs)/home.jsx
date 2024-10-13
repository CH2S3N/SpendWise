import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Colors from '../../constants/Colors'
import CircularChart from '../../components/CircularChart'
import ExpenseSummary from '../../components/ExpenseSummary'
import Goals from '../../components/Goals'
import DailyBudget from '../../components/DailyBudget'

export default function home() {
  return (
    <View style={{
      padding: 20,
      backgroundColor:Colors.PRIMARY,
      height: 150,
      }}>
      <Header/>
      <View>
        <View>
          <Goals style={styles.item1} />
          <DailyBudget style={styles.item2}/>
        </View>
        <ExpenseSummary/>
        <CircularChart/>

      </View>
    </View>
  )
}

const styles= StyleSheet.create({
  item1: {
    flexGrow: 1
  },
  item2: {
    flexGrow: 1
  }
})