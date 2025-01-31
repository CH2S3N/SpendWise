import { View, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import CircularChart from '../../components/Home/Chart/ExpenseChart';
import ExpenseSummary from '../../components/Home/ExpnseSummary/ExpenseSummary';
import Goals from '../../components/Home/Goal/Goals';
import AddTransaction from '../../components/ui/AddTransaction';
import GoalsInfo from '@/components/Home/Goal/GoalsDetails.tsx/GoalsInfo';
import SummaryInfo from '@/components/Home/ExpnseSummary/TransactionDetials/SummaryInfo';
import ChartInfo from '@/components/Home/Chart/ChartInfo';
import InfoContainer from '@/components/Containers/InfoContainer';
import BigText from '@/components/Texts/BigText';
import {  RootState } from '@/state/store';
import {  useSelector } from 'react-redux';
import MainContainer from '@/components/Containers/MainContainer';
import { Modal } from '@/components/Modal';
import { colors } from '@/constants/colors';
import Budget from '@/components/Home/Budget/totalIncome';
import IncomeInfo from '@/components/Home/IncomeSummary/IncomeInfo';
import AntDesign from '@expo/vector-icons/AntDesign';
import BudgetPlanInfo from '@/components/Home/BudgetPlan/BudgetPlanInfo';
import styles from '@/components/Home/styles';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFetchData } from '@/hooks/useFetchData';
import { ActivityIndicator } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';


export default function Home() {

  const { categories, transactions, incomes } = useSelector(
    (state: RootState) => state.data
    
  );
  
  const [isBudgetPlanGenerated, setBudgetPlanGenerated] = useState(false);

  useEffect(() => {
    setBudgetPlanGenerated(
      Array.isArray(transactions) && transactions.length > 0 &&
      Array.isArray(incomes) && incomes.length > 0
    );
  }, [transactions, incomes]);


  // modals
  const [isGoalModalVisible, setGoalModalVisible] = useState(false);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isIncomeInfoModalVisible, setIncomeInfoModalVisible] = useState(false);
  const [isSummaryModalVisible, setSummaryModalVisible] = useState(false);
  const [isChartModalVisible, setChartModalVisible] = useState(false);
  const [isGenerateModalVisible, setGenerateModalVisible] = useState(false);

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
        total + transaction.amount || 0
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
      {isBudgetPlanGenerated === true && (
        <>
          <>
            <View style={styles.container}>
              {/* Income & Expense */}
              <View style={styles.btnContainer}>
                  <TouchableOpacity onPress={() => setIncomeInfoModalVisible(true)} style={styles.btnIncome}>
                    <AntDesign name="pluscircle" size={20} color="white" style={{ paddingRight: 10}}/>
                    <Text style={styles.btnTxt}>INCOME: <Budget/></Text>   
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setGenerateModalVisible(true)} style={styles.regen}>
                  <FontAwesome5 name="redo-alt" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSummaryModalVisible(true)} style={styles.btnExpense}>
                    <AntDesign name="minuscircle" size={20} color="white" style={{ paddingRight: 10}}/>
                    <Text style={styles.btnTxt}>EXPENSE: {totalExpenses}</Text>
                  </TouchableOpacity>
              </View>

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
                    {/* <InfoContainer
                    header={
                      <TouchableOpacity onPress={() => setDailyBudgetModalVisible(true)}>
                        <BigText content="BUDGET PLAN"/>
                      </TouchableOpacity>
                  }
                    content={<BudgetPlan/>}
                  /> */}
                </View>

                {/* Summary */}
                <InfoContainer
                    header={
                      <TouchableOpacity onPress={() => setSummaryModalVisible(true)}>
                        <BigText content="Monthly Expenses"/>
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

            {/* Generate */}
            <Modal isOpen={isGenerateModalVisible} >
              <View style={styles.modalcontainer}>
              <View style={styles.modalheader}>
                  <View style={styles.icon}>
                      <TouchableOpacity onPress={() => setGenerateModalVisible(false)}>
                          <AntDesign name="leftcircle" size={24} color="black" />
                      </TouchableOpacity>
                  </View>
                      <Text style={styles.title}>Generate Budget Plan</Text>
              </View >
              <View style={styles.modalcontent}>
                <BudgetPlanInfo setBudgetPlanGenerated={setBudgetPlanGenerated} setGenerateModalVisible={setGenerateModalVisible}/>
              </View>
              </View>
            </Modal>
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
            {/* <Modal isOpen={isDailyBudgetModalVisible} >
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
                <BudgetPlanInfo setBudgetPlanGenerated={setBudgetPlanGenerated}/>
              </View>
              </View>
            </Modal> */}

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
        </>
      )}
      {isBudgetPlanGenerated === false && (
        <BudgetPlanInfo setBudgetPlanGenerated={setBudgetPlanGenerated} setGenerateModalVisible={setGenerateModalVisible}/>
      )}

    </MainContainer>
    </>
  )

}



