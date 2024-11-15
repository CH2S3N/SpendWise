// src/components/Home/ExpenseSummary.tsx

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/state/store'; 
import { setLoading, setData, setError } from '../../../state/dataSlice';
import { Category, Goal, Transaction, User } from '@/types';
import { useSQLiteContext } from 'expo-sqlite/next';
import TransactionList from './TransactionsList';

export default function ExpenseSummary() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, transactions, loading, error } = useSelector(
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


  async function deleteTransaction(id: number) {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM Transactions WHERE id = ?;', [id]);
        await fetchData();
      });
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  }

  // Calculate the total expense
  function calcTotalExpense() {
    return transactions.reduce((total, transaction) => {
      return total + (transaction.amount || 0);
    }, 0);
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
      <TransactionList
        categories={categories}
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />
      <Text>Total Expense: {calcTotalExpense()}</Text>
    </View>
  );
};
