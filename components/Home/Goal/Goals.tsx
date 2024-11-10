import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Category, Goal } from '@/types'
import { useSQLiteContext } from 'expo-sqlite';
import GoalsList from './GoalsList';

export default function Goals() {
  const [goals, setGoals] = React.useState<Goal[]>([]);

  const db = useSQLiteContext();

  React.useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db])

  async function getData() {
    const result = await db.getAllAsync<Goal>('SELECT * FROM Goals');
    setGoals(result);
    
  }

  async function deleteGoal(id:number) {
    db.withTransactionAsync(async () => {
      await db.runAsync('DELETE FROM Goals WHERE id = ?;', [id])
      await getData();
    }) 
  }

  function calcTotalGoal() {
    return goals.reduce((total, goal) => {
      return total + (goal.amount || 0);
    }, 0)
  }
  
  return (
    <View>
        <View style={styles.container}>
            <GoalsList goals={goals} deleteGoal={deleteGoal} />
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