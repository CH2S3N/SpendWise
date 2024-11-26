import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { User } from '@/types';




export default function BudgetListItem({
  user,
} : {
  user: User;
}) {

  return (
    <View>
      <Text>Budget Amount: {user.budget_Amount}</Text>
    </View>
  )
}