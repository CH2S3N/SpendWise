import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import React from 'react';
import Header from '../../components/Home/Header';
import Colors from '../../constants/Colors'
import CircularChart from '../../components/Home/CircularChart';
import ExpenseSummary from '../../components/Home/ExpnseSummary/ExpenseSummary';
import Goals from '../../components/Home/Goals';
import DailyBudget from '../../components/Home/DailyBudget';
import AddTransaction from '../../components/ui/AddTransaction'
import { Category, Transaction } from '@/types';

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
            <View style={styles.item1}>
              <Goals />
            </View>
            <View style={styles.item2}>
              <DailyBudget />
            </View>
          </View>
          <View style={styles.item3}>
            <ExpenseSummary />
          </View>
          <View style={styles.item4}>
            <CircularChart />
          </View>
      </View>
      <AddTransaction insertTransaction={insertTransaction}/>
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
  item1: {
    backgroundColor:Colors.LIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15
  },
  item2: {
    backgroundColor:Colors.LIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15
  },
  item3: {
    backgroundColor:Colors.LIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15
  },
  item4: {
    backgroundColor:Colors.LIGHT,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15
  },
})