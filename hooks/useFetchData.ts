import { useSQLiteContext } from 'expo-sqlite';
import { useDispatch } from 'react-redux';
import { setData, setError, setLoading } from '@/state/dataSlice';
import { Transaction, Category, Goal, User, Income, VarDataState } from '@/types';
import loadDatabase from '@/context/db';
export const useFetchData = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      await loadDatabase()
      // console.log("Fetching data..."); 
      dispatch(setLoading()); // Set loading state
      const [transactionResult, categoriesResult, goalsResult, userResult, 
      incomeResult, varDataStatesResult] = await Promise.all([
        db.getAllAsync<Transaction>('SELECT * FROM Transactions'),
        db.getAllAsync<Category>('SELECT * FROM Categories'),
        db.getAllAsync<Goal>('SELECT * FROM Goals'),
        db.getAllAsync<User>('SELECT * FROM User'),
        db.getAllAsync<Income>('SELECT * FROM Income'),
        db.getAllAsync<VarDataState>('SELECT * FROM DataStates'),
      ]);
      console.log("Data Fetched Successfully!"); 
      // Dispatch data to Redux
      dispatch(
        setData({
          transactions: transactionResult,
          categories: categoriesResult,
          goals: goalsResult,
          user: userResult,
          incomes: incomeResult,
          varDataStates: varDataStatesResult,
        })
      );
    } catch (error: any) {
      console.error("Fetch Data Error:", error);
      dispatch(setError(error.message || 'Failed to fetch data'));
    }
  };
  return { fetchData };
};
