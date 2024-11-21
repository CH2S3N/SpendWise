import { useSQLiteContext } from 'expo-sqlite/next';
import { useDispatch } from 'react-redux';
import { setData, setError, setLoading } from '@/state/dataSlice';
import { Transaction, Category, Goal, User } from '@/types';

export const useFetchData = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      dispatch(setLoading()); // Set loading state
      const [transactionResult, categoriesResult, goalsResult, userResult] = await Promise.all([
        db.getAllAsync<Transaction>('SELECT * FROM Transactions'),
        db.getAllAsync<Category>('SELECT * FROM Categories'),
        db.getAllAsync<Goal>('SELECT * FROM Goals'),
        db.getAllAsync<User>('SELECT * FROM User'),
      ]);

      // Dispatch data to Redux
      dispatch(
        setData({
          transactions: transactionResult,
          categories: categoriesResult,
          goals: goalsResult,
          user: userResult,
        })
      );
    } catch (error: any) {
      dispatch(setError(error.message || 'Failed to fetch data'));
    }
  };

  return { fetchData };
};