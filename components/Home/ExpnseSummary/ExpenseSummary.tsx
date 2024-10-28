import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import { Category, Transaction } from '../../../types';
import { useSQLiteContext } from 'expo-sqlite/next';
import TransactionList from './TransactionsList';
import Card from '@/components/ui/Card';


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

  return (
    <View style={styles.container}>
        <View style={styles.title}>
          <Text>Expense Summary</Text>
        </View>
        <View style={styles.content}>  
              <TransactionList categories={categories} transactions={transactions} deleteTransaction={deleteTransaction}/>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingTop: 5,
      paddingHorizontal:10
    },
    title: {
      alignItems: 'center'
    },
    content: {
      paddingVertical: 5
    }
})