import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {  useSelector } from 'react-redux';
import { RootState } from '@/state/store'; 
import TransactionList from './TransactionsList';



export default function ExpenseSummary() {
  const { categories, transactions } = useSelector(
    (state: RootState) => state.data
  );
  const essentialTransactions = transactions.filter(
    (transaction) =>
      categories.find((category) => category.id === transaction.category_id)?.type === 'Essential'
  );

  const nonEssentialTransactions = transactions.filter(
    (transaction) =>
      categories.find((category) => category.id === transaction.category_id)?.type === 'Non_Essential'
  );

  // Calculate the monthly amount
  function calcMonthAmount(transactions: typeof essentialTransactions) {
    return transactions.reduce((total, transaction) => {
      return (
        total + (transaction.amount * transaction.interval) || 0
      );
    }, 0);
  }

  const essentialMonthlyTotal = calcMonthAmount(essentialTransactions);
  const nonEssentialMonthlyTotal = calcMonthAmount(nonEssentialTransactions);

  return (
    <View style={styles.container}>
      <View style={styles.tableheader}>
        <View style={styles.tabletitle}>
          <Text style={styles.text}>Needs</Text>
          <Text style={styles.text}>Amount</Text>
        </View>
        <View style={styles.tabletitle}>
          <Text style={styles.text}>Wants</Text>
          <Text style={styles.text}>Amount</Text>
        </View>
      </View>
      <TransactionList
        categories={categories}
        transactions={transactions}
      />
      <View style={styles.tablefooter}>
        <View style={styles.footeritem}>
          <Text style={styles.text}>Total: ₱{essentialMonthlyTotal}</Text>
        </View >
        <View style={styles.footeritem}>
          <Text style={styles.text}>Total: ₱{nonEssentialMonthlyTotal}</Text>
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
    alignItems: 'flex-end',
    paddingHorizontal: 10
  },
  tabletitle: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  text: {
    fontWeight: 'bold',
   
  }
})