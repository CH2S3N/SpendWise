import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { useFetchData } from '@/hooks/useFetchData';
import { useSQLiteContext } from 'expo-sqlite';
import TransactionList from './TransactionsList';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export default function SummaryInfo() {
  const { categories, transactions, loading, error } = useSelector(
    (state: RootState) => state.data
  );
  const { fetchData } = useFetchData();
  const db = useSQLiteContext();
  useEffect(() => {
    fetchData();
  }, []); 
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
      <View style={styles.header}>
        <Text>Header</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.item}> 
          <View style={styles.tableheader}>
            <View style={styles.tabletitle}>
              <Text style={styles.tabletitle1}>Name</Text>
              <Text style={styles.tabletitle2}>Amount</Text>
            </View>
          </View>
          <View style={styles.tablecontent}>
            <TransactionList
              categories={categories}
              transactions={transactions}
            />
          </View>
        </View>
          <View style={styles.item}> 
          <Text>
            Content: Inprogreass Goals
          </Text>
        </View>
      </View>
     
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
    alignItems: 'center'
  },
  tableheader: {
    flexDirection: 'row'
  },
  tablefooter: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
   
  },
  footeritem: {
    flex: 1,
    paddingHorizontal: 10
  },
  tabletitle: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  tabletitle1: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-start'
  },
  tabletitle2: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-start'
  },
  text: {
    fontWeight: 'bold'
  },
  tablecontent: {
    flexDirection: 'row'
  }
})
