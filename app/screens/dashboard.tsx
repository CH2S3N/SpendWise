import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CircularChart from '../../components/Home/Chart/ExpenseChart';
import AddTransaction from '../../components/ui/AddTransaction';
import GoalsInfo from '@/components/Home/Goal/GoalsDetails.tsx/GoalsInfo';
import SummaryInfo from '@/components/Home/ExpnseSummary/TransactionDetials/SummaryInfo';
import ChartInfo from '@/components/Home/Chart/ChartInfo';
import {  RootState } from '@/state/store';
import {  useSelector } from 'react-redux';
import MainContainer from '@/components/Containers/MainContainer';
import { Modal } from '@/components/Modal';
import IncomeInfo from '@/components/Home/IncomeSummary/IncomeInfo';
import AntDesign from '@expo/vector-icons/AntDesign';
import BudgetPlanInfo from '@/components/Home/BudgetPlan/BudgetPlanInfo';
import styles from '@/components/Home/styles';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function Index() {

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


  // Return Function
  return (

    <MainContainer>
      <>
        <View style={styles.container}>
          <ScrollView>
          <TouchableOpacity onPress={() => setGenerateModalVisible(true)} style={styles.regen}>
            <FontAwesome5 name="redo-alt" size={24} color="white" />
          </TouchableOpacity>
            {/* Statistics */}
            <CircularChart/>

            {/* Transactions */}
            <SummaryInfo/>
          </ScrollView>
        </View >
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
      
      {/* Add Transactions */}
      <View style={ styles.btn}>
        <TouchableOpacity onPress={() => setIsAddingTransaction(true)} style={styles.regen}>
          <Text style={styles.btnTxt}>Add Transactions</Text>
        </TouchableOpacity>
      </View>
    </MainContainer>
  )

}



