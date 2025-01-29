import { useSQLiteContext } from 'expo-sqlite';
import { useDispatch } from 'react-redux';
import { setData, setError, setLoading } from '@/state/dataSlice';
import { Transaction, Category, Goal, User, Income } from '@/types';

export const useFetchData = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      console.log("Fetching data..."); 
      dispatch(setLoading()); // Set loading state
      const [transactionResult, categoriesResult, goalsResult, userResult, incomeResult] = await Promise.all([
        db.getAllAsync<Transaction>('SELECT * FROM Transactions'),
        db.getAllAsync<Category>('SELECT * FROM Categories'),
        db.getAllAsync<Goal>('SELECT * FROM Goals'),
        db.getAllAsync<User>('SELECT * FROM User'),
        db.getAllAsync<Income>('SELECT * FROM Income'),
      ]);

      console.log("Fetched Transactions:", transactionResult); 
      console.log("Fetched Categories:", categoriesResult);
      console.log("Fetched Incomes:", incomeResult);
      console.log("Fetched Users:", userResult);
      console.log("Fetched Goals:", goalsResult);

      // Dispatch data to Redux
      dispatch(
        setData({
          transactions: transactionResult,
          categories: categoriesResult,
          goals: goalsResult,
          user: userResult,
          incomes: incomeResult,
          incomeCategories: [],
          recurrence: []
        })
      );
    } catch (error: any) {
      console.error("Fetch Data Error:", error);
      dispatch(setError(error.message || 'Failed to fetch data'));
    }
  };

  return { fetchData };
};
