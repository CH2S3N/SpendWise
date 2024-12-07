import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useSQLiteContext } from 'expo-sqlite';
import GoalsList from './GoalsList';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { useFetchData } from '@/hooks/useFetchData';
import { Divider } from '@rneui/base';

export default function Goals() {
  const { fetchData } = useFetchData();
  const { goals, loading, error } = useSelector(
    (state: RootState) => state.data
  );
  const db = useSQLiteContext();

  useEffect(() => {
    fetchData();
  }, []); 

  async function deleteGoal(id: number) {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM Goals WHERE id = ?;', [id]);
        await fetchData();
      });
    } catch (error) {
      console.error('Error deleting Goal:', error);
    }
  }
  function calcTotalGoal() {
    return goals.reduce((total, goals) => {
      return total + (goals.amount || 0);
    }, 0)
  }
  
  
  // If loading, show a loading text
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // If error occurs, display error message
  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.maincontainer}>
      <View style={styles.tableheader}>
        <View style={styles.tabletitle}>
          <Text style={styles.text}>Name</Text>
          <Text style={styles.text}>Amount</Text>
        </View>
      </View>
      <View style={styles.container}>
          <GoalsList goals={goals} deleteGoal={deleteGoal} />
          <View style={styles.total}>
            <Text style={styles.text}>Total: ₱{calcTotalGoal()}</Text>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10
  },
    container: {
      flex: 1
    },
    tableheader: {
      flexDirection: 'row'
    },
    tabletitle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    text: {
      fontWeight: 'bold',
    },
    total: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    }
})