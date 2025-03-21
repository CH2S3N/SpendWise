import { Button, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Linking, Alert } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import IncomeInfo from '@/components/Home/IncomeSummary/IncomeInfo';
import IncomeChart from '@/components/Home/Chart/IncomeChart ';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { colors } from '@/constants/colors';
import { Modal } from '@/components/Modal';
import { RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import Card from '@/components/ui/Card';
import { setUsername } from '@/state/userSlice';
import AddIncome from '@/components/ui/addIncome';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import Animated, { BounceIn, BounceOut, FadeIn, FadeOut, SlideInLeft, SlideInRight, SlideInUp, SlideOutDown, SlideOutLeft, SlideOutRight, ZoomInEasyDown } from 'react-native-reanimated';

const Budget = () => {
  const { user } = useSelector((state: RootState) => state.data);
  const { updateUser, deleteAllData } = UseTransactionService(); 
  const dispatch = useDispatch();

  const firstUser = user?.[0];  
  const userName = firstUser?.userName || "";
  const userId = firstUser?.id ?? 1;
  const data = firstUser?.hasData ?? "False";

  const [input, setInput] = useState(userName);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isAddingIncome, setIsAddingIncome] = useState(false);
  const [isConfirmDeletionModalVisible, setIsConfirmDeletionModalVisible] = React.useState(false);
  const [isConfirmSaveModalVisible, setIsConfirmSaveModalVisible] = React.useState(false);
  async function handleUpdateUser() {
    try {
      await updateUser({
        id: userId,
        userName: input,
        hasData: data,
      });
      console.log("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }

  function validateFields() {
    if (input === "" || input.length < 3)  {
      return false;
    }
    
    return true;
  }
  return (
    <Animated.View 
      // entering={SlideInUp.duration(300)}
      // exiting={SlideOutDown.duration(300)}
    style={styles.container}
    >
      <MainContainer>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => setIsModalVisible(true)} 
              style={styles.userButton}>
              <FontAwesome6 name="circle-user" size={30} color={colors.green} />
              <Text style={styles.userText}>{userName}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSettingsModalVisible(true)} style={styles.iconButton} >
              <FontAwesome6 name="gear" size={30} color={colors.green} 
              style={{
                textShadowColor: 'black', 
                textShadowOffset: { width: .5, height: .5 }, 
                textShadowRadius: .5,
              }}
              />
            </TouchableOpacity>
          </View>
          <Card
          style={{ 
            flex: .5,
            marginBottom:20,
            borderWidth:1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          content={
            <IncomeChart />
          }
          />
          <View style={[{marginHorizontal:20}]}>
            <TouchableOpacity onPress={() => setIsAddingIncome(true)} style={[styles.regen, {backgroundColor: colors.green}]}>
                <Text style={[styles.btnTxt, {color: colors.light}]}>ADD INCOME</Text>
            </TouchableOpacity>
          </View>
          <IncomeInfo />
        </View>

        {/* Profile Modal */}
        <Modal isOpen={isModalVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={[styles.modalContent1, {}]}>
                  <Text style={styles.modalTitle}>Profile</Text>
                  <FontAwesome6 name="circle-user" size={50} color={colors.green} />
                  <View style={{ paddingTop: 10 }}>
                    <Text style={{color: colors.green, fontWeight: 'bold'}}>Current Username</Text>
                    <TextInput
                      placeholder="Enter Username"
                      style={{ color: colors.green ,marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black', textAlign: 'center' }}
                      value={input}
                      onChangeText={(txt)=>{
                        setInput(
                          txt
                            .toLowerCase()
                            .replace(/\b\w/g, (char) => char.toUpperCase())
                        )
                      }}
                      maxLength={12}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.btn}>
                      <Text style={{color: colors.light}}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      dispatch(setUsername(input));
                      setIsConfirmSaveModalVisible(true)
                    }}
                    disabled={!validateFields()}
                    style={[
                      styles.btn,
                      (!validateFields()) && styles.disabledButton
                    ]}
                    >
                      <Text style={{color: colors.light}}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Settings Modal */}
        <Modal isOpen={isSettingsModalVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setIsSettingsModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={[styles.modalContent1, {}]}>
                  <Text style={styles.modalTitle}>Settings</Text>
                  <TouchableOpacity onPress={() => {
                    setIsSettingsModalVisible(false);
                    Linking.openURL('https://www.youtube.com/shorts/41iWg91yFv0')
                    
                    }}>
                    <Text style={styles.modalSubTitle}>Feedback</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{
                    setIsConfirmDeletionModalVisible(true)
                  }}>
                    <Text style={[styles.modalSubTitle, {color: colors.red}]}>Delete all data</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setIsSettingsModalVisible(false)}>
                    <Text style={styles.modalSubTitle}>Close</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        
        {/* Add Income Modal*/}
        <Modal isOpen={isAddingIncome} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setIsAddingIncome(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text style={styles.title}>ADD INCOME </Text>
                  <AddIncome setIsAddingIncome={setIsAddingIncome}/>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>


        {/* Save Confirmation Modal */}
        <ConfirmModal
        visible={isConfirmSaveModalVisible} 
        title={'Confirm Changes'} 
        message={'Are you sure you want save the changes?'} 
        onConfirm={()=> {
          handleUpdateUser();
          setIsSettingsModalVisible(false);
          setIsConfirmSaveModalVisible(false)
          setIsModalVisible(false);
          Alert.alert(
            "Username",    
            "Changes Saved!", 
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }} 
        onCancel={() => setIsConfirmSaveModalVisible(false)}      
        />
        {/* Confirmation Deletion  Modal */}
        <ConfirmModal
        visible={isConfirmDeletionModalVisible} 
        title={'Confirm Deletion'} 
        message={'Are you sure you want to delete all data?'} 
        onConfirm={()=> {
          deleteAllData();
          setIsConfirmDeletionModalVisible(false)
          setIsSettingsModalVisible(false)
          Alert.alert(
            "Deletion",      
            "User Data Deleted!", 
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }} 
        onCancel={() => setIsConfirmDeletionModalVisible(false)}      
        />
      </MainContainer>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  header: {
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userText: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.green,
  },
  iconButton: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  modalOverlay: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    width: '80%',
    height: '80%',
    borderWidth:1,
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
  modalContent1: {
    width: '80%',
    justifyContent: "center",
    alignContent:"center",
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth:1,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
},
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeText: {
    fontSize: 16,
    color: colors.dark,
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.green,
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  modalSubTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.green,
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 3
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataTxt: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.dark,
    opacity: 0.5,
  },
  disabledButton: {
    backgroundColor: colors.green,
    opacity: .5
  },
  btnTxt:{
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.dark,
    textShadowColor: 'black', 
    textShadowOffset: { width: .5, height: .5 }, 
    textShadowRadius: .5, 
  },
  btn: {
        marginHorizontal: 10,
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
        paddingVertical: 5,
        
  },
  regen: {
    borderWidth:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    padding: 15,
    marginHorizontal: 5,
    marginBottom: 10
    

  },
});

export default Budget;
