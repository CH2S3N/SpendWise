import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import Essential from './Essentials';
import NonEssential from './NonEssentials';
import { Divider } from '@rneui/base';
import { colors } from '@/constants/colors';


export default function SummaryInfo() {
  const { categories, transactions } = useSelector(
    (state: RootState) => state.data
  );

  const essentialtx = transactions.filter(
    (transaction) =>
      categories.find((category) => category.id === transaction.category_id)?.type === 'Essential'
  );

  const nonEssentialtx = transactions.filter(
    (transaction) =>
      categories.find((category) => category.id === transaction.category_id)?.type === 'Non_Essential'
  );
  
  function calcEssentials() {
    return essentialtx.reduce((total, transaction) => {
      return total + (transaction.amount) || 0;

    }, 0)  

  };
  function calcNonEssentials() {
    return nonEssentialtx.reduce((total, transaction) => {
      return total + (transaction.amount) || 0;

    }, 0)  

  };
    
    return (
    <MainContainer>
      <View style={styles.container}>
        {/* Needs */}
        {transactions.length > 0 ? (
          <>
                  { essentialtx.length !== 0 && (
          <>
            <Divider/>
            <View style={styles.section}> 
              <View style={styles.tableheader}>
                <View style={styles.row}>
                  <Text style={styles.title}>Needs</Text>
                  <Text style={styles.title}>Total: {calcEssentials()}</Text>
                </View>
              </View>
              <View style={styles.tablecontent}>
                <Essential
                  categories={categories}
                  transactions={transactions}
                />
              </View>
            </View>
          </>
        ) }
        {/* Wants */}
        <Divider/>
        {nonEssentialtx.length !== 0 && (
          <>
            <View style={styles.section}> 
              <View style={styles.tableheader}>
              <View style={styles.row}>
                  <Text style={styles.title}>Wants</Text>
                  <Text style={styles.title}>Total: {calcNonEssentials()}</Text>
                </View>             
             </View>
              <View style={styles.tablecontent}>
                <NonEssential
                  categories={categories}
                  transactions={transactions}
                />
              </View>
            </View>
            <Divider/>
          </>
        )}
          </>
        ) : (
          <>
            <View style={styles.noData}>
            <Text style={styles.noDataTxt}>No Expense Data!</Text>
            <Text style={styles.titletext}>Please add some Expenses</Text>
            </View>
          </>
        )}


      </View>
     


    </MainContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    gap: 10,
    paddingTop: 5,    
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
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingBottom: 5,  
  },
  title: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: 15,
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  tablecontent: {
    flex: 10,
    flexDirection: 'row',
  },
  footer: {
    flex: 1,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
    
  },
  modalAddContent:{
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
  noData:{
    flex: 1,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataTxt:{
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.dark,
    fontSize: 30,
  },
  titletext:{
    fontWeight: 'bold',
    color: colors.dark,
    fontSize: 20,
  },
})
