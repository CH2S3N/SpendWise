import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { useFetchData } from '@/hooks/useFetchData';
import { useSQLiteContext } from 'expo-sqlite';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import Essential from './Essentials';
import NonEssential from './NonEssentials';
import { Transaction } from '@/types';
import { Divider } from '@rneui/base';


export default function SummaryInfo() {
  const { categories, transactions } = useSelector(
    (state: RootState) => state.data
  );
  const { fetchData } = useFetchData();
  const db = useSQLiteContext();
  
  async function deleteTransaction(id: number) {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM Transactions WHERE id = ?;', [id]);
        await fetchData();
      }); 
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  }

 

  return (
    <MainContainer>
      <Divider/>
      <View style={styles.container}>
          <View style={styles.section}> 
            <View style={styles.tableheader}>
              <View style={styles.headertitle}>
                <Text style={styles.title}>Needs</Text>
              </View>
            </View>
            <View style={styles.tablecontent}>
              <Essential
                categories={categories}
                transactions={transactions}
              />
            </View>
          </View>
          <Divider/>
          <View style={styles.section}> 
            <View style={styles.tableheader}>
              <View style={styles.headertitle}>
                <Text style={styles.title}>Wants</Text>
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
