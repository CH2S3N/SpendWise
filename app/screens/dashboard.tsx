import { View, TouchableOpacity, Text, ScrollView, TouchableWithoutFeedback, Image, useWindowDimensions,  } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddTransaction from '../../components/ui/AddTransaction';
import ChartInfo from '@/components/Home/Chart/ChartInfo';
import { RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '@/components/Containers/MainContainer';
import { Modal } from '@/components/Modal';
import AntDesign from '@expo/vector-icons/AntDesign';
import BudgetPlanInfo from '@/components/Home/BudgetPlan/BudgetPlanInfo';
import styles from '@/components/Home/styles';
import Overview from '@/components/Home/Chart/Overview';
import Card from '@/components/ui/Card';
import BudgetPlan from '@/components/Home/BudgetPlan/BudgetPlan';
import Expense from '@/components/Home/ExpnseSummary/Expense';
import { colors } from '@/constants/colors';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import { Dimensions } from 'react-native';


export default function Index() {
  const { width } = useWindowDimensions();
  const { transactions, incomes, user, viewed, nameSetted, welcomed, allocation, budgetStratSplit } = useSelector((state: RootState) => state.data);
  const [isBudgetPlanGenerated, setBudgetPlanGenerated] = useState(false);
  const [hasName, setName] = useState(false);
  const userHasData = user.length > 0 ? user[0] : null;
  const dispatch = useDispatch();
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const { updateUser } = UseTransactionService(); 
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
  // Modals
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isAllocationComplete, setAllocationComplete] = useState(true);
  const [isChartModalVisible, setChartModalVisible] = useState(false);
  const [isGenerateModalVisible, setGenerateModalVisible] = useState(false);
  const [isBudgetPlanModalVisible, setBudgetPlanModalVisible] = useState(false);
  const [isWelcomeModalVisible, setWelcomeModalVisible] = useState(true);
  const [selectedTypeIndex, setselectedTypeIndex] = React.useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
      setBudgetPlanGenerated(
        transactions?.length > 0 && incomes?.length > 0
      );
    }, [transactions, incomes]);


    function validateFields() {
      if (transactions.length > 0 && incomes.length > 0 )  {
        return true;
      }
      
      return false;
    }
  

  
  return (
    <MainContainer style={styles.container}>
        {userHasData && userHasData.hasData === "False" ? (
          <BudgetPlanInfo 
            setBudgetPlanGenerated={setBudgetPlanGenerated} 
            setGenerateModalVisible={setGenerateModalVisible} 
            setAllocationComplete={setAllocationComplete}
            setIsLoading={setIsLoading}
          />
        ) : (
          < >
            <View style={{flex:0.8}}>
              {/* Allocate / Summary Buttons */}
              <View style={[styles.genBudget,]}>
                <TouchableOpacity 
                  onPress={() => setGenerateModalVisible(true)} 
                  style={styles.topbtn}
                >
                  <Text style={[styles.btnTxt, {color: colors.light}]}>ALLOCATE</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setBudgetPlanModalVisible(true)}
                  style={[styles.topbtn, !validateFields() && { opacity: 0.5 }]}
                  disabled={!validateFields()}
                >
                  <Text style={[styles.btnTxt, { color: colors.light }]}>SUMMARY</Text>
                </TouchableOpacity>
              </View>

              {/* Statistics */}
              <Card style={styles.cardStyle} content={
                <>
                  <Text style={[styles.title2, {borderBottomWidth:1, marginBottom:5, paddingBottom:5, textAlign: 'center'}]}>
                    OVERVIEW
                  </Text>
                  <View style={{flex:1}}>
                    <Overview />
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginTop:5}}>
                    <TouchableOpacity
                      onPress={() => setChartModalVisible(true)}
                      disabled={transactions.length === 0 || incomes.length === 0}
                      style={[styles.overviewBtn,(transactions.length === 0 || incomes.length === 0) && styles.disabledButton]}
                    >
                      <Text style={{fontWeight: 'bold', marginRight:10}}>Show more</Text>
                    </TouchableOpacity>
                  </View>
                </>
              }/>

              {/* Add Transactions */}
              <View style={[styles.btn, {marginHorizontal: 20, }]}>
                <TouchableOpacity 
                  onPress={() => setIsAddingTransaction(true)} 
                  style={[styles.regen, {backgroundColor: colors.green}]} 
                  activeOpacity={0.7}
                >
                  <Text style={[styles.btnTxt, {color: colors.light}]}>ADD TRANSACTION</Text>
                </TouchableOpacity>
              </View>
            </View>

              {/* Transactions */}
            <View style={{flex:1}}>
              <Expense/>
            </View>
          </>
        )}
      




      {/* PopUp Screens */}
      <>
        {/* Add Transactions Modal */}
        <Modal isOpen={isAddingTransaction} transparent animationType="fade" onRequestClose={() => setIsAddingTransaction(false)}>
          <TouchableWithoutFeedback onPress={() => setIsAddingTransaction(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={[styles.modalContent]}>
                  <AddTransaction setIsAddingTransaction={setIsAddingTransaction} selectedTypeIndex={selectedTypeIndex}  setselectedTypeIndex={setselectedTypeIndex}/>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Generate Budget Plan Modal */}
        <Modal isOpen={isGenerateModalVisible} onRequestClose={() => setGenerateModalVisible(false)}>
          <View style={styles.modalcontainer}>
            <View style={styles.modalheader}>
              <View style={styles.icon}>
                <TouchableOpacity onPress={() => setGenerateModalVisible(false)}>
                  <AntDesign name="leftcircle" size={24} color={colors.green} />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Allocate</Text>
            </View>
            <View style={styles.modalcontent}>
              <BudgetPlanInfo setBudgetPlanGenerated={setBudgetPlanGenerated} setGenerateModalVisible={setGenerateModalVisible} setAllocationComplete={setAllocationComplete} setIsLoading={setIsLoading}/>
            </View>
          </View>
        </Modal>

        {/* Budget Plan Summary Modal */}
        <Modal isOpen={isBudgetPlanModalVisible} onRequestClose={() => setBudgetPlanModalVisible(false)}>
          <View style={styles.modalcontainer}>
            <View style={styles.modalheader}>
              <View style={styles.icon}>
                <TouchableOpacity onPress={() => setBudgetPlanModalVisible(false)}>
                  <AntDesign name="leftcircle" size={24} color={colors.green} />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Monthly Transaction Summary</Text>
            </View>
            <View style={styles.modalcontent}>
              <BudgetPlan />
            </View>
          </View>
        </Modal>

        {/* Statistics Modal */}
        <Modal isOpen={isChartModalVisible} onRequestClose={() => setChartModalVisible(false)}>
          <View style={styles.modalcontainer}>
            <View style={styles.modalheader}>
              <View style={styles.icon}>
                <TouchableOpacity onPress={() => setChartModalVisible(false)}>
                  <AntDesign name="leftcircle" size={24} color={colors.green} />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>STATISTICS</Text>
            </View>
            <View style={[styles.modalcontent, {paddingHorizontal: 10}]}>
              <ChartInfo />
            </View>
          </View>
        </Modal>

    {/* Loading Display */}
    <Modal isOpen={isLoading} transparent animationType="fade">
        <TouchableWithoutFeedback >
          <View style={[styles.modalOverlay, {backgroundColor: 'rgba(255, 255, 255, 0.59)',}]}>
            <TouchableWithoutFeedback>
              <View style={[styles.TransModalContent, { }]}>
                <Image source={require("@/assets/images/Allocating.gif")} style={[styles.image, { width, resizeMode: 'contain' }]} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    {/* Allocation Complete */}
    <Modal isOpen={!isAllocationComplete} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setAllocationComplete(true)}>
          <View style={[styles.modalOverlay, {backgroundColor: 'rgba(255, 255, 255, 0.59)',}]}>
            <TouchableWithoutFeedback onPress={() => setAllocationComplete(true)}>
              <View style={[styles.TransModalContent, { }]}>
                    <Image
                      source={require("./../../assets/images/AllocationComplete.gif")} 
                      style={[styles.image, { width: '100%', resizeMode: 'cover' }]} 
                    />   
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      </>
    </MainContainer>
  );
}
