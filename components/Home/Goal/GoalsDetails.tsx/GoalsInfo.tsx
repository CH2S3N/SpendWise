import { Text, TouchableOpacity, View, Switch, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useEffect, useState,  } from 'react'
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Divider } from '@rneui/base';
import InProgressList from './InProgressList';
import AccomplishedList from './AccomplishedList';
import { Modal } from '@/components/Modal';
import AddGoal from '@/components/ui/AddGoal';
import { colors } from '@/constants/colors';
import Card from '@/components/ui/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAccGoalSwitch } from '@/state/dataSlice';



export default function GoalsInfo() {
  const dispatch = useDispatch();


  const { goals } = useSelector(
    (state: RootState) => state.data
  );

  function calcTotalGoal() {
    return goals.reduce((total, goals) => {
      return total + (goals.amount || 0);
    }, 0)
  };

 
  const accomplishedGoals = goals.filter(goal => goal.currentAmount === goal.amount);

  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  useEffect(() => {
    const goalSwitch = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('showAccGoal'); 
        if (storedValue !== null) {
          const parsedValue = JSON.parse(storedValue);
          setIsEnabled(parsedValue);
          dispatch(setAccGoalSwitch(parsedValue)); 
        }
      } catch (error) {
        console.log("Error loading Goal Switch", error);
      }
    };
    goalSwitch();
}, []);

useEffect(() => {
    const updateGoalSwitch = async () => {
      try {
        const newVal = isEnabled;  
        dispatch(setAccGoalSwitch(newVal));  
        await AsyncStorage.setItem('showAccGoal', JSON.stringify(newVal));  
      } catch (error) {
        console.log("Error updating Goal Switch", error);
      }
    };
    
    updateGoalSwitch();
}, [isEnabled]);  
  return (
    <>
      <View style={styles.MainContainer}>
        {/* Header */}
        <View style={styles.header}>
            <Card
            style={styles.headercontent}
            content = {
              <>
              <View style={{flexDirection: 'row', }}>
                <View style={{paddingRight: 10}}>
                  <Text style={styles.textW}> Total Amount</Text>
                  <Text style={styles.textW}>{calcTotalGoal()}</Text>
                </View>
              </View>
              </>
            }
            />
   
            <Card
            style={styles.headercontent}
            content = {
              <>
                <Text style={styles.textW}>Goals Completed</Text>
                <Text style={styles.textW}>{accomplishedGoals.length}/{goals.length}</Text>
              </>
            }
            />
            
        </View>

        {/* Switch */}
        <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
          <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <Text style={styles.text}>Show Accomplished Goals? </Text>
            <Switch
              trackColor={{false: colors.gray, true: colors.ligthGreen}}
              thumbColor={isEnabled ? colors.green : colors.ligthGreen}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        <View style={styles.container}>
          <Divider/>
          {/* Add Transaction Button */}
          <View style={styles.btn}>
            <TouchableOpacity onPress={() => setIsAddingGoal(true)} style={[styles.regen, {backgroundColor: colors.green, marginHorizontal: 30}]}>
              <Text style={[styles.btnTxt, {color: colors.light}]}>Create a New Goal</Text>
            </TouchableOpacity>
          </View>
          {goals.length === 0 && (
            <>
            <View style={[styles.row, {flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
              <Text style={styles.title}>No Goals to be Found!</Text>
              <Text style={styles.titletext}>Create some New Goals</Text>
            </View>
            </>
          )}
          <ScrollView>
            {goals.length > 0 && (
              <>
              <View style={[styles.row, {paddingBottom: 15}]}>
                <Text style={styles.titletext}>In Progress</Text>
              <Divider style={{paddingTop: 10}}/>
              </View>
                <View style={styles.section}> 
                  <View style={styles.tablecontent}>
                  <InProgressList/>
                  </View>
                </View>
              </>
            )}

            {isEnabled && accomplishedGoals.length > 0 && (
              <>
                <View style={[styles.row, {paddingBottom: 15}]}>
                <Text style={styles.titletext}>Completed</Text>
              <Divider style={{paddingTop: 10}}/>
              </View>
                <View style={styles.section}> 
                  <View style={styles.tablecontent}>
                    <AccomplishedList />
                  </View>
                </View>
              </>
            )}

          </ScrollView>
        </View>

      </View>




        <Modal isOpen={isAddingGoal} transparent animationType="fade" onRequestClose={() => setIsAddingGoal(false)}>
          <TouchableWithoutFeedback onPress={() => setIsAddingGoal(false)}>
              <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <Card
                    style={{borderWidth:1,}}
                    content={
                      <View style={{flex:1}}>
                        <Text style={[styles.title, {textAlign: 'center'}]}>Create a New Goal</Text>
                        <AddGoal setIsAddingGoal={setIsAddingGoal} />
                      </View>
                    }/>
                  </View>
              </TouchableWithoutFeedback>
              </View>
          </TouchableWithoutFeedback>
          </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 5
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
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: colors.green
  },
  section: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  textW: {
    color: colors.light,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'black', 
    textShadowOffset: { width: .5, height: .5 }, 
    textShadowRadius: .5, 
  },
  titletext:{
    fontWeight: 'bold',
    color: colors.dark,
    fontSize: 20,
  },
  title:{

    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.dark,
    fontSize: 30,
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
    backgroundColor: colors.light,
    borderRadius: 15,
    borderWidth:1,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    padding: 15,
    marginHorizontal: 5,
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

  },
  row:{
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10
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
    
  },

})
