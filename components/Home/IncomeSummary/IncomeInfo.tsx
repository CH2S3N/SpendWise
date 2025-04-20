import { View, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useState } from 'react'
import IncomeList from './IncomeList';
import { Modal } from '@/components/Modal';
import { colors } from '@/constants/colors';
import AddIncome from '@/components/ui/addIncome';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';


export default function IncomeInfo() {
  const { incomes } = useSelector((state: RootState) => state.data);
  const [isAddingIncome, setIsAddingIncome] = useState(false);

  function calcIncome() {
    return incomes.reduce((total, income) => {
      return total + (income.amount * income.interval) || 0;

    }, 0)  

  };
 
  return (
    <>
      {/* Add Transaction Button */}
      <View style={styles.container}>
          <View style={[styles.tableheader, ]}>
              <View style={[styles.row, ]}>
                <Text style={styles.title}>Income Sources</Text>
                <Text style={[styles.amount, {color: colors.green}]}>Total: ₱ {(calcIncome()).toLocaleString()}</Text>
            </View>
          </View>
          <View style={styles.section}> 
            <View style={styles.tablecontent}>
                {incomes.length > 0 ? (
                <ScrollView>
                    <IncomeList/>
                </ScrollView>
                ) : (
                    <View style={styles.noData}>
                      <Text style={[styles.noDataTxt, {fontSize: 25}]}>Manage all your Income Sources here!</Text>
                      <Text style={styles.noDataTxt}>Tap the Add Income button for the first one</Text>
                    </View>
                )}
            </View>
          </View>
      </View>

      {/* Add Income Modal*/}
      <Modal isOpen={isAddingIncome} transparent animationType="fade" onRequestClose={() => setIsAddingIncome(false)}>
        <TouchableWithoutFeedback onPress={() => setIsAddingIncome(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.title}>UPDATE INCOME</Text>                
                <AddIncome setIsAddingIncome={setIsAddingIncome}/>
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
  tableheader: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 5,  
    borderBottomWidth:1,
    marginBottom:10 
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
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: 'black', 
    textShadowOffset: { width: .2, height: .2 }, 
    textShadowRadius: .2,
  },
  section: {
    flex: 1,
    alignItems: 'flex-start',
  },
  tablecontent: {
    flex: 10,
    flexDirection: 'row',
  },
  noData:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  noDataTxt:{
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.green,
    fontSize: 20,
  },
  titletext:{
    fontWeight: 'bold',
    color: colors.dark,
    textAlign: 'center',
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

})
