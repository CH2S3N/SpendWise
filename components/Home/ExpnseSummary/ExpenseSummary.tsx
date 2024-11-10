import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Category, Transaction } from '../../../types';
import { useSQLiteContext } from 'expo-sqlite/next';
import TransactionList from './TransactionsList';



export default function ExpenseSummary() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  const db = useSQLiteContext();

  React.useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);

  async function getData() {
    const result = await db.getAllAsync<Transaction>('SELECT * FROM Transactions');
    setTransactions(result);
    const categoriesResult = await db.getAllAsync<Category>('SELECT * FROM Categories');
    setCategories(categoriesResult);
  }

  async function deleteTransaction(id:number) {
    db.withTransactionAsync(async () => {
      await db.runAsync('DELETE FROM Transactions WHERE id = ?;', [id])
      await getData();
    }) 
  }
  
  function calcTotalExpense() {
    return transactions.reduce((total, transaction) => {
      return total + (transaction.amount || 0);
    }, 0)
  }

  return (
    <View>
      <TransactionList categories={categories} transactions={transactions} deleteTransaction={deleteTransaction}/>
      <Text>Total Expense: {calcTotalExpense()}</Text>

    </View>
  )
}


