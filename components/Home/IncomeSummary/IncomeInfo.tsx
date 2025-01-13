import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { useFetchData } from '@/hooks/useFetchData';
import { useSQLiteContext } from 'expo-sqlite';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { Divider } from '@rneui/base';
import { Income, IncomeCategory } from '@/types';
import IncomeList from './IncomeList';


export default function IncomeInfo({
  updateIncome
}: {
  updateIncome(income: Income): Promise<void>;
}) {
    const { fetchData } = useFetchData();
    const db = useSQLiteContext();
    
    async function deleteIncome(id: number) {
      try {
        await db.withTransactionAsync(async () => {
          await db.runAsync('DELETE FROM Income WHERE id = ?;', [id]);
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
    
            </View>
            <View style={styles.tablecontent}>
              <IncomeList
                deleteIncome={deleteIncome}
                updateIncome={updateIncome}
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
