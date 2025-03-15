import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Switch, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import AddTransaction from '@/components/ui/AddTransaction';
import { Modal } from '@/components/Modal';
import IncomeInfo from '../IncomeSummary/IncomeInfo';
import { colors } from '@/constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Button, Divider } from 'react-native-paper';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import { useFetchData } from '@/hooks/useFetchData';
import Categories from './Categories';
import Expense from '../ExpnseSummary/TransactionDetials/Expense';
import AllocateAllService from '@/hooks/generateBudgetplan/AllocateService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setBudgetStratSplit } from '@/state/dataSlice';


export default function BudgetPlanInfo({
  setBudgetPlanGenerated,
  setGenerateModalVisible 
}: {
  setBudgetPlanGenerated: React.Dispatch<React.SetStateAction<boolean>>;
  setGenerateModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { updateUser } = UseTransactionService();
  const { allocateAll, splitAllocation } = AllocateAllService();
  const { transactions, user, incomes, budgetStratSplit } = useSelector((state: RootState) => state.data);
  const { fetchData } = useFetchData();
  const dispatch = useDispatch();

  // User
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
  const [stratSplit, setStratSplit] = useState(false);
  const [selectedTypeIndex, setselectedTypeIndex] = React.useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadStratSplit = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('stratSplitted'); 
        if (storedValue !== null) {
          const parsedValue = JSON.parse(storedValue);
          setStratSplit(parsedValue);
          dispatch(setBudgetStratSplit(parsedValue));
        }
      } catch (error) {
        console.error("Error loading stratSplit:", error);
      }
    };
    loadStratSplit();
  }, [dispatch]);

// To Validate requirements
  function validateFields() {
    if ( transactions.length === 0 || incomes.length === 0 || !hasBudgetStrat)  {
      return false;
    }
    
    return true;
  }



  const handleAllocate = async () => {
    try {
      setIsLoading(true);
  
      if (stratSplit === true) {
        await splitAllocation();
      } else {
        await allocateAll();
      }
  
      setBudgetPlanGenerated(true);
      setGenerateModalVisible(false);
  
      await updateUser({
        id: userId,
        userName: input,
        hasData: "True",
      });
  
      const newStratSplit = stratSplit;
      dispatch(setBudgetStratSplit(newStratSplit));
  
      // Save updated value in AsyncStorage
      await AsyncStorage.setItem('stratSplitted', JSON.stringify(newStratSplit));  
      console.log("Strategy split? ", newStratSplit);
  
      await fetchData();
    } catch (error) {
      console.error("Error during allocation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.mainCon}>
       {isLoading === true && (
          <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.dark} />
          <Text style={styles.loadingText}>Allocating Budget...</Text>
          </View>
       )}
       {isLoading === false && (
         <>
            <View style={[styles.container,]}>
              {/* Categories */}
                <View style={[styles.container, {flex: 1.2, }]}>
                  <View style={[styles.card, {backgroundColor: colors.light}]}>
                      <Categories setHasBudgetStrat={setHasBudgetStrat} isAdvanceBtnTapped={isAdvanceBtnTapped} setIsAdvanceBtnTapped={setAdvanceBtnTapped} setStratSplit={setStratSplit} stratSplit={stratSplit}/>
                      {isAdvanceBtnTapped === false ? (
                        <Button onPress={()=>{setAdvanceBtnTapped(true)}}>Advance</Button>
                      ) : (
                        <Button onPress={()=> setAdvanceBtnTapped(false)}>Go Back</Button>
                      )}
                      {/* <Text>{stratSplit.toString()}</Text> */}
                  </View>

                </View>

              {/* Expense & Income */}
              {isAdvanceBtnTapped === false && (
                <View style={[styles.container, {flex: 1,  justifyContent: "center", alignItems: "center"}]}>
                  <View style={[styles.row, {justifyContent: "center", }]}>
                    {/* Income */}
                    <View style={[styles.card, {flex: 1, backgroundColor: colors.green,  marginLeft: 20, marginRight: 5, marginVertical: 5,}]}>
                      <TouchableOpacity onPress={() => openModal('income')} activeOpacity={0.5} >
                        <Text style={styles.titleW}>INCOME</Text>
                        <Divider/>
                        <Text style={styles.txtW}>Expand</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Expense */}
                    <View style={[styles.card, {flex: 1, backgroundColor: colors.green, marginRight: 20, marginLeft: 5, marginVertical: 5, }]}>
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
                  <Text style={styles.titleW}>ADD</Text>   
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAllocate}
                   disabled={!validateFields()} 
                  style={[
                    styles.btn,
                    (!validateFields()) && styles.disabledButton
                  ]}
                  >
                  <Text style={styles.titleW}>ALLOCATE</Text>   
                </TouchableOpacity>
              </View>
            </View>
         </>
       )}


      {/* PopUp Screen */}    
      <>
      {/* Add Transaction */}
      <Modal isOpen={isAddingTransaction} transparent animationType="fade" onRequestClose={() => setIsAddingTransaction(false)}>
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <AddTransaction setIsAddingTransaction={setIsAddingTransaction} selectedTypeIndex={selectedTypeIndex}  setselectedTypeIndex={setselectedTypeIndex}/>
              </View>
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
                <Text style={styles.title}>Back</Text>
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
                <Text style={styles.title}>Back</Text>
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
    borderWidth:1,
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
    color: colors.dark,
  },
  titleW:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.light,
    textShadowColor: 'black', 
    textShadowOffset: { width: .5, height: .5 }, 
    textShadowRadius: .5,
  },
  txtW:{
    fontWeight: "bold",
    color: colors.light,
    textAlign: 'center',
    textShadowColor: 'black', 
    textShadowOffset: { width: .5, height: .5 }, 
    textShadowRadius: .2,

  },
  btn:{
    marginHorizontal: 10,
    flex: 1,
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
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
    backgroundColor: colors.green,
    opacity: .5
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

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    width: '80%',
    height: '80%',
    
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
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