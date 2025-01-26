import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import Budget from '../Budget/totalIncome';
import ExpenseChart from './ExpenseChart';

const Summary = () => {
  return (
   <View style={styles.container}>
       <ExpenseChart/>
   </View>
  )
}

export default Summary

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
    },
  
})