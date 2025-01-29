import { View, StyleSheet } from 'react-native'
import React from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { Divider } from '@rneui/base';
import IncomeList from './IncomeList';


export default function IncomeInfo() {


  return (
    <MainContainer>
      <Divider/>
      <View style={styles.container}>
          <View style={styles.section}> 
            <View style={styles.tableheader}>
    
            </View>
            <View style={styles.tablecontent}>
              <IncomeList/>
            </View>
          </View>
          <Divider/>
      </View>
     
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    gap: 10,
  },
  header: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  tableheader: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5
  
  },
  headertitle: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent:'center',
    paddingHorizontal: 5,
  },
  headertotal: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent:'center',
    paddingHorizontal: 5,
  },
  text: {
    fontWeight: 'bold'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25
  },
  tablecontent: {
    flex: 10,
    flexDirection: 'row',
  },
  footer: {
    flex: 1,
  }
})
