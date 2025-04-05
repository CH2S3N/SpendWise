import { View, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import CircularChart from './ExpenseChart';
import BigText from '@/components/Texts/BigText';
import IncomeChart from './IncomeChart ';
import Overview from './Overview';
import Card from '@/components/ui/Card';
import { colors } from '@/constants/colors';

export default function ChartInfo() {
  return (
    <View style={styles.container}>
      <>
          <Card
          
          style={styles.overview}
          content={
            <>
              <View style={styles.title}>
                <BigText content='OVERVIEW'/>
              </View>
              <View style={styles.info}>
                <Overview/>
              </View>
            </>
          }/>
          <Card
          style={styles.content}
          content={
            <>
              <View style={styles.title}>
                <BigText content='EXPENSE STRUCTURE'/>
              </View>
              <View style={styles.info}>
                <CircularChart/>
              </View>
            </>
          }/>
          <Card
          style={styles.content}
          content={
            <>
              <View style={styles.title}>
                <BigText content='INCOME STRACTURE'/>
              </View>
              <View style={styles.info}>
                <IncomeChart/>
              </View> 
            </>
          }/>
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginHorizontal: 10,
    marginBottom:10
  },
  overview: {
    marginBottom:20,
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ligthGreen
  },
  content: {
    flex: 1,
    marginBottom:20,
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 4,
    borderTopWidth: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'

  }
})
