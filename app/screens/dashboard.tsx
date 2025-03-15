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
import Expense from '@/components/Home/ExpnseSummary/TransactionDetials/Expense';
import { colors } from '@/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native';
import { setUsername } from '@/state/userSlice';
import { setHasName, setWelcomed } from '@/state/dataSlice';
import { UseTransactionService } from '@/hooks/editData/TransactionService';

export default function Index() {
    const { width } = useWindowDimensions();
  const { transactions, incomes, user, viewed, nameSetted, welcomed } = useSelector((state: RootState) => state.data);
  const [isBudgetPlanGenerated, setBudgetPlanGenerated] = useState(false);
  const [hasName, setName] = useState(false);
  const userHasData = user.length > 0 ? user[0] : null;
  const dispatch = useDispatch();
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const { updateUser } = UseTransactionService(); 

  // Modals
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isChartModalVisible, setChartModalVisible] = useState(false);
  const [isGenerateModalVisible, setGenerateModalVisible] = useState(false);
  const [isBudgetPlanModalVisible, setBudgetPlanModalVisible] = useState(false);
  const [isWelcomeModalVisible, setWelcomeModalVisible] = useState(true);
  const [selectedTypeIndex, setselectedTypeIndex] = React.useState<number>(0);
  


  const firstUser = user?.[0];  
  const userName = firstUser?.userName || "";
  const userId = firstUser?.id ?? 1;
  const data = firstUser?.hasData ?? "False";
  
    const [input, setInput] = useState(userName);

    useEffect(() => {
      
      if (userName === "") {
        setUserModalVisible(true); 
        setWelcomeModalVisible(false) 
      } else {
        setUserModalVisible(false); 
      }


    }, [userName]);
  
    useEffect(()=>{
      async function firstOpen() {
        await AsyncStorage.setItem('@firstOpen', 'false');
        dispatch(setWelcomed(true))
      }
      firstOpen()
    },[])


  useEffect(() => {
    setBudgetPlanGenerated(
      Array.isArray(transactions) &&
      transactions.length > 0 &&
      Array.isArray(incomes) &&
      incomes.length > 0
    );
  }, [transactions, incomes]);

 async function handleUpdateUser() {
    try {
      await updateUser({
        id: userId,
        userName: input,
        hasData: data,
      });
      await AsyncStorage.setItem('@hasNamesetted', 'true');
      dispatch(setHasName(true))
      console.log("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }
  return (
    <MainContainer style={styles.container}>
      {userHasData && userHasData.hasData === "False" ? (
        <BudgetPlanInfo 
          setBudgetPlanGenerated={setBudgetPlanGenerated} 
          setGenerateModalVisible={setGenerateModalVisible} 
        />
      ) : (
        <ScrollView >
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
                onPress={() => {setBudgetPlanModalVisible(true); }} 
                style={styles.topbtn}
              >
                <Text style={[styles.btnTxt, {color: colors.light}]}>SUMMARY</Text>
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
        </ScrollView>
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
              <BudgetPlanInfo setBudgetPlanGenerated={setBudgetPlanGenerated} setGenerateModalVisible={setGenerateModalVisible} />
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


        {/* Welcome Modal */}
      <Modal isOpen={isWelcomeModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setWelcomeModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.welcomeModalContent}>
                {welcomed === true  ? (
                  <>
                    <Text style={[styles.title, {fontSize: 30, color: colors.green, fontWeight: '900'}]}>Welcome {userName}! To</Text>
                    <Image
                      source={require("./../../assets/images/onboardingImge/Spendwise.gif")} 
                      style={[styles.image, { width: '100%', resizeMode: 'cover' }]} 
                    />                    
                  </>
                ):(
                  <>
                    <Text style={styles.title}>Welcome Back!</Text>
                    <Text style={styles.title}>{userName}</Text>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>


      <Modal isOpen={isUserModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
            <View style={styles.welcomeModalContent}>
              <Text style={styles.modalTitle}>Set a Username</Text>
              <TextInput
                placeholder="Enter Username"
                style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black', textAlign: 'center' }}
                value={input}
                onChangeText={setInput}
              />
              <TouchableOpacity onPress={() => {
                dispatch(setUsername(input));
                handleUpdateUser();
                setUserModalVisible(false)
                setWelcomeModalVisible(true);
              }}>
                <Text style={styles.modalSubTitle}>Save</Text>
              </TouchableOpacity>
            </View>
        </View>
      </Modal>
      </>
    </MainContainer>
  );
}
