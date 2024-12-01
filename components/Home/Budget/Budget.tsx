import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Transaction, User } from '@/types';

export default function Budget({
  user,
}: {
  user: User[];
}) {

  const userBudget = user.length > 0 ? user[0].budget_Amount : 'No Budget Found';
  
  return (
    <View>
       <Text>Budget Amount: {userBudget}</Text>
    </View>
  )
}