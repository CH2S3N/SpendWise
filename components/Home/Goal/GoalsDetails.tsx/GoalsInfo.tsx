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
    return 
  };
  return (
    <MainContainer>
      <View style={styles.header}>
        <Text>Header</Text>
      </View>
      <View style={styles.container}>
          <View style={styles.section}> 
            <View style={styles.tableheader}>
                <View style={styles.tabletitle}>
                  <Text>Name</Text>
                  </View>
                <View style={styles.tabletitle}>
                  <Text>Amount</Text>
                </View>
            </View>
            <View style={styles.tablecontent}>
      
            </View>
            <View style={styles.footer}>
              <Text style={styles.text}>Total Expense: ₱</Text>
            </View>
          </View>
          <View style={styles.section}> 
            <View style={styles.tableheader}>
                <View style={styles.tabletitle}>
                  <Text>Name</Text>
                </View>
                <View style={styles.tabletitle}>
                  <Text>Amount</Text>
                </View>
            </View>
            <View style={styles.tablecontent}>
              <GoalsDetailsList goals={goals} deleteGoal={deleteGoal} updateGoal={updateGoal}/>
            </View>
            <View style={styles.footer}>
              <Text style={styles.text}>Total Expense: ₱</Text>
            </View>
          </View>
      </View>
     
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    gap: 10,
  },
  header: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  tableheader: {
    flex: 1,
    flexDirection: 'row',
    
  },
  tabletitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold'
  },
  tablecontent: {
    flex: 10,
    flexDirection: 'row',
  },
  footer: {
    flex: 1,
  }
})
