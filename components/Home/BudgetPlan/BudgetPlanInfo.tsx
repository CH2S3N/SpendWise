import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { AntDesign } from '@expo/vector-icons';
import InitialExpense from './GeneratedPlan/Expense';
import InitialIncome from './GeneratedPlan/Income';
import AddTransaction from '@/components/ui/AddTransaction';
import SummaryInfo from '../ExpnseSummary/TransactionDetials/SummaryInfo';
import { Modal } from '@/components/Modal';
import IncomeInfo from '../IncomeSummary/IncomeInfo';
import GenerateService from '@/hooks/generateBudgetplan/Generate';
import { colors } from '@/constants/colors';
import Card from '@/components/ui/Card';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setNeeds, setWants, setSavings, resetCat} from '@/state/budgetSlice';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import SubCatNeeds from './SubCatNeeds';
import SubCatWants from './SubCatWants';
import { useFetchData } from '@/hooks/useFetchData';
import Categories from './Categories';



export default function BudgetPlanInfo({
  setBudgetPlanGenerated,
  setGenerateModalVisible
}: {
  setBudgetPlanGenerated: React.Dispatch<React.SetStateAction<boolean>>;
  setGenerateModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { updateUser } = UseTransactionService();
  const { handleSaveExpense } = GenerateService();
  const dispatch = useDispatch();
  const { needs, wants, savings} = useSelector((state: RootState) => state.budget); 
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
  
  const [isAdvanceModalVisible, setAdvanceModalVisible] = useState(false);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);



  // Function to handle slider change
  const handleCategorySliderChange = (sliderIndex: number, value: number) => {
    if (sliderIndex === 1) {
      const newSlider2 = 100 - value - savings;
      dispatch(setNeeds(value));  
      dispatch(setWants(newSlider2 >= 0 ? newSlider2 : 0));  
      dispatch(setSavings(newSlider2 >= 0 ? savings : 0));  
    } else if (sliderIndex === 2) {
      const newSlider1 = 100 - value - savings;
      dispatch(setWants(value));  
      dispatch(setNeeds(newSlider1 >= 0 ? newSlider1 : 0));  
      dispatch(setSavings(newSlider1 >= 0 ? savings : 0));  
    } else {
      const newSlider1 = 100 - value - wants;
      dispatch(setSavings(value));  
      dispatch(setNeeds(newSlider1 >= 0 ? newSlider1 : 0)); 
      dispatch(setWants(newSlider1 >= 0 ? wants : 0)); 
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleAllocate = async () => {
    try {
      setIsLoading(true); // Show loading overlay
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
  

  return (
    <MainContainer style={{justifyContent: 'center', alignItems: 'center'}}>
      {isLoading === true && (
          <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="black" />
          <Text style={styles.loadingText}>Allocating Budget...</Text>
        </View>
      )}
      {isLoading === false && (
        <>
          <View style={styles.mainCon}>
          {/* Income & Expense Card */}
          {isAdvanceModalVisible === false && (
            <>
              <Card
                style={styles.card}
                content={
                  <>
                  <TouchableOpacity onPress={() => openModal('income')}>
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
                  <TouchableOpacity onPress={() => openModal('expense')}>
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
                  <Text style={styles.title}>Categories</Text>
                  <Categories/>
                  </>
                }
              />
              <Button onPress={()=> setAdvanceModalVisible(true)}>Advance</Button>
            </>
          )}

          {/* Proportions */}
          {/* 502030 */}
          {isAdvanceModalVisible === true && (
            <>
            <Card
                style={styles.card}
                content={
                  <>
                    <Text style={styles.title}>Categories</Text>
                    <Categories/>
                  </>
                }
              />
              {/* needs */}
              <Card
                style={styles.card}
                content={
                  <>
                    <Text style={styles.title}>Sub-Category (Needs)</Text>
                    <SubCatNeeds/>
                  </>
                }
              />
              
              {/* wants */}
              <Card
                style={styles.card}
                content={
                  <>
                    <Text style={styles.title}>Sub-Category (Wants)</Text>
                    <SubCatWants/>
                  </>
                }
              />
              <Button onPress={()=> setAdvanceModalVisible(false)}>Go Back</Button>
            </>
          )}
          </View>

          {/* Buttons for Transactions and Generation */}
          <View style={styles.btncontainer}>
            <View style={styles.content}>
              <TouchableOpacity style={styles.btn} onPress={() =>setIsAddingTransaction(true)}>
                <Text style={styles.txt}>ADD TRANSACTION</Text>   
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAllocate}
                disabled={transactions.length === 0 || incomes.length === 0}
                style={[
                  styles.btn,
                  (transactions.length === 0 || incomes.length === 0) && styles.disabledButton
                ]}
                >
                <Text style={styles.txt}>ALLOCATE</Text>   
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {/* PopUp Screen */}    
      <>
      {/* Add Transaction */}
      <Modal isOpen={isAddingTransaction} transparent={true} >
        <View style={styles.modalAddContent}>
            <AddTransaction setIsAddingTransaction={setIsAddingTransaction} />
        </View>
      </Modal>
      {/* Expense Summary */}
      <Modal isOpen={activeModal === 'expense'} >
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
          <SummaryInfo/>
        </View>
        </View>
      </Modal>
      {/* Income Summary */}
      <Modal isOpen={activeModal === 'income'} >
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
  

   </MainContainer>
 )
}

const styles = StyleSheet.create({
  mainCon:{
    flex: 4,
    paddingTop: 10
  },
  card:{
    flex:1,
    marginHorizontal: 20,
    marginVertical: 10

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
  disabledButton: {
    color: colors.gray,
    opacity: 0.7
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', 
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