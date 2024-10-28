import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import React from 'react';
import Header from '../components/Home/Header';
import Colors from '../constants/Colors'
import CircularChart from '../components/Home/CircularChart';
import ExpenseSummary from '../components/Home/ExpnseSummary/ExpenseSummary';
import Goals from '../components/Home/Goals';
import DailyBudget from '../components/Home/DailyBudget';
import AddTransaction from '../components/ui/AddTransaction';
import { Category, Transaction } from '@/types';
import { NavigationContainer } from '@react-navigation/native';

export default function home() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const db = useSQLiteContext();

  async function getData() {
    const result = await db.getAllAsync<Transaction>('SELECT * FROM Transactions');
    setTransactions(result);
    const categoriesResult = await db.getAllAsync<Category>('SELECT * FROM Categories');
    setCategories(categoriesResult);
  }

  async function insertTransaction(transaction: Transaction) {
    db.withTransactionAsync(async () => {
      await db.runAsync(
        `
        INSERT INTO Transactions (category_id, description, frequency, priotization, isfixedamount, amount, type) VALUES(?, ?, ?, ?, ?, ?, ?)
        `,
        [
          transaction.category_id,
          transaction.description,
          transaction.frequency,
          transaction.prioritization,
          transaction.isfixedamount,
          transaction.amount,
          transaction.type,
        ]
      );
      await getData();
    })
  }

  return (
      <SafeAreaView style={styles.safeArea}>
          <Header/>
          <View style={styles.container}>
              <View style={styles.container1}>
                <View style={styles.item}>
                  <Goals />
                </View>
                <View style={styles.item}>
                  <DailyBudget />
                </View>
              </View>
              <View style={styles.item}>
                <ExpenseSummary />
              </View>
              <View style={styles.item}>
                <CircularChart />
              </View>
          </View >

        <View style={styles.btn}>
          <AddTransaction insertTransaction={insertTransaction} />
        </View>
      </SafeAreaView>
  )
}


const styles= StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.BACKGROUND,
    flex: 1,
    padding: 10,
    gap: 15,
    justifyContent: 'space-evenly'
  },
  container1: {
    columnGap: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15
  },
  item: {
    backgroundColor:Colors.LIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15,

  },
  btn: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: 1,
    left: 0,
    right: 0
  }
})