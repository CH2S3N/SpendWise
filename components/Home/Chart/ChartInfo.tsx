import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import CircularChart from './CircularChart';
import { Divider } from '@rneui/base';
import BigText from '@/components/Texts/BigText';
import IncomeChart from './IncomeChart ';

export default function ChartInfo() {
  return (
    <MainContainer>
     <View style={styles.header}>
      <Text style={styles.text}>Statistical Report</Text>
     </View>
     <Divider/>
     <BigText content='Expense By Category'/>
     <View style={styles.content}>
      <CircularChart/>
     </View>
     <Divider/>
     <BigText content='Income By Category'/>
     <View style={styles.content}>
      <IncomeChart/>
     </View>
     <Divider/>
     <BigText content='Future Prediction'/>
     <View style={styles.content}>
     <Text>Content</Text>
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
