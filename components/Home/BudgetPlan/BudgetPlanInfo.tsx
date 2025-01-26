import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { Goal, Income, Transaction } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import InitialExpense from './GeneratedPlan/Expense';
import InitialIncome from './GeneratedPlan/Income';
import AddTransaction from '@/components/ui/AddTransaction';
import SummaryInfo from '../ExpnseSummary/TransactionDetials/SummaryInfo';
import { Modal } from '@/components/Modal';
import IncomeInfo from '../IncomeSummary/IncomeInfo';
import BudgetPlan from './GeneratedPlan/GeneratedDetails.tsx/BudgetPlan';
import GenerateService from '@/hooks/generateBudgetplan/Generate';
import { Divider } from 'react-native-paper';
import GeneratedIncome from './GeneratedPlan/GeneratedDetails.tsx/Income';
import GeneratedExpense from './GeneratedPlan/GeneratedDetails.tsx/Expense';
import ChartInfo from '../Chart/ChartInfo';
import Summary from '../Chart/Summary';
import { colors } from '@/constants/colors';
import Card from '@/components/ui/Card';
import Slider from '@react-native-community/slider';
import { ProgressBar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setNeeds, setWants, setSavings } from '@/state/budgetSlice';



export default function BudgetPlanInfo({
  setBudgetPlanGenerated,
  setGenerateModalVisible
}: {
  setBudgetPlanGenerated: React.Dispatch<React.SetStateAction<boolean>>;
  setGenerateModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { handleSaveExpense } = GenerateService();
  
  const dispatch = useDispatch();
  const { needs, wants, savings } = useSelector((state: RootState) => state.budget); 
  
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isIncomeModalVisible, setIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setExpenseModalVisible] = useState(false);
  const [isSummaryModalVisible, setSummarisSummaryModalVisible] = useState(false);
  const [isGenerating, setGenerating] = useState(false);




  // Function to handle slider changes while ensuring the sum is 100
  const handleSliderChange = (sliderIndex: number, value: number) => {
    if (sliderIndex === 1) {
      const newSlider2 = 100 - value - savings;
      dispatch(setNeeds(value));  // Dispatch action to update Needs
      dispatch(setWants(newSlider2 >= 0 ? newSlider2 : 0));  // Dispatch action to update Wants
      dispatch(setSavings(newSlider2 >= 0 ? savings : 0));  // Ensure Savings doesn't go negative
    } else if (sliderIndex === 2) {
      const newSlider1 = 100 - value - savings;
      dispatch(setWants(value));  // Dispatch action to update Wants
      dispatch(setNeeds(newSlider1 >= 0 ? newSlider1 : 0));  // Dispatch action to update Needs
      dispatch(setSavings(newSlider1 >= 0 ? savings : 0));  // Ensure Savings doesn't go negative
    } else {
      const newSlider1 = 100 - value - wants;
      dispatch(setSavings(value));  // Dispatch action to update Savings
      dispatch(setNeeds(newSlider1 >= 0 ? newSlider1 : 0));  // Dispatch action to update Needs
      dispatch(setWants(newSlider1 >= 0 ? wants : 0));  // Ensure Wants doesn't go negative
    }
  };

  return (
    <MainContainer>
      <>
        <View style={styles.mainCon}>
        <Text style={styles.title}>Generate A Budget Plan</Text>
          <Card
            style={styles.card}
            content={
              <>
              <TouchableOpacity onPress={()=>setIncomeModalVisible(true)}>
                  <Text style={styles.title}>INCOME</Text>
                </TouchableOpacity>
                  <InitialIncome />
              </>
            }
          />

          <Card
            style={styles.card}
            content={
              <>
              <TouchableOpacity onPress={()=>setExpenseModalVisible(true)}>
                <Text style={styles.title}>EXPENSE</Text>
              </TouchableOpacity>
              <InitialExpense />
              </>
            }
          />
          <Card
            style={styles.card}
            content={
              <>
              <Text>Needs: {needs}%</Text>
              <Slider
                value={needs}
                onValueChange={(value) => handleSliderChange(1, value)}
                minimumValue={0}
                maximumValue={100}
                step={1}
              />

              <Text>Wants: {wants}%</Text>
              <Slider
                value={wants}
                onValueChange={(value) => handleSliderChange(2, value)}
                minimumValue={0}
                maximumValue={100}
                step={1}
              />

              <Text>Savings: {savings}%</Text>
              <Slider
                value={savings}
                onValueChange={(value) => handleSliderChange(3, value)}
                minimumValue={0}
                maximumValue={100}
                step={1}
              />
            </>
            }
          />

        </View>

        {/* Buttons for Transactions and Generation */}
        <View style={styles.btncontainer}>
          <View style={styles.content}>
            <TouchableOpacity style={styles.btn} onPress={()=> setIsAddingTransaction(true)}>
              <Text style={styles.txt}>ADD TRANSACTION</Text>   
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=> {
              handleSaveExpense();
              setBudgetPlanGenerated(true);
              setGenerateModalVisible(false)
              }}>
              <Text style={styles.txt}>GENERATE</Text>   
            </TouchableOpacity>
          </View>
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

      {/* Expense Summary */}
      <Modal isOpen={isExpenseModalVisible} >
        <View style={styles.modalContainer}>
        <View style={styles.modalheader}>
            <View style={styles.icon}>
                <TouchableOpacity onPress={() => setExpenseModalVisible(false)}>
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
      
      {/* Income Summary */}
      <Modal isOpen={isIncomeModalVisible} >
        <View style={styles.modalContainer}>
        <View style={styles.modalheader}>
            <View style={styles.icon}>
                <TouchableOpacity onPress={() => setIncomeModalVisible(false)}>
                    <AntDesign name="leftcircle" size={24} color="black" />
                </TouchableOpacity>
            </View>
                <Text style={styles.title}>Income</Text>
        </View >
        <View style={styles.modalcontent}>
              <IncomeInfo/>
        </View>
        </View>
      </Modal>
      {/* Transactions Summary */}
      <Modal isOpen={isSummaryModalVisible} >
        <View style={styles.modalContainer}>
        <View style={styles.modalheader}>
            <View style={styles.icon}>
                <TouchableOpacity onPress={() => setSummarisSummaryModalVisible(false)}>
                    <AntDesign name="leftcircle" size={24} color="black" />
                </TouchableOpacity>
            </View>
                <Text style={styles.title}>Summary</Text>
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

const styles = StyleSheet.create({
  mainCon:{
    flex: 2,
    paddingTop: 10
  },
  card:{
    marginHorizontal: 20,
    marginVertical: 10
  },
  container:{
    flex:1
  },
  cardContainer:{
    flex:1,
    flexDirection: 'row'
    
  },
  tableHeader:{
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  title:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  btn:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark,
    borderRadius: 45,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10
  },
  txt:{
    color: colors.light,
    fontSize: 20,
    fontWeight: 'bold',
  },


  modalContainer:{
    flex:1,
    paddingHorizontal: 20
  },
  modalheader:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center', 
  },
  icon:{
    paddingRight: 10
  },
  modalcontent:{
    flex:10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalAddContent:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
  btncontainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', 
  },
})