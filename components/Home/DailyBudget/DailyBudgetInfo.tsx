import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MainContainer from '@/components/Containers/MainContainer';

export default function DailyBudgetInfo() {
  return (
    <MainContainer>
     <View style={styles.header}>
      <Text>Header</Text>
     </View>
     <View style={styles.container}>
      <View style={styles.item}> 
        <Text>
          Content: Inprogreass Goals
        </Text></View>
     </View>
     
      {/* <InfoContainer 
      header={
        <Text>Fullfilled Goals</Text>
      }
      content={
        <Text>Content</Text>
      }/>
      <InfoContainer 
      header={
        <Text>Fullfilled Goals</Text>
      }
      content={
        <Text>Content</Text>
      }/> */}
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: 'green',
    padding: 5
  },
  header: {
    flex:1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    flex: 1,
    backgroundColor: 'orange',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
