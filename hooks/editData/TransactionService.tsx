import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useFetchData } from "../useFetchData";
import { useSQLiteContext } from "expo-sqlite";
import { setData } from "@/state/dataSlice";
import { Goal, Income, Transaction } from "@/types";

export function UseTransactionService() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, transactions, user, goals, incomes, incomeCategories, recurrence } = useSelector((state: RootState) => state.data);
  const { fetchData } = useFetchData();
  const db = useSQLiteContext();
  if (!db) {
    console.error('SQLite context is not initialized');
  }
  // GOAL
  // Add Goal
  const insertGoal = async (goal: Goal) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT INTO Goals ( name, amount ) VALUES(?, ?)`,
        [
          goal.name,
          goal.amount,
          goal.currentAmount,
        ]
      );

      // Reload data after inserting goal
      const goalResult = await db.getAllAsync<Goal>('SELECT * FROM Goals');
      console.log('Added Goal:', goalResult);
      dispatch(setData({ goals: goalResult, categories, incomeCategories, transactions, user, incomes, recurrence }));
    });
  };

  // Update Goal
  const updateGoal = async (goal: Goal) => {
      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `UPDATE Goals SET name = ?, amount = ?, currentAmount = ? WHERE id = ?`,
          [
            goal.name,
            goal.amount,
            goal.currentAmount,
            goal.id
          ]
        );
  
        // Reload data after inserting goal
        const goalResult = await db.getAllAsync<Goal>('SELECT * FROM Goals');
        console.log('Updated Goals:', goalResult);
        dispatch(setData({ goals: goalResult, categories, incomeCategories, transactions, user, incomes, recurrence }));
      });
    };

  // Delete Goal
  async function deleteGoal(id: number) {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM Goals WHERE id = ?;', [id]);
        await fetchData();
        console.log(`Goal with id ${id} deleted`);
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  // INCOME
  // Add Income
  const insertIncome = async (income: Income) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT INTO Income (incomeCategoryId, interval, subtype, description, frequency, amount, type) VALUES(?, ?, ?, ?, ?, ?, ?)`,
        [
          income.incomeCategoryId,
          income.interval,
          income.subtype,
          income.description,
          income.frequency,
          income.amount,
          income.type,
        ]
      );
      
      // Reload data after inserting transaction
      const incomeResult = await db.getAllAsync<Income>('SELECT * FROM Income');
      console.log('Added Income:', incomeResult);
      dispatch(setData({ incomes: incomeResult, categories, incomeCategories, goals, user, transactions, recurrence }));
    });
  };
  // Update Income
 const updateIncome = async (income: Income) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `UPDATE Income SET subtype = ?, incomeCategoryId = ?, amount = ?, description = ?, frequency = ?, type = ?, interval = ?  WHERE id = ?`,
        [
          income.subtype,
          income.incomeCategoryId,
          income.amount,
          income.description,
          income.frequency,
          income.type,
          income.interval,
          income.id,
          
        ]
      );
      // Reload data after inserting transaction
      const transactionResult = await db.getAllAsync<Income>('SELECT * FROM Income');
      console.log('Updated Income:', transactionResult);
      dispatch(setData({ incomes: transactionResult, categories, incomeCategories, goals, user, transactions, recurrence }));
    });
  };
  // Delete Income
  async function deleteIncome(id: number) {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM Income WHERE id = ?;', [id]);
        await fetchData();
        console.log(`Income with id ${id} deleted`);
      });
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  }

  // EXPENSE
  // Add Expense
  const insertTransaction = async (transaction: Transaction) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT INTO Transactions (category_id, recurrence_id, interval, subtype, description, frequency, prioritization, isfixedamount, amount, type) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          transaction.category_id,
          transaction.recurrence_id,
          transaction.interval,
          transaction.subtype,
          transaction.description,
          transaction.frequency,
          transaction.prioritization,
          transaction.isfixedamount,
          transaction.amount,
          transaction.type,
        ]
      );
      // Reload data after inserting transaction
      const transactionResult = await db.getAllAsync<Transaction>('SELECT * FROM Transactions');
      console.log('Added Expense:', transactionResult);
      dispatch(setData({ transactions: transactionResult, categories, incomeCategories, goals, user, incomes, recurrence }));
    });
  };

  // Update Expense
  const updateTransaction = async (transaction: Transaction) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `UPDATE Transactions SET subtype = ?, category_id = ?, description = ?, frequency = ?, prioritization = ?, isfixedamount = ?, amount = ?, type = ?, recurrence_id = ?, interval = ? WHERE id = ?`,
        [
          transaction.subtype,
          transaction.category_id,
          transaction.description,
          transaction.frequency,
          transaction.prioritization,
          transaction.isfixedamount,
          transaction.amount,
          transaction.type,
          transaction.recurrence_id,
          transaction.interval,
          transaction.id,
        ]
      );
        // Reload data after inserting transaction
        const transactionResult = await db.getAllAsync<Transaction>('SELECT * FROM Transactions');
        console.log('Updated Expense:', transactionResult);
        dispatch(setData({ transactions: transactionResult, categories, incomeCategories, goals, user, incomes, recurrence }));
      });
  };

  // Delete Expense
  async function deleteTransaction(id: number) {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM Transactions WHERE id = ?;', [id]);
        await fetchData();
        console.log(`Expense with id ${id} deleted`);
      }); 
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  }


  

  return {
    goals,
    deleteGoal,
    updateGoal,
    insertGoal,
    insertIncome,
    updateIncome,
    deleteIncome,
    insertTransaction,
    updateTransaction,
    deleteTransaction
  };
}
