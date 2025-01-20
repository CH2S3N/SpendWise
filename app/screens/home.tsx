import { View,  StyleSheet, Button, TouchableOpacity, StatusBar, Text } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import React, { useState } from 'react';
import CircularChart from '../../components/Home/Chart/ExpenseChart';
import ExpenseSummary from '../../components/Home/ExpnseSummary/ExpenseSummary';
import Goals from '../../components/Home/Goal/Goals';
import AddTransaction from '../../components/ui/AddTransaction';
import GoalsInfo from '@/components/Home/Goal/GoalsDetails.tsx/GoalsInfo';
import SummaryInfo from '@/components/Home/ExpnseSummary/TransactionDetials/SummaryInfo';
import ChartInfo from '@/components/Home/Chart/ChartInfo';
import InfoContainer from '@/components/Containers/InfoContainer';
import BigText from '@/components/Texts/BigText';
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '@/components/Containers/MainContainer';
import { Modal } from '@/components/Modal';
import { colors } from '@/constants/colors';
import Budget from '@/components/Home/Budget/totalIncome';
import IncomeInfo from '@/components/Home/IncomeSummary/IncomeInfo';
import calculateMonthlyAmount from '@/utils/calcMonthlyAmount';
import AntDesign from '@expo/vector-icons/AntDesign';
import BudgetPlan from '@/components/Home/BudgetPlan/BudgetPlan';
import BudgetPlanInfo from '@/components/Home/BudgetPlan/BudgetPlanInfo';
import styles from '@/components/Home/styles';



export default function Home() {
  const { categories, transactions, incomes } = useSelector(
    (state: RootState) => state.data
    
  );  // Access data from Redux store
  const db = useSQLiteContext();

  // modals
  const [isGoalModalVisible, setGoalModalVisible] = useState(false);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isIncomeInfoModalVisible, setIncomeInfoModalVisible] = useState(false);
  const [isDailyBudgetModalVisible, setDailyBudgetModalVisible] = useState(false);
  const [isSummaryModalVisible, setSummaryModalVisible] = useState(false);
  const [isChartModalVisible, setChartModalVisible] = useState(false);

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
    <>
    <MainContainer>
      <>
        <View style={styles.container}>
          {/* Income & Expense */}
          <View style={styles.btnContainer}>
              <TouchableOpacity onPress={() => setIncomeInfoModalVisible(true)} style={styles.btnIncome}>
                <AntDesign name="pluscircle" size={20} color="white" style={{ paddingRight: 10}}/>
                <Text style={styles.btnTxt}>INCOME: <Budget/></Text>   
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSummaryModalVisible(true)} style={styles.btnExpense}>
                <AntDesign name="minuscircle" size={20} color="white" style={{ paddingRight: 10}}/>
                <Text style={styles.btnTxt}>EXPENSE: {totalExpenses}</Text>
              </TouchableOpacity>
          </View>
          <>
            {/* Goals & Budget Plan */}
            <View style={styles.container1}>
              {/* Goals */}
              <InfoContainer
                header={
                  <TouchableOpacity onPress={() => setGoalModalVisible(true)}>
                    <BigText content="GOALS"/>
                  </TouchableOpacity>
                }
                content={<Goals/>}
              />
              {/* Budget Plan */}
                <InfoContainer
                header={
                  <TouchableOpacity onPress={() => setDailyBudgetModalVisible(true)}>
                    <BigText content="BUDGET PLAN"/>
                  </TouchableOpacity>
              }
                content={<BudgetPlan/>}
              />
            </View>

            {/* Summary */}
            <InfoContainer
                header={
                  <TouchableOpacity onPress={() => setSummaryModalVisible(true)}>
                    <BigText content="SUMMARY"/>
                  </TouchableOpacity>
                }
                content={<ExpenseSummary/>}
              />

            {/* Statistics */}
            <InfoContainer
              header={
                <TouchableOpacity onPress={() => setChartModalVisible(true)}>
                  <BigText content="STATISTICS"/>
                </TouchableOpacity>
              }
              content={<CircularChart/>}
            />
          </>
        </View >

        {/* Add Transaction Button */}
        <View style={styles.btn}>
          <TouchableOpacity
              onPress={() => setIsAddingTransaction(true)}
              activeOpacity={0.5}
            >
              <AntDesign name="pluscircle" size={60} color={colors.dark} />
            </TouchableOpacity>
        </View>
      </>

      {/* PopUp Screen */}
      <>        
        {/* Add Transaction */}
        <Modal isOpen={isAddingTransaction} transparent={true} >
          <View style={styles.modalAddContent}>
              <AddTransaction setIsAddingTransaction={setIsAddingTransaction} />
          </View>
        </Modal>

        {/* Income */}
        <Modal isOpen={isIncomeInfoModalVisible} >
          <View style={styles.modalcontainer}>
          <View style={styles.modalheader}>
              <View style={styles.icon}>
                  <TouchableOpacity onPress={() => setIncomeInfoModalVisible(false)}>
                      <AntDesign name="leftcircle" size={24} color="black" />
                  </TouchableOpacity>
              </View>
                  <Text style={styles.title}>INCOME</Text>
          </View >
          <View style={styles.modalcontent}>
            <IncomeInfo/>
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
                  <Text style={styles.title}>GOALS</Text>
          </View >
          <View style={styles.modalcontent}>
            <GoalsInfo/>
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
                  <Text style={styles.title}>BUDGET PLAN</Text>
          </View >
          <View style={styles.modalcontent}>
            <BudgetPlanInfo/>
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
                  <Text style={styles.title}>EXPENSE</Text>
          </View >
          <View style={styles.modalcontent}>
            <SummaryInfo/>
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
                  <Text style={styles.title}>STATISTICS</Text>
          </View >
          <View style={styles.modalcontent}>
            <ChartInfo/>
          </View>
          </View>
        </Modal>
      </>

    </MainContainer>
    </>
  )

}



