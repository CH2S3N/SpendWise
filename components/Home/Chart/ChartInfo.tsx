import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import CircularChart from './ExpenseChart';
import BigText from '@/components/Texts/BigText';
import IncomeChart from './IncomeChart ';
import { Divider } from '@rneui/base';

export default function ChartInfo() {
  return (
    <MainContainer>
     <View style={styles.header}>
      <Text style={styles.text}>Statistical Report</Text>
     </View>
     <BigText content='Expense Structure'/>
    <Divider/>
     <View style={styles.content}>
      <CircularChart/>
     </View>
     <BigText content='Income Structure'/>
     <Divider/>
     <View style={styles.content}>
      <IncomeChart/>
     </View>
     <Divider/>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30
  }
})
