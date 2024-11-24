// src/components/Home/ExpenseSummary.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {  useSelector } from 'react-redux';
import { RootState } from '@/state/store'; 
import TransactionList from './TransactionsList';


export default function ExpenseSummary() {
  const { categories, transactions, loading, error } = useSelector(
    (state: RootState) => state.data
  );
  // Calculate the total expense
  function calcTotalEssential() {
    return essentialTransactions.reduce((total, transaction) => {
      return total + (transaction.amount || 0);
    }, 0);
  }
  function calcTotalNonEssential() {
    return nonEssentialTransactions.reduce((total, transaction) => {
      return total + (transaction.amount || 0);
    }, 0);
  }
  // If loading, show a loading text
  if (loading) {
    return <Text>Loading...</Text>;
  }
  // If error occurs, display error message
  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const essentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
);
const nonEssentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential"
);

  return (
    <View style={styles.container}>
      <View style={styles.tableheader}>
        <View style={styles.tabletitle}>
          <Text style={styles.text}>Essentials</Text>
          <Text style={styles.text}>Amount</Text>
        </View>
        <View style={styles.tabletitle}>
          <Text style={styles.text}>Non Essentials</Text>
          <Text style={styles.text}>Amount</Text>
        </View>
      </View>
      <TransactionList
        categories={categories}
        transactions={transactions}
      />
      <View style={styles.tablefooter}>
        <View style={styles.footeritem}>
          <Text style={styles.text}>Total Expense: ₱{calcTotalEssential()}</Text>
        </View >
        <View style={styles.footeritem}>
          <Text style={styles.text}>Total Expense: ₱{calcTotalNonEssential()}</Text>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
    justifyContent: 'space-between'
  },
  text: {
    fontWeight: 'bold'
  }
})