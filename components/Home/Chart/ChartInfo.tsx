import { View, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import CircularChart from './ExpenseChart';
import BigText from '@/components/Texts/BigText';
import IncomeChart from './IncomeChart ';
import { Divider } from '@rneui/base';
import Overview from './Overview';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ChartInfo() {
  const [isOverview, setOverview] = useState(false);
  return (
    <MainContainer style={{paddingLeft: 1243132}}>
    {isOverview === false && (
      <>
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
      </>
    )}
    {isOverview === true && (
      <>
        <Divider/>
        <TouchableOpacity onPress={() => setOverview(false)}>
          <BigText content='Overview'/>
        </TouchableOpacity>
      
        <Divider/>
      </>
    )}
    
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
