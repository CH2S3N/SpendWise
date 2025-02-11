import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Divider } from '@rneui/base';
import InProgressList from './InProgressList';
import AccomplishedList from './AccomplishedList';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import { Modal } from '@/components/Modal';
import AddGoal from '@/components/ui/AddGoal';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@/constants/colors';



export default function GoalsInfo() {
 

  const { goals } = useSelector(
    (state: RootState) => state.data
  );

  const { deleteGoal } = UseTransactionService();



  function calcTotalGoal() {
    return goals.reduce((total, goals) => {
      return total + (goals.amount || 0);
    }, 0)
  };


 
  const accomplishedGoals = goals.filter(goal => goal.currentAmount === goal.amount);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isUpdatingTransaction, setIsUpdatingTransaction] = React.useState<boolean>(false);

  return (
    <>
      <View style={styles.MainContainer}>
        <View style={styles.header}>
          <View style={styles.headercontent}>
                <Text style={styles.text}>Total</Text>
                <Text style={styles.text}>{calcTotalGoal()}</Text>
          </View>
          <View style={styles.headercontent}>
            <Text style={styles.text}>Accomplished</Text>
            <Text style={styles.text}>{accomplishedGoals.length}/{goals.length}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Divider/>
          <Text style={styles.text}>In Progress</Text>
          <View style={styles.section}> 
            <View style={styles.tablecontent}>
            <InProgressList goals={goals}/>
            </View>
          </View>
          <Divider/>
          <Text style={styles.text}>Accomplished</Text>
          <View style={styles.section}> 
            <View style={styles.tablecontent}>
            <AccomplishedList deleteGoal={deleteGoal} goals={goals}/>
            </View>
          </View>
        </View>

      </View>

        {/* Add Transaction Button */}
        <View style={styles.btn}>
          <TouchableOpacity onPress={() => setIsAddingTransaction(true)} style={styles.regen}>
            <Text style={styles.btnTxt}>Add Goals</Text>
          </TouchableOpacity>
        </View>

        {/* Add Goals Modal */}
        <Modal isOpen={isAddingTransaction} transparent={true} >
          <View style={styles.modalAddContent}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize:20, paddingTop: 10}}>Add a Goal</Text>
              <AddGoal setIsAddingTransaction={setIsAddingTransaction} />
          </View>
        </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  container: {
    flex: 7,
    gap: 10,
  },
  header: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headercontent: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  text: {
    fontWeight: 'bold'
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
