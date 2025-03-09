import { Button, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
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

  return (
    <MainContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => setIsModalVisible(true)} 
            style={styles.userButton}>
            <FontAwesome6 name="circle-user" size={30} color={colors.dark} />
            <Text style={styles.userText}>{userName}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsSettingsModalVisible(true)} style={styles.iconButton}>
            <FontAwesome6 name="gear" size={30} color={colors.dark} />
          </TouchableOpacity>
        </View>
        <Card
        style={{ flex: 0.5, justifyContent: 'center', marginBottom: 10, marginHorizontal: 10, backgroundColor: colors.ligthGreen}}
        content={
          <IncomeChart />
        }
        />
        <View style={[styles.btn, {marginHorizontal:20}]}>
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
                <FontAwesome6 name="circle-user" size={50} color={colors.dark} />
                <View style={{ paddingTop: 10 }}>
                  <Text>Current Username</Text>
                  <TextInput
                    placeholder="Enter Username"
                    style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black', textAlign: 'center' }}
                    value={input}
                    onChangeText={setInput}
                  />
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: "center" }}>
                  <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                    <Text style={styles.modalSubTitle}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    dispatch(setUsername(input));
                    handleUpdateUser();
                    setIsModalVisible(false);
                  }}>
                    <Text style={styles.modalSubTitle}>Save</Text>
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
                <TouchableOpacity onPress={()=>{
                  deleteAllData();
                  handleUpdateUser();
                  setIsSettingsModalVisible(false)
                }}>
                  <Text style={styles.modalSubTitle}>Delete all data</Text>
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
    </MainContainer>
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
    color: colors.dark,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  modalSubTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
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
  btnTxt:{
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.dark
  },
  btn: {
  },
  regen: {
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
