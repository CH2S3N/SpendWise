import { View, Text } from 'react-native'
import React from 'react'
import { User } from '@/types';
import { useSQLiteContext } from 'expo-sqlite';

const Budget = () => {
    const [budget, setbudget] = React.useState<User[]>([]);
    const db = useSQLiteContext();

  React.useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db])

  async function getData() {
    const result = await db.getAllAsync<User>('SELECT * FROM User');
    setbudget(result);
    
  }

  async function deleteBudget(id:number) {
    db.withTransactionAsync(async () => {
      await db.runAsync('DELETE FROM budget WHERE id = ?;', [1])
      await getData();
    }) 
  }

  function calcTotalBudget() {
    return budget.reduce((total, budget) => {
      return total + (budget.budget_Amount || 0);
    }, 0)
  }
  return (
    <View>
      <Text>Budget: {calcTotalBudget()}</Text>
    </View>
  )
}

export default Budget