import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { User } from '@/types';
import BudgetListItem from './BudgetListItem';




export default function BudgetList({
  user,
} : {
  user: User[];
}) {
  return (
    <View>
      {user.map((user) => (
        <View key={user.id}>
          <BudgetListItem user={user}/>

        </View>
      ))}
    </View>
  )
}