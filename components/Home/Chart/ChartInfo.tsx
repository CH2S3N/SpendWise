import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import CircularChart from './CircularChart';
import { Divider } from '@rneui/base';

export default function ChartInfo() {
  return (
    <MainContainer>
     <View style={styles.header}>
      <Text style={styles.text}>Statistical Report</Text>
     </View>
     <Divider/>
     <View style={styles.content}>
      <CircularChart/>
     </View>
     <Divider/>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 5,
    paddingTop: 20
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
