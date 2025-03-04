import { View, TouchableOpacity, Text, ScrollView, TouchableWithoutFeedback,  } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddTransaction from '../../components/ui/AddTransaction';
import ChartInfo from '@/components/Home/Chart/ChartInfo';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import MainContainer from '@/components/Containers/MainContainer';
import { Modal } from '@/components/Modal';
import AntDesign from '@expo/vector-icons/AntDesign';
import BudgetPlanInfo from '@/components/Home/BudgetPlan/BudgetPlanInfo';
import styles from '@/components/Home/styles';
import Overview from '@/components/Home/Chart/Overview';
import Card from '@/components/ui/Card';
import { Divider } from 'react-native-paper';
import BudgetPlan from '@/components/Home/BudgetPlan/BudgetPlan';
import Expense from '@/components/Home/ExpnseSummary/TransactionDetials/Expense';

export default function Index() {
  const { transactions, incomes, user } = useSelector((state: RootState) => state.data);
  const [isBudgetPlanGenerated, setBudgetPlanGenerated] = useState(false);
  const userHasData = user.length > 0 ? user[0] : null;
  useEffect(() => {
    setBudgetPlanGenerated(
      Array.isArray(transactions) &&
      transactions.length > 0 &&
      Array.isArray(incomes) &&
      incomes.length > 0
    );
  }, [transactions, incomes]);

  // Modals
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isChartModalVisible, setChartModalVisible] = useState(false);
  const [isGenerateModalVisible, setGenerateModalVisible] = useState(false);
  const [isBudgetPlanModalVisible, setBudgetPlanModalVisible] = useState(false);


  return (
    <MainContainer style={styles.container}>
      {userHasData && userHasData.hasData === "False" ? (
        <BudgetPlanInfo 
          setBudgetPlanGenerated={setBudgetPlanGenerated} 
          setGenerateModalVisible={setGenerateModalVisible} 
        />
      ) : (
        <View style={styles.container}>
          <ScrollView>
            {/* Allocate / Summary Buttons */}
            <View style={styles.genBudget}>
              <TouchableOpacity 
                onPress={() => setGenerateModalVisible(true)} 
                style={styles.topbtn}
              >
                <Text style={styles.btnTxt}>Allocate</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setBudgetPlanModalVisible(true)} 
                style={styles.topbtn}
              >
                <Text style={styles.btnTxt}>Summary</Text>
              </TouchableOpacity>
            </View>

            {/* Statistics */}
            <Card style={{ marginHorizontal: 10, marginBottom: 10 }} content={
              <>
                <Text style={styles.title2}>Overview</Text>
                <Divider style={{ marginHorizontal: 10, marginBottom: 10 }} />
                <Overview />
                <Divider style={{ marginHorizontal: 10, marginTop: 5 }} />
                <View style={styles.btnshow}>
                  <TouchableOpacity
                    onPress={() => setChartModalVisible(true)}
                    disabled={transactions.length === 0 || incomes.length === 0}
                    style={[
                      styles.button,
                      (transactions.length === 0 || incomes.length === 0) && styles.disabledButton,
                    ]}
                  >
                    <Text>Show more</Text>
                  </TouchableOpacity>
                </View>
              </>
            }/>

            {/* Add Transactions */}
            <View style={styles.btn}>
              <TouchableOpacity 
                onPress={() => setIsAddingTransaction(true)} 
                style={styles.regen} 
                activeOpacity={0.7}
              >
                <Text style={styles.btnTxt}>Add Transactions</Text>
              </TouchableOpacity>
            </View>

            {/* Transactions */}
            <View>
              <Expense/>
            </View>
          </ScrollView>
        </View>
      )}


      {/* PopUp Screens */}
      <>
        {/* Add Transactions Modal */}
        <Modal isOpen={isAddingTransaction} transparent animationType="fade" onRequestClose={() => setIsAddingTransaction(false)}>
          <TouchableWithoutFeedback onPress={() => setIsAddingTransaction(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <AddTransaction setIsAddingTransaction={setIsAddingTransaction} />
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
                  <AntDesign name="leftcircle" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Generate Budget Plan</Text>
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
                  <AntDesign name="leftcircle" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Summary</Text>
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
                  <AntDesign name="leftcircle" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>STATISTICS</Text>
            </View>
            <View style={[styles.modalcontent, {paddingHorizontal: 10}]}>
              <ChartInfo />
            </View>
          </View>
        </Modal>
      </>
    </MainContainer>
  );
}
