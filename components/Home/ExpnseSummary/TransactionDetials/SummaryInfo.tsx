import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import Essential from './Essentials';
import NonEssential from './NonEssentials';
import { Divider } from '@rneui/base';
import { Modal } from '@/components/Modal';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import AddExpense from '@/components/ui/AddExpense';


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
  
 
  return (
    <MainContainer>
      <View style={styles.container}>
        {/* Needs */}
        { essentialtx.length !== 0 && (
          <>
            <View style={styles.section}> 
              <View style={styles.tableheader}>
                  <Text style={styles.title}>Needs</Text>
              </View>
              <View style={styles.tablecontent}>
                <Essential
                  categories={categories}
                  transactions={transactions}
                />
              </View>
            </View>
            <Divider/>
          </>
        ) }
        {/* Wants */}
        {nonEssentialtx.length !== 0 && (
          <>
            <View style={styles.section}> 
              <View style={styles.tableheader}>
                  <Text style={styles.title}>Wants</Text>
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
      </View>
     


    </MainContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    gap: 10,
    paddingTop: 5
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
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
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
})
