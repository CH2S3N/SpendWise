import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import InfoContainer from '@/components/Containers/InfoContainer';
import MainContainer from '@/components/Containers/MainContainer';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { useFetchData } from '@/hooks/useFetchData';
import { useSQLiteContext } from 'expo-sqlite';
import GoalsDetails from './GoalsDetails';
import { Goal } from '@/types';
import GoalsLists from './GoalsDetailsList';
import GoalsDetalsLists from './GoalsDetailsList';
import GoalsDetailsList from './GoalsDetailsList';
import { Card, Divider } from '@rneui/base';


export default function GoalsInfo({
  updateGoal,
} : {
  updateGoal(goals: Goal): Promise<void>;
 
}) {

  const { goals } = useSelector(
    (state: RootState) => state.data
  );
  const { fetchData } = useFetchData();
  const db = useSQLiteContext();

  async function deleteGoal(id: number) {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM Goals WHERE id = ?;', [id]);
        await fetchData();
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  }


  function calcTotalGoal() {
    return goals.reduce((total, goals) => {
      return total + (goals.amount || 0);
    }, 0)
  };
  return (
    <MainContainer>
      <View style={styles.header}>
        <View style={styles.headercontent}>
          <Text style={styles.text}>Total</Text>
          <Text style={styles.text}>{calcTotalGoal()}</Text>
        </View>
        <View style={styles.headercontent}>
          <Text style={styles.text}>Accomplished</Text>
          <Text style={styles.text}>0/{goals.length}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Divider/>
        <Text style={styles.text}>In Progress</Text>
        <View style={styles.section}> 
          <View style={styles.tablecontent}>
          <GoalsDetailsList goals={goals} deleteGoal={deleteGoal} updateGoal={updateGoal}/>
          </View>
        </View>
        <Divider/>
        <Text style={styles.text}>Accomplished</Text>
        <View style={styles.section}> 
          <View style={styles.tablecontent}>
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
