import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Switch, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import AddTransaction from '@/components/ui/AddTransaction';
import { Modal } from '@/components/Modal';
import IncomeInfo from '../IncomeSummary/IncomeInfo';
import GenerateService from '@/hooks/generateBudgetplan/Generate';
import { colors } from '@/constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Button, Divider } from 'react-native-paper';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import { useFetchData } from '@/hooks/useFetchData';
import Categories from './Categories';
import Expense from '../ExpnseSummary/TransactionDetials/Expense';
import { Income, Transaction } from '@/types';



export default function BudgetPlanInfo({
  setBudgetPlanGenerated,
  setGenerateModalVisible
}: {
  setBudgetPlanGenerated: React.Dispatch<React.SetStateAction<boolean>>;
  setGenerateModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { updateUser } = UseTransactionService();
  const { handleSaveExpense } = GenerateService();
  const { transactions, user, incomes } = useSelector((state: RootState) => state.data);
  const { fetchData } = useFetchData();


  const firstUser = user?.[0];  
  const userName = firstUser?.userName || "";
  const userId = firstUser?.id ?? 1;  
  const [input, setInput] = useState(userName);

  // modal
  const [activeModal, setActiveModal] = useState<'income' | 'expense' | 'summary' | null>(null);
  const closeModal = () => setActiveModal(null);
  const openModal = (modalName: "income" | "expense" | "summary") => {
    setActiveModal(modalName);
  };
  
  const [isAdvanceBtnTapped, setAdvanceBtnTapped] = useState(false);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [hasBudgetStrat, setHasBudgetStrat] = useState(false);


  const [isLoading, setIsLoading] = useState(false);

  const handleAllocate = async () => {
    try {
      setIsLoading(true);
      await handleSaveExpense();
      setBudgetPlanGenerated(true);
      setGenerateModalVisible(false);
  
      await updateUser({
        id: userId,
        userName: input,
        hasData: "True",
      });
    } catch (error) {
      console.error("Error during allocation:", error);
    } finally {
      setIsLoading(false);
      await fetchData()
    }
  };
  


  function validateFields() {
    if ( transactions.length === 0 || incomes.length === 0 || !hasBudgetStrat)  {
      return false;
    }
    
    return true;
  }

  return (
    <View style={styles.mainCon}>
       {isLoading === true && (
          <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="black" />
          <Text style={styles.loadingText}>Allocating Budget...</Text>
          </View>
       )}
       {isLoading === false && (
         <>
            <View style={[styles.container,]}>
              {/* Categories */}
                <View style={[styles.container, {flex: 1, }]}>
                  <View style={[styles.card, {}]}>
                      <Categories setHasBudgetStrat={setHasBudgetStrat} isAdvanceBtnTapped={isAdvanceBtnTapped} setIsAdvanceBtnTapped={setAdvanceBtnTapped}/>
                      {isAdvanceBtnTapped === false ? (
                        <Button onPress={()=>{setAdvanceBtnTapped(true)}}>Advance</Button>
                      ) : (
                        <Button onPress={()=> setAdvanceBtnTapped(false)}>Go Back</Button>
                      )}

                  </View>

                </View>

              {/* Expense & Income */}
              {isAdvanceBtnTapped === false && (
                <View style={[styles.container, {flex: 1,  justifyContent: "center", alignItems: "center"}]}>
                  <View style={[styles.row, {justifyContent: "center", }]}>
                    {/* Income */}
                    <View style={[styles.card, {flex: 1, backgroundColor: colors.green,  marginLeft: 20, marginRight: 5, marginVertical: 5,}]}>
                      <TouchableOpacity onPress={() => openModal('income')} activeOpacity={0.5}>
                        <Text style={styles.titleW}>INCOME</Text>
                        <Divider/>
                        <Text style={styles.txtW}>Expand</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Expense */}
                    <View style={[styles.card, {flex: 1, backgroundColor: colors.red, marginRight: 20, marginLeft: 5, marginVertical: 5,}]}>
                      <TouchableOpacity onPress={() => openModal('expense')} activeOpacity={0.5}>
                        <Text style={styles.titleW}>EXPENSE</Text>
                        <Divider/>
                        <Text style={styles.txtW}>Expand</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {/* Buttons for Transactions and Generation */}
            <View style={styles.btncontainer}>
              <View style={[styles.content, {flexDirection: "row"}]}>
                <TouchableOpacity style={styles.btn} onPress={() =>setIsAddingTransaction(true)}>
                  <Text style={styles.title}>ADD</Text>   
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAllocate}
                   disabled={!validateFields()} 
                  style={[
                    styles.btn,
                    (!validateFields()) && styles.disabledButton
                  ]}
                  >
                  <Text style={styles.title}>ALLOCATE</Text>   
                </TouchableOpacity>
              </View>
            </View>
         </>
       )}


      {/* PopUp Screen */}    
      <>
      {/* Add Transaction */}
      <Modal isOpen={isAddingTransaction} transparent={true} onRequestClose={()=> setIsAddingTransaction(false)}>
        <View style={styles.modalAddContent}>
            <AddTransaction setIsAddingTransaction={setIsAddingTransaction} />
        </View>
      </Modal>
      {/* Expense Summary */}
      <Modal isOpen={activeModal === 'expense'} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
        <View style={styles.modalheader}>
            <View style={{paddingRight: 10}}>
                <TouchableOpacity onPress={closeModal}>
                    <AntDesign name="leftcircle" size={24} color="black" />
                </TouchableOpacity>
            </View>
                <Text style={styles.title}>EXPENSE</Text>
        </View >
        <View style={styles.modalcontent}>
          <Expense/>
        </View>
        </View>
      </Modal>
      {/* Income Summary */}
      <Modal isOpen={activeModal === 'income'} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
        <View style={styles.modalheader}>
            <View style={{paddingRight: 10}}>
                <TouchableOpacity onPress={closeModal}>
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
      </>
   </View>
 )
}

const styles = StyleSheet.create({
  mainCon:{
    flex: 1,
  },
  container:{
    flex: 6,
  },
  content:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  btncontainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row:{
    flexDirection: "row",
  },
  col:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  col1:{
    flex: .5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  card:{
    flex: 1,
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    marginHorizontal: 20,
    marginVertical: 5,
    
  },
  title:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleW:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.light
  },
  txtW:{
    fontWeight: "bold",
    color: colors.light,
    textAlign: 'center',

  },
  btn:{
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
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
  disabledButton: {
    color: colors.gray,
    opacity: 0.5
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



  // Loading Screen
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },

})