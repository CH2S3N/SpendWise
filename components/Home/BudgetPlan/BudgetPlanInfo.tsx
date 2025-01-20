import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { Goal, Income, Transaction } from '@/types';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import InitialExpense from './GeneratedPlan/Expense';
import InitialIncome from './GeneratedPlan/Income';
import AddTransaction from '@/components/ui/AddTransaction';
import SummaryInfo from '../ExpnseSummary/TransactionDetials/SummaryInfo';
import { Modal } from '@/components/Modal';
import IncomeInfo from '../IncomeSummary/IncomeInfo';
import BudgetPlan from './GeneratedPlan/GeneratedDetails.tsx/BudgetPlan';




export default function BudgetPlanInfo() {
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isPlanModalVisible, setPlanModalVisible] = useState(false);
  const [isIncomeModalVisible, setIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setExpenseModalVisible] = useState(false);


  return (
    <MainContainer>
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <TouchableOpacity onPress={()=>setExpenseModalVisible(true)}>
            <Text style={styles.titleheader}>EXPENSE</Text>
          </TouchableOpacity>
          <InitialExpense />
        </View>
        <View style={styles.card}>
        <TouchableOpacity onPress={()=>setIncomeModalVisible(true)}>
            <Text style={styles.titleheader}>INCOME</Text>
          </TouchableOpacity>
            <InitialIncome />
        </View>
      </View>

      {/* Buttons for Transactions and Generation */}
      <View style={styles.btncontainer}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.btn} onPress={()=> setIsAddingTransaction(true)}>
            <Text style={styles.txt}>ADD TRANSACTION</Text>   
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=> setPlanModalVisible(true)}>
            <Text style={styles.txt}>GENERATE</Text>   
          </TouchableOpacity>
        </View>
      </View>

       {/* PopUp Screen */}    
      {/* Add Transaction */}
      <Modal isOpen={isAddingTransaction} transparent={true} >
        <View style={styles.modalAddContent}>
            <AddTransaction setIsAddingTransaction={setIsAddingTransaction} />
        </View>
      </Modal>
      
      {/* Plan Modal */}
      <Modal isOpen={isPlanModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalheader}>
            <View style={styles.icon}>
                <TouchableOpacity onPress={() => setPlanModalVisible(false)}>
                    <AntDesign name="leftcircle" size={24} color="black" />
                </TouchableOpacity>
            </View>
                <Text style={styles.title}>Budge Plan</Text>
        </View >
        <View style={styles.modalcontent}>
          <BudgetPlan/>
        </View>
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
  
    </View>
   </MainContainer>
 )
}

