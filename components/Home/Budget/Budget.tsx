import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Income, Transaction, User } from '@/types';

export default function Budget({
  income,
}: {
  income: Income[];
}) {

  const { incomes } = useSelector(
    (state: RootState) => state.data
  );

  function calcTotalBudget() {
    return incomes.reduce((total, incomes) => {
      return total + (incomes.amount || 0);
    }, 0)
  };

  // const userBudget = user.length > 0 ? user[0].budget_Amount : 'No Budget Found';
  
  return (
    <View>
       <Text>Budget Amount: {calcTotalBudget()}</Text>
    </View>
  )
}