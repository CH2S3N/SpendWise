import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Category, Goal, Transaction, User } from '@/types'
import { useSQLiteContext } from 'expo-sqlite';
import GoalsList from './GoalsList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { setData, setError, setLoading } from '@/state/dataSlice';

export default function Goals() {
  const dispatch = useDispatch<AppDispatch>();
  const { goal, loading, error } = useSelector(
    (state: RootState) => state.data
  );

  const db = useSQLiteContext();

  
  
  const fetchData = async () => {
    dispatch(setLoading());  // Set loading state before fetching data

    try {
      const transactionsResult = await db.getAllAsync<Transaction>('SELECT * FROM Transactions');
      const categoriesResult = await db.getAllAsync<Category>('SELECT * FROM Categories');
      const userResult = await db.getAllAsync<User>('SELECT * FROM User');
      const goalResult = await db.getAllAsync<Goal>('SELECT * FROM Goals');

      
      dispatch(setData({
        transactions: transactionsResult,
        categories: categoriesResult,
        user: userResult, 
        goal: goalResult,
      }));
    } catch (err: any) {
      dispatch(setError(err.message || 'Error fetching data'));
    }
  };

  useEffect(() => {
    fetchData();
  }, [db, dispatch]); 



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
    return goal.reduce((total, goals) => {
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
    <View>
        <View style={styles.container}>
            <GoalsList goals={goal} deleteGoal={deleteGoal} />
            <Text>Total: {calcTotalGoal()}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
})