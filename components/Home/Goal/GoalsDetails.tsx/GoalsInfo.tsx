import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { useFetchData } from '@/hooks/useFetchData';
import { useSQLiteContext } from 'expo-sqlite';
import { Goal } from '@/types';
import { Divider } from '@rneui/base';
import InProgressList from './InProgressList';
import AccomplishedList from './AccomplishedList';
import Card from '@/components/ui/Card';
import { UseTransactionService } from '@/hooks/editData/TransactionService';



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


  return (
    <MainContainer>
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
     
    </MainContainer>
  )
}

const styles = StyleSheet.create({
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

})
