import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Colors from '../../constants/Colors'
import CircularChart from '../../components/Home/CircularChart'
import ExpenseSummary from '../../components/Home/ExpenseSummary'
import Goals from '../../components/Home/Goals'
import DailyBudget from '../../components/Home/DailyBudget'

export default function home() {
  return (
    <SafeAreaView style={styles.safeArea}>
        <Header/>
      <View style={styles.container}>
          <View style={styles.container1}>
            <View style={styles.item1}>
              <Goals />
            </View>
            <View style={styles.item2}>
              <DailyBudget />
            </View>
          </View>
          <View style={styles.item3}>
            <ExpenseSummary />
          </View>
          <View style={styles.item4}>
            <CircularChart />
          </View>
      </View>
    </SafeAreaView>
  )
}

const styles= StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.BACKGROUND,
    flex: 1,
    padding: 10,
    gap: 15,
    justifyContent: 'space-evenly'
  },
  container1: {
    columnGap: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15
  },
  item1: {
    backgroundColor:Colors.LIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15
  },
  item2: {
    backgroundColor:Colors.LIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15
  },
  item3: {
    backgroundColor:Colors.LIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'start',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15
  },
  item4: {
    backgroundColor:Colors.LIGHT,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15
  },
})