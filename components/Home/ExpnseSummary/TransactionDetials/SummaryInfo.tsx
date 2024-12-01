import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { useFetchData } from '@/hooks/useFetchData';
import { useSQLiteContext } from 'expo-sqlite';
import TransactionList from './../TransactionsList';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import Essential from './Essentials';
import NonEssential from './NonEssentials';
import { Transaction } from '@/types';

export default function SummaryInfo({
  updateTransaction
}: {
  updateTransaction(transaction: Transaction): Promise<void>;
}) {
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

  function calcTotalEssential() {
    return essentialTransactions.reduce((total, transaction) => {
      return total + (transaction.amount || 0);
    }, 0);
  };
  function calcTotalNonEssential() {
    return nonEssentialTransactions.reduce((total, transaction) => {
      return total + (transaction.amount || 0);
    }, 0);
  };

  const essentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
);
const nonEssentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential"
);

  return (
    <MainContainer>
      <View style={styles.header}>
        <Text>Header</Text>
      </View>
      <View style={styles.container}>
          <View style={styles.section}> 
            <View style={styles.tableheader}>
                <View style={styles.tabletitle}>
                  <Text>Name</Text>
                  </View>
                <View style={styles.tabletitle}>
                  <Text>Frequency</Text>
                  </View>
                <View style={styles.tabletitle}>
                  <Text>Priority</Text>
                  </View>
                <View style={styles.tabletitle}>
                  <Text>Amount</Text>
                  </View>
            </View>
            <View style={styles.tablecontent}>
              <Essential
                categories={categories}
                transactions={transactions}
                deleteTransaction={deleteTransaction}
                updateTransaction={updateTransaction}
              />
            </View>
            <View style={styles.footer}>
            <Text style={styles.text}>Total Expense: ₱{calcTotalEssential()}</Text>
            </View>
          </View>
          <View style={styles.section}> 
            <View style={styles.tableheader}>
                <View style={styles.tabletitle}>
                  <Text>Name</Text>
                  </View>
                <View style={styles.tabletitle}>
                  <Text>Frequency</Text>
                  </View>
                <View style={styles.tabletitle}>
                  <Text>Priority</Text>
                  </View>
                <View style={styles.tabletitle}>
                  <Text>Amount</Text>
                  </View>
            </View>
            <View style={styles.tablecontent}>
              <NonEssential
                categories={categories}
                transactions={transactions}
                deleteTransaction={deleteTransaction}
                updateTransaction={updateTransaction}

              />
            </View>
            <View style={styles.footer}>
            <Text style={styles.text}>Total Expense: ₱{calcTotalNonEssential()}</Text>
            </View>
          </View>
      </View>
     
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
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
    
  },
  tabletitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold'
  },
  tablecontent: {
    flex: 10,
    flexDirection: 'row',
  },
  footer: {
    flex: 1,
  }
})
