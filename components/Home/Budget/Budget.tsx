import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import BudgetList from './BudgetList';

export default function Budget() {

  const { user, loading, error, } = useSelector(
    (state: RootState) => state.data
  );
  
  
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
      
      <BudgetList user={user}/>

    </View>
  )
}