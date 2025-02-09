import { View, StyleSheet } from 'react-native'
import React from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import CircularChart from './ExpenseChart';
import BigText from '@/components/Texts/BigText';
import IncomeChart from './IncomeChart ';
import { Divider } from '@rneui/base';
import Overview from './Overview';

export default function ChartInfo() {
  return (
    <MainContainer>
    <Divider/>
     <BigText content='Overview'/>
     <View style={styles.overview}>
      <Overview/>
     </View>
    <Divider/>
     <BigText content='Expense Structure'/>
     <View style={styles.content}>
      <CircularChart/>
     </View>
     <Divider/>
     <BigText content='Income Structure'/>
     <View style={styles.content}>
      <IncomeChart/>
     </View>
     <Divider/>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  overview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30
  }
})
