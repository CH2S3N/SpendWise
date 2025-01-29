import { StyleSheet, View } from 'react-native'
import React from 'react';
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