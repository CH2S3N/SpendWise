import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { Divider } from '@rneui/base';
import IncomeList from './IncomeList';
import { Modal } from '@/components/Modal';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import AddIncome from '@/components/ui/addIncome';


export default function IncomeInfo() {

  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isUpdatingTransaction, setIsUpdatingTransaction] = React.useState<boolean>(false);

  return (
    <>
      <View style={styles.container}>
          <View style={styles.section}> 
            <View style={styles.tablecontent}>
              <IncomeList/>
            </View>
          </View>
      </View>

      {/* Add Transaction Button */}
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => setIsAddingTransaction(true)} style={styles.regen}>
            <Text style={styles.btnTxt}>Add New Income Source</Text>
        </TouchableOpacity>
      </View>

      {/* Add Income Modal*/}
      <Modal isOpen={isAddingTransaction} transparent={true} >
        <View style={styles.modalAddContent}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize:20, paddingTop: 10}}>Add a Source of Income</Text>

          <AddIncome setIsAddingTransaction={setIsAddingTransaction} setIsUpdatingTransaction={setIsUpdatingTransaction} />
        </View>
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
    paddingHorizontal: 5,
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
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '99%',
    
  }
})
