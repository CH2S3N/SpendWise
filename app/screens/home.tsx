import { View,  StyleSheet, SafeAreaView, Modal, Text, Button, TouchableOpacity } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Home/Header';
import CircularChart from '../../components/Home/Chart/CircularChart';
import ExpenseSummary from '../../components/Home/ExpnseSummary/ExpenseSummary';
import Goals from '../../components/Home/Goal/Goals';
import DailyBudget from '../../components/Home/DailyBudget/DailyBudget';
import AddTransaction from '../../components/ui/AddTransaction';
import { Category, Goal, Transaction, User } from '@/types';
import GoalsInfo from '@/components/Home/Goal/GoalsInfo';
import DailyBudgetInfo from '@/components/Home/DailyBudget/DailyBudgetInfo';
import SummaryInfo from '@/components/Home/ExpnseSummary/SummaryInfo';
import ChartInfo from '@/components/Home/Chart/ChartInfo';
import InfoContainer from '@/components/Containers/InfoContainer';
import BigText from '@/components/Texts/BigText';
import Budget from '@/components/Home/Budget/Budget';
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setData, setError, setLoading } from '@/state/dataSlice';
import { colors } from '@/constants/colors';



export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, transactions, user, goals, loading, error } = useSelector(
    (state: RootState) => state.data
  );  // Access data from Redux store
  const db = useSQLiteContext();

  const [isGoalModalVisible, setGoalModalVisible] = useState(false);
  const [isDailyBudgetModalVisible, setDailyBudgetModalVisible] = useState(false);
  const [isSummaryModalVisible, setSummaryModalVisible] = useState(false);
  const [isChartModalVisible, setChartModalVisible] = useState(false);


  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(setLoading()); // Set loading state before fetching data
        
        const transactionResult = await db.getAllAsync<Transaction>('SELECT * FROM Transactions');
        const categoriesResult = await db.getAllAsync<Category>('SELECT * FROM Categories');
        const goalsResult = await db.getAllAsync<Goal>('SELECT * FROM Goals');
        const userResult = await db.getAllAsync<User>('SELECT * FROM User');
        console.log(user);
        // console.log(goals);
        // console.log(transactions);

        // Dispatch fetched data to Redux
        dispatch(
          setData({
            transactions: transactionResult,
            categories: categoriesResult,
            goals: goalsResult,
            user: userResult,
          })
        );
      } catch (error: any) {
        dispatch(setError(error.message || 'Failed to load data'));
      }
    };

    getData();
  }, [db, dispatch]);


// Handles the inserting of Expenses
  const insertTransaction = async (transaction: Transaction) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT INTO Transactions (category_id, description, frequency, prioritization, isfixedamount, amount, type) VALUES(?, ?, ?, ?, ?, ?, ?)`,
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
      // Reload data after inserting transaction
      const transactionResult = await db.getAllAsync<Transaction>('SELECT * FROM Transactions');
      dispatch(setData({ transactions: transactionResult, categories, goals, user }));
    });
  };

// Handles the inserting of Goal
  const insertGoal = async (goal: Goal) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT INTO Goals ( name, amount ) VALUES(?, ?)`,
        [
          goal.name,
          goal.amount,
        ]
      );

      // Reload data after inserting goal
      const goalResult = await db.getAllAsync<Goal>('SELECT * FROM Goals');
      dispatch(setData({ goals: goalResult, categories, transactions, user }));
    });
  };

// Handles the inserting of Budget
  const insertBudget = async (user: User,) => {
    await db.withTransactionAsync(async () => {

      await db.runAsync(
       `UPDATE User SET budget_Amount = ? WHERE id = ?`,
      [
        user.budget_Amount,

      ]
      );

      // Reload data after inserting goal
      const budgetResult = await db.getAllAsync<User>('SELECT * FROM User');
      dispatch(setData({ user: budgetResult, categories, transactions, goals }));
    });
  };

  // Return Function
  return (
      <View style={styles.maincontainer}>
          <Header/>
          <View style={styles.container}>
              <View>
                <Budget/>
              </View>
              <View style={styles.container1}>
                <InfoContainer
                  title={<BigText content="Goal"/>}
                  content={
                      <Goals/>
                    }
                />
                  <InfoContainer
                  title={<BigText content="Daily Budget"/>}
                  content={
                    <TouchableOpacity onPress={() => setDailyBudgetModalVisible(true)}>
                      <DailyBudget />
                    </TouchableOpacity>
                }
                />
 
              </View>
              
              <InfoContainer
                  title={<BigText content="Expense Summary"/>}
                  content={
                      <ExpenseSummary />
                  }
                />
              
              <InfoContainer
                  title={<BigText content="Chart"/>}
                  content={
                    <TouchableOpacity onPress={() => setChartModalVisible(true)}>
                      <CircularChart transactions={transactions} categories={categories}/>
                    </TouchableOpacity>
                  }
              />
          </View >

        <View style={styles.btn}>
          <AddTransaction insertTransaction={insertTransaction} insertGoal={insertGoal} insertBudget={insertBudget}/>
        
        </View>

        {/* PopUp Screen */}
        <Modal visible={isGoalModalVisible} >
          <View style={styles.container}>
            <GoalsInfo/>
            
            <Button 
              title='Back' 
              color= 'black'
              onPress={() => setGoalModalVisible(false)}
            />
          </View>
        </Modal>
        <Modal visible={isDailyBudgetModalVisible} >
          <View style={styles.container}>
            <DailyBudgetInfo/>
            <Button 
              title='Back' 
              color= 'black'
              onPress={() => setDailyBudgetModalVisible(false)}
            />
          </View>
        </Modal>
        <Modal visible={isSummaryModalVisible} >
          <View style={styles.container}>
            <SummaryInfo/>
            <Button 
              title='Back' 
              color='black'
              onPress={() => setSummaryModalVisible(false)}
            />
          </View>
        </Modal>
        <Modal visible={isChartModalVisible} >
          <View style={styles.container}>
            <ChartInfo/>
            <Button 
              title='Back' 
              color='black'
              onPress={() => setChartModalVisible(false)}
            />
          </View>
        </Modal>
      </View>


  )

}

const styles= StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  maincontainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 10,
    gap: 15,
    justifyContent: 'space-evenly',
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
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    padding: 10
  },
  btn: {
    position: 'absolute',
    bottom: 1,
    left: 10,
    right: 0,
    
  }
})