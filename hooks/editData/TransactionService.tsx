import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useFetchData } from "../useFetchData";
import { useSQLiteContext } from "expo-sqlite";
import { setData } from "@/state/dataSlice";
import { Category, Goal, Income, Transaction, User } from "@/types";

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
        `INSERT INTO Goals (name, amount) VALUES(?, ?)`,
        [goal.name, goal.amount]
      );
  
      // Fetch the newly inserted goal using last_insert_rowid()
      const addedGoal = await db.getAllAsync<Goal>(
        `SELECT * FROM Goals WHERE id = last_insert_rowid()`
      );
      
      console.log('Added Goal:', addedGoal);
  
      // Reload data after inserting goal
      const goalResult = await db.getAllAsync<Goal>('SELECT * FROM Goals');
      dispatch(setData({ goals: goalResult, categories, incomeCategories, transactions, user, incomes, recurrence }));
    });
  };
  

  // Update Goal
  const updateGoal = async (goal: Goal) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `UPDATE Goals SET name = ?, amount = ?, currentAmount = ? WHERE id = ?`,
        [goal.name, goal.amount, goal.currentAmount, goal.id]
      );
  
      // Fetch the updated goal
      const updatedGoal = await db.getAllAsync<Goal>(
        `SELECT * FROM Goals WHERE id = ?`, 
        [goal.id]
      );
  
      console.log('Updated Goal:', updatedGoal);
  
      // Reload data
      const goalResult = await db.getAllAsync<Goal>('SELECT * FROM Goals');
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
        `INSERT INTO Income (incomeCategoryId, interval, subtype, description, frequency, amount, type) 
         VALUES(?, ?, ?, ?, ?, ?, ?)`,
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
  
      // Fetch the newly inserted income
      const addedIncome = await db.getAllAsync<Income>(
        `SELECT * FROM Income WHERE id = last_insert_rowid()`
      );
  
      console.log('Added Income:', addedIncome);
  
      // Reload data
      const incomeResult = await db.getAllAsync<Income>('SELECT * FROM Income');
      dispatch(setData({ incomes: incomeResult, categories, incomeCategories, goals, user, transactions, recurrence }));
    });
  };
  
  // Update Income
  const updateIncome = async (income: Income) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `UPDATE Income SET subtype = ?, incomeCategoryId = ?, amount = ?, description = ?, frequency = ?, type = ?, interval = ?  
         WHERE id = ?`,
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
  
      // Fetch the updated income
      const updatedIncome = await db.getAllAsync<Income>(
        `SELECT * FROM Income WHERE id = ?`, 
        [income.id]
      );
  
      console.log('Updated Income:', updatedIncome);
  
      // Reload data
      const incomeResult = await db.getAllAsync<Income>('SELECT * FROM Income');
      dispatch(setData({ incomes: incomeResult, categories, incomeCategories, goals, user, transactions, recurrence }));
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
        `INSERT INTO Transactions (category_id, recurrence_id, interval, subtype, description, frequency, prioritization, isfixedamount, amount, type) 
         VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
  
      // Fetch the newly inserted transaction
      const addedExpense = await db.getAllAsync<Transaction>(
        `SELECT * FROM Transactions WHERE id = last_insert_rowid()`
      );
  
      console.log('Added Expense:', addedExpense);
  
      // Reload data
      const transactionResult = await db.getAllAsync<Transaction>('SELECT * FROM Transactions');
      dispatch(setData({ transactions: transactionResult, categories, incomeCategories, goals, user, incomes, recurrence }));
    });
  };
  

  // Update Expense
  const updateTransaction = async (transaction: Transaction) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `UPDATE Transactions 
         SET subtype = ?, category_id = ?, description = ?, frequency = ?, prioritization = ?, isfixedamount = ?, amount = ?, type = ?, recurrence_id = ?, interval = ? 
         WHERE id = ?`,
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
  
      // Fetch the updated transaction
      const updatedExpense = await db.getAllAsync<Transaction>(
        `SELECT * FROM Transactions WHERE id = ?`, 
        [transaction.id]
      );
  
      console.log('Updated Expense:', updatedExpense);
  
      // Reload data
      const transactionResult = await db.getAllAsync<Transaction>('SELECT * FROM Transactions');
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
  };


  const updateCategory = async (category: Category) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `UPDATE Categories SET name = ?, type = ?, initialProp = ?, proportion = ?  WHERE id = ?`,
        [category.name, category.type, category.initialProp, category.proportion, category.id]
      );
  
      // Reload data after updating
      const categoryResult = await db.getAllAsync<Category>("SELECT * FROM Categories");
      console.log("Updated Category:", categoryResult);
      dispatch(setData({ categories: categoryResult, transactions, incomeCategories, goals, user, incomes, recurrence }));
    });
  };
  
  // Update User
  const updateUser = async (user: User) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `UPDATE User SET  userName = ?, hasData = ? WHERE id = ?`,
        [
          user.userName,
          user.hasData,
          user.id
        ]
      );
        // Reload data after inserting transaction
        const userResult = await db.getAllAsync<User>('SELECT * FROM User');
        console.log('Updated user:', userResult);
        dispatch(setData({ user: userResult, categories, incomeCategories, goals, transactions, incomes, recurrence }));
      });
  };

  // Deleta All
  async function deleteAllIncome() {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM Income;');
        await fetchData(); 
        console.log('All income records deleted');
      });
    } catch (error) {
      console.error('Error deleting all Income:', error);
    }
  }
  async function deleteAllExpense() {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM Transactions;');
        await fetchData(); // Refresh data after deletion
        console.log('All Expense records deleted');
      });
    } catch (error) {
      console.error('Error deleting all Expense:', error);
    }
  }
  async function deleteAllGoal() {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM Goals;');
        await fetchData(); 
        console.log('All income records deleted');
      });
    } catch (error) {
      console.error('Error deleting all Goals:', error);
    }
  }
  async function deleteAllData() {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM Income;');
        await db.runAsync('DELETE FROM Transactions;');
        await db.runAsync('DELETE FROM Goals;');
        await fetchData(); 
        console.log('All records from Income, Transactions, and Goals deleted');
      });
    } catch (error) {
      console.error('Error deleting all data:', error);
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
    deleteTransaction,
    updateCategory,
    updateUser,
    deleteAllIncome,
    deleteAllExpense,
    deleteAllGoal,
    deleteAllData
  };
}
