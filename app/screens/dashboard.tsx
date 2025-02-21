import { View, TouchableOpacity, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
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
import Overview from '@/components/Home/Chart/Overview';
import Card from '@/components/ui/Card';
import { Divider } from 'react-native-paper';
import BudgetPlan from '@/components/Home/BudgetPlan/BudgetPlan';


export default function Index() {
  const { transactions, incomes } = useSelector(
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
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isChartModalVisible, setChartModalVisible] = useState(false);
  const [isGenerateModalVisible, setGenerateModalVisible] = useState(false);
  const [isBudgetPlanModalVisible, setBudgetPlanModalVisible] = useState(false);

  
  // const [isAFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  // React.useEffect(async ()=> {
  //   const appData = await AsyncStorage
  // })


  // Return Function
  return (

    <MainContainer style={styles.container}>
      <>
        <View style={styles.container}>
          <ScrollView>
            {/* Allocate / Summary Button */}
            <View style={styles.genBudget}>
              <TouchableOpacity onPress={() => setGenerateModalVisible(true)} style={styles.topbtn}>
                <Text style={styles.btnTxt}>Auto Allocate</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setBudgetPlanModalVisible(true)} style={styles.topbtn}>
                <Text style={styles.btnTxt}>Summary</Text>
              </TouchableOpacity>
            </View>
            {/* Statistics */}
            <Card
              style={{marginHorizontal: 10, marginBottom: 10}}
              content = {
                <>
                  <Text style={styles.title2}>Overview</Text>
                  <Divider style={{marginHorizontal: 10, marginBottom: 10}}/>
                  <Overview/>
                  <Divider style={{marginHorizontal: 10, marginTop: 5}}/>
                    <View style={styles.btnshow}>
                    <TouchableOpacity 
                      onPress={() => setChartModalVisible(true)}
                      disabled ={transactions.length === 0 || incomes.length === 0}
                      style={[
                        styles.button,
                        (transactions.length === 0 || incomes.length === 0) && styles.disabledButton
                      ]}
                    >
                        <Text style={{}}>Show more</Text></TouchableOpacity>
                    </View>

                </>
              } 
            />
            {/* Add Transactions */}
            <View style={ styles.btn}>
              <TouchableOpacity onPress={() => setIsAddingTransaction(true)} style={styles.regen} activeOpacity={0.7}>
                <Text style={styles.btnTxt}>Add Transactions</Text>
              </TouchableOpacity>
            </View>
            {/* Transactions */}
            <View>
              <SummaryInfo/>
            </View>
          </ScrollView>
        </View >
      </>

      {/* PopUp Screen */}
      <>        
        {/* Add Transactions */}
        <Modal isOpen={isAddingTransaction} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setIsAddingTransaction(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <AddTransaction setIsAddingTransaction={setIsAddingTransaction} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
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
            <BudgetPlanInfo  setBudgetPlanGenerated={setBudgetPlanGenerated} setGenerateModalVisible={setGenerateModalVisible}/>
          </View>
          </View>
        </Modal>

        {/* Budget plan */}
        <Modal isOpen={isBudgetPlanModalVisible} >
          <View style={[styles.modalcontainer]}>
          <View style={[styles.modalheader]}>
              <View style={styles.icon}>
                  <TouchableOpacity onPress={() => setBudgetPlanModalVisible(false)}>
                      <AntDesign name="leftcircle" size={24} color="black" />
                  </TouchableOpacity>
              </View>
                  <Text style={styles.title}>Summary</Text>
          </View >
          <View style={styles.modalcontent}>
              <BudgetPlan />
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
  )

}



