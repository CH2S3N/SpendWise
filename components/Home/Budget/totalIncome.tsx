import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Income, Transaction, User } from '@/types';
import calculateMonthlyAmount from '@/utils/calcMonthlyAmount';

export default function Budget() {
 const incomes: Income[] = useSelector((state: RootState) => state.data.incomes);

  // Calculate the total monthly amount
  const calcMonthAmount = (incomes: Income[]): number => {
    return incomes.reduce((total: number, income: Income) => {
      const amount = income.amount || 0;
      const frequency = income.frequency || 'Monthly';
      return total + calculateMonthlyAmount(amount, frequency);
    }, 0);
  };

  const monthlyAmount = calcMonthAmount(incomes);
  
  return monthlyAmount

}