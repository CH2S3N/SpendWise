import { View,  StyleSheet, Button, TouchableOpacity, StatusBar, Text } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import React, { useState } from 'react';
import CircularChart from '../../components/Home/Chart/ExpenseChart';
import ExpenseSummary from '../../components/Home/ExpnseSummary/ExpenseSummary';
import Goals from '../../components/Home/Goal/Goals';
import DailyBudget from '../../components/Home/DailyBudget/DailyBudget';
import AddTransaction from '../../components/ui/AddTransaction';
import { Goal, Income, Transaction, User } from '@/types';
import GoalsInfo from '@/components/Home/Goal/GoalsDetails.tsx/GoalsInfo';
import DailyBudgetInfo from '@/components/Home/DailyBudget/DailyBudgetInfo';
import SummaryInfo from '@/components/Home/ExpnseSummary/TransactionDetials/SummaryInfo';
import ChartInfo from '@/components/Home/Chart/ChartInfo';
import InfoContainer from '@/components/Containers/InfoContainer';
import BigText from '@/components/Texts/BigText';
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '@/state/dataSlice';
import MainContainer from '@/components/Containers/MainContainer';
import { Modal } from '@/components/Modal';
import { colors } from '@/constants/colors';
import Budget from '@/components/Home/Budget/totalIncome';
import IncomeInfo from '@/components/Home/IncomeSummary/IncomeInfo';
import calculateMonthlyAmount from '@/utils/calcMonthlyAmount';
import AntDesign from '@expo/vector-icons/AntDesign';
import MainModal from '@/components/Modal/MainModal';


export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, transactions, user, goals, incomes, incomeCategories } = useSelector(
    (state: RootState) => state.data
  );  // Access data from Redux store
  const db = useSQLiteContext();
  // console.log(incomeCategories)
  // console.log(categories)
  // console.log(incomes)
  // modals
  const [isGoalModalVisible, setGoalModalVisible] = useState(false);
  const [isIncomeInfoModalVisible, setIncomeInfoModalVisible] = useState(false);
  const [isDailyBudgetModalVisible, setDailyBudgetModalVisible] = useState(false);
  const [isSummaryModalVisible, setSummaryModalVisible] = useState(false);
  const [isChartModalVisible, setChartModalVisible] = useState(false);

  
  const insertIncome = async (income: Income) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT INTO Income (incomeCategoryId, description, frequency, amount, type) VALUES(?, ?, ?, ?, ?)`,
        [
          income.incomeCategoryId,
          income.description,
          income.frequency,
          income.amount,
          income.type,
        ]
      );
      
      // Reload data after inserting transaction
      const incomeResult = await db.getAllAsync<Income>('SELECT * FROM Income');
      dispatch(setData({ incomes: incomeResult, categories, incomeCategories, goals, user, transactions }));
    });
  };
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
      dispatch(setData({ transactions: transactionResult, categories, incomeCategories, goals, user, incomes }));
    });
  };
  const updateTransaction = async (transaction: Transaction) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `UPDATE Transactions SET category_id = ?, description = ?, frequency = ?, prioritization = ?, isfixedamount = ?, amount = ?, type = ?  WHERE id = ?`,
        [
          
          transaction.category_id,
          transaction.description,
          transaction.frequency,
          transaction.prioritization,
          transaction.isfixedamount,
          transaction.amount,
          transaction.type,
          transaction.id,
          
        ]
      );
      // Reload data after inserting transaction
      const transactionResult = await db.getAllAsync<Transaction>('SELECT * FROM Transactions');
      dispatch(setData({ transactions: transactionResult, categories, incomeCategories, goals, user, incomes }));
    });
  };
  const updateIncome = async (income: Income) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `UPDATE Income SET incomeCategoryId = ?, amount = ?, description = ?, frequency = ?, type = ?  WHERE id = ?`,
        [
          
          income.incomeCategoryId,
          income.amount,
          income.description,
          income.frequency,
          income.type,
          income.id,
          
          
        ]
      );
      // Reload data after inserting transaction
      const transactionResult = await db.getAllAsync<Income>('SELECT * FROM Income');
      dispatch(setData({ incomes: transactionResult, categories, incomeCategories, goals, user, transactions }));
    });
  };


  const insertGoal = async (goal: Goal) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT INTO Goals ( name, amount ) VALUES(?, ?)`,
        [
          goal.name,
          goal.amount,
          goal.currentAmount,
        ]
      );

      // Reload data after inserting goal
      const goalResult = await db.getAllAsync<Goal>('SELECT * FROM Goals');
      dispatch(setData({ goals: goalResult, categories, incomeCategories, transactions, user, incomes }));
    });
  };
  const updateGoal = async (goal: Goal) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `UPDATE Goals SET name = ?, amount = ?, currentAmount = ? WHERE id = ?`,
        [
          goal.name,
          goal.amount,
          goal.currentAmount,
          goal.id
        ]
      );

      // Reload data after inserting goal
      const goalResult = await db.getAllAsync<Goal>('SELECT * FROM Goals');
      dispatch(setData({ goals: goalResult, categories, incomeCategories, transactions, user, incomes }));
    });
  };




  // DELETE GOAL FUNCTION

//   const deleteGoal = async (goalId: number) => {
//     try {
//         // Start a transaction to delete the goal
//         await db.withTransactionAsync(async () => {
//             // Delete goal by ID
//             await db.runAsync("DELETE FROM Goals WHERE id = ?", [goalId]);

//             // Reload data after deleting the goal
//             const goalResult = await db.getAllAsync<Goal>('SELECT * FROM Goals');
//             dispatch(setData({ goals: goalResult, categories, incomeCategories, transactions, user, incomes }));
//         });
//     } catch (error) {
//         console.error("Error deleting goal:", error);
//     }
// };



// INSERT BUDGET FUNCTION
  // const insertBudget = async (user: User,) => {
  //   await db.withTransactionAsync(async () => {

  //     await db.runAsync(
  //      `UPDATE User SET budget_Amount = ? WHERE id = 1`,
  //     [
  //       user.budget_Amount,
  //     ]
  //     );

  //     // Reload data after inserting goal
  //     const budgetResult = await db.getAllAsync<User>('SELECT * FROM User');
  //     dispatch(setData({ user: budgetResult, categories, incomeCategories, transactions, goals, incomes }));
  //   });
  // };




  const essentialTransactions = transactions.filter(
    (transaction) =>
      categories.find((category) => category.id === transaction.category_id)?.type === 'Essential'
  );

  const nonEssentialTransactions = transactions.filter(
    (transaction) =>
      categories.find((category) => category.id === transaction.category_id)?.type === 'Non_Essential'
  );

  // Calculate the monthly amount using calculateMonthlyAmount
  function calcMonthAmount(transactions: typeof essentialTransactions) {
    return transactions.reduce((total, transaction) => {
      return (
        total +
        calculateMonthlyAmount(transaction.amount || 0, transaction.frequency || 'Monthly')
      );
    }, 0);
  }

  const essentialMonthlyTotal = calcMonthAmount(essentialTransactions);
  const nonEssentialMonthlyTotal = calcMonthAmount(nonEssentialTransactions);
  const totalExpenses = essentialMonthlyTotal + nonEssentialMonthlyTotal

  // Return Function
  return (
    <MainContainer>
      <StatusBar hidden/>
        {/* <Header/> */}
        <View style={styles.container}>
          <View style={styles.cardcon}>
            <View style={styles.cardIncome}>
              <TouchableOpacity onPress={() => setIncomeInfoModalVisible(true)}>
                <Text>Income: <Budget income={incomes}/></Text>   
              </TouchableOpacity>
            </View>
            <View style={styles.cardExpense}>
              <TouchableOpacity onPress={() => setSummaryModalVisible(true)}>
                <Text>Expense: {totalExpenses}</Text>
              </TouchableOpacity>
            </View>
          </View>
            <View style={styles.container1}>
              <InfoContainer
                header={
                  <TouchableOpacity onPress={() => setGoalModalVisible(true)}>
                    <BigText content="Goals"/>
                  </TouchableOpacity>
                  
                }
                content={
                    <Goals/>
                  }
              />
                <InfoContainer
                header={
                  <TouchableOpacity onPress={() => setDailyBudgetModalVisible(true)}>
                    <BigText content="Budget Plan"/>
                  </TouchableOpacity>
              }
                content={
                    <DailyBudget />
              }
              />
            </View>
            <InfoContainer
                header={
                  <TouchableOpacity onPress={() => setSummaryModalVisible(true)}>
                    <BigText content="Monthly Expense Summary"/>
                  </TouchableOpacity>
              }
                content={
                    <ExpenseSummary/>
                }
              />
            <InfoContainer
                header={
                  <TouchableOpacity onPress={() => setChartModalVisible(true)}>
                    <BigText content="Statistical Report"/>
                  </TouchableOpacity>
              }
                content={
                    <CircularChart/>
                }
            />
        </View >
      <View style={styles.btn}>
        <AddTransaction  insertTransaction={insertTransaction} insertGoal={insertGoal}  insertIncome={insertIncome}/>
      </View>

      {/* PopUp Screen */}
      {/* Income */}
      <Modal isOpen={isIncomeInfoModalVisible} >
        <View style={styles.modalcontainer}>
        <View style={styles.modalheader}>
            <View style={styles.icon}>
                <TouchableOpacity onPress={() => setIncomeInfoModalVisible(false)}>
                    <AntDesign name="leftcircle" size={24} color="black" />
                </TouchableOpacity>
            </View>
                <Text style={styles.title}>Income</Text>
        </View >
        <View style={styles.modalcontent}>
          <IncomeInfo updateIncome={updateIncome}/>
        </View>
        </View>
      </Modal>

      {/* Goal */}
      <Modal isOpen={isGoalModalVisible} >
        <View style={styles.modalcontainer}>
        <View style={styles.modalheader}>
            <View style={styles.icon}>
                <TouchableOpacity onPress={() => setGoalModalVisible(false)}>
                    <AntDesign name="leftcircle" size={24} color="black" />
                </TouchableOpacity>
            </View>
                <Text style={styles.title}>Goal</Text>
        </View >
        <View style={styles.modalcontent}>
          <GoalsInfo updateGoal={updateGoal}/>
        </View>
        </View>
      </Modal>

      {/* Budget Plan */}
      <Modal isOpen={isDailyBudgetModalVisible} >
        <View style={styles.modalcontainer}>
        <View style={styles.modalheader}>
            <View style={styles.icon}>
                <TouchableOpacity onPress={() => setDailyBudgetModalVisible(false)}>
                    <AntDesign name="leftcircle" size={24} color="black" />
                </TouchableOpacity>
            </View>
                <Text style={styles.title}>Budget Plan</Text>
        </View >
        <View style={styles.modalcontent}>
          <DailyBudget/>
        </View>
        </View>
      </Modal>

      {/* Expense Summary */}
      <Modal isOpen={isSummaryModalVisible} >
        <View style={styles.modalcontainer}>
        <View style={styles.modalheader}>
            <View style={styles.icon}>
                <TouchableOpacity onPress={() => setSummaryModalVisible(false)}>
                    <AntDesign name="leftcircle" size={24} color="black" />
                </TouchableOpacity>
            </View>
                <Text style={styles.title}>Expense</Text>
        </View >
        <View style={styles.modalcontent}>
          <SummaryInfo updateTransaction={updateTransaction}/>
        </View>
        </View>
      </Modal>

      {/* Statistics */}
      <Modal isOpen={isChartModalVisible} >
        <View style={styles.modalcontainer}>
        <View style={styles.modalheader}>
            <View style={styles.icon}>
                <TouchableOpacity onPress={() => setChartModalVisible(false)}>
                    <AntDesign name="leftcircle" size={24} color="black" />
                </TouchableOpacity>
            </View>
                <Text style={styles.title}>Statistics</Text>
        </View >
        <View style={styles.modalcontent}>
          <ChartInfo/>
        </View>
        </View>
      </Modal>

    </MainContainer>
  )

}



const styles= StyleSheet.create({
  safeArea: {
    flex: 1,
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
    bottom: 10,
    left: 10,
    right: 10,
    
  },
  cardIncome: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#73EC8B',
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    padding: 10,
    marginHorizontal: 5
  },
  cardExpense: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#F5004F',
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    padding: 10,
    marginHorizontal: 5
  },
  cardcon: {
    alignItems: 'center',
    justifyContent:'center',
    width: '100%',
    flexDirection: 'row',
  },
  modalcontainer:{
    flex:1,
    paddingHorizontal: 10
  },
  modalheader:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  modalcontent:{
    flex:10,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  icon:{
    paddingRight: 10
  },
  title:{
    fontSize: 20,
    fontWeight:'bold'
  }
})