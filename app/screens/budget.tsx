import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import IncomeInfo from '@/components/Home/IncomeSummary/IncomeInfo';
import IncomeChart from '@/components/Home/Chart/IncomeChart ';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { colors } from '@/constants/colors';
import { Modal } from '@/components/Modal';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';


const Budget = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  return (
    <MainContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => setIsModalVisible(true)} 
            style={styles.userButton}>
            <FontAwesome6 name="circle-user" size={30} color={colors.dark} />
            <Text style={styles.userText}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => setIsSettingsModalVisible(true)}  style={styles.iconButton}>
            <FontAwesome6 name="gear" size={30} color={colors.dark} />
          </TouchableOpacity>
        </View>

        <IncomeChart />
        <Text style={styles.text}>My Source of Income</Text>
          <IncomeInfo />
      </View>

      {/* Profile */}
      <Modal isOpen={isModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Profile</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>


      {/* Modal */}
      {/* Settings */}
      <Modal isOpen={isSettingsModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setIsSettingsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={() => setIsSettingsModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Settings</Text>
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
    marginHorizontal: 15,
  },
  header: {
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
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    width: '80%',
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
  },
  noData:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataTxt:{
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.dark,
    opacity: 0.5
  },
});

export default Budget;

