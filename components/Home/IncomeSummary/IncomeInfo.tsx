import { View, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useState } from 'react'
import IncomeList from './IncomeList';
import { Modal } from '@/components/Modal';
import { colors } from '@/constants/colors';
import AddIncome from '@/components/ui/addIncome';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { calculateTotalIncome } from '@/utils/calcTotalIncome';
import { Divider } from 'react-native-paper';


export default function IncomeInfo() {
  const { transactions, incomes } = useSelector(
    (state: RootState) => state.data
    
  );
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isUpdatingTransaction, setIsUpdatingTransaction] = React.useState<boolean>(false);

  function calcIncome() {
    return incomes.reduce((total, income) => {
      return total + (income.amount * income.interval) || 0;

    }, 0)  

  };
  return (
    <>
      {/* Add Transaction Button */}

      <View style={styles.container}>
          <View style={styles.tableheader}>
              <View style={styles.row}>
                <Text style={styles.title}>Income Sources</Text>
                <Text style={[styles.title, {color: colors.green}]}>Total: ₱ {calcIncome()}</Text>
            </View>
          </View>
          <Divider style={{marginBottom: 10}}/>
          <View style={styles.section}> 
            <View style={styles.tablecontent}>
              <ScrollView>
                {incomes.length > 0 ? (
                  <IncomeList/>
                ) : (
                  <View style={styles.noData}>
                  <Text style={styles.noDataTxt}>No Income Data!</Text>
                  <Text style={styles.titletext}>Please add some Income</Text>
                </View>
                )}
              </ScrollView>
            </View>
          </View>
      </View>



      {/* Add Income Modal*/}
      <Modal isOpen={isAddingTransaction} transparent animationType="fade" onRequestClose={() => setIsAddingTransaction(false)}>
        <TouchableWithoutFeedback onPress={() => setIsAddingTransaction(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.title}>UPDATE INCOME</Text>                
                <AddIncome setIsAddingTransaction={setIsAddingTransaction} setIsUpdatingTransaction={setIsUpdatingTransaction} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flex: 1,
    alignItems: 'flex-start',
  },
  tablecontent: {
    flex: 10,
    flexDirection: 'row',
  },
  modalAddContent:{
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
  regen: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark,
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
  btnTxt:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  },
  btn: {
  },
  noData:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataTxt:{
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.dark,
    fontSize: 30,
  },
  titletext:{
    fontWeight: 'bold',
    color: colors.dark,
    fontSize: 20,
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
  tableheader: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingBottom: 5,  
},
row: {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 5,
},
title: {
  fontSize: 20,
  fontWeight: "bold",
},

})
