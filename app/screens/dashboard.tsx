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
import Overview from '@/components/Home/Chart/Overview';
import Card from '@/components/ui/Card';
import { Divider } from 'react-native-paper';


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

  const [isHovered, setIsHovered] = useState(false);
  
  // Return Function
  return (

    <MainContainer style={styles.container}>
      <>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.genBudget}>
              <TouchableOpacity onPress={() => setGenerateModalVisible(true)} style={styles.topbtn}>
                <Text style={styles.btnTxt}>Auto Allocate</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGenerateModalVisible(true)} style={styles.topbtn}>
                <Text style={styles.btnTxt}>Budget Plan</Text>
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
                  <TouchableOpacity onPress={() => setChartModalVisible(true)}><Text style={styles.title2}>Show more</Text></TouchableOpacity>
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



