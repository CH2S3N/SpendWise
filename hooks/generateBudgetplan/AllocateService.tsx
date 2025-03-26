import { Category, Income, Transaction } from '@/types';
import { RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { UseTransactionService } from '../editData/TransactionService';
import { useFetchData } from '../useFetchData';
import { setAllocation } from '@/state/dataSlice';

export default function AllocateAllService() {
  const { fetchData } = useFetchData();
  const { categories, transactions, incomes } = useSelector((state: RootState) => state.data);
  const { updateTransaction } = UseTransactionService();
  const { needs, wants, savings } = useSelector((state: RootState) => state.budget);
  const dispatch = useDispatch();

  const adjustProportions = (categories: Category[], transactions: Transaction[]) => {
    const availableCategories = categories.filter(cat =>
      transactions.some(transaction => transaction.category_id === cat.id && transaction.isfixedamount === "No")
    );
    const totalProportion = availableCategories.reduce((total, cat) => total + cat.proportion, 0);
    return availableCategories.map(cat => ({
      ...cat,
      adjustedProportion: totalProportion > 0 ? (cat.proportion / totalProportion) * 100 : 0,
    }));
  };

  const totalIncome = incomes.reduce((total: number, income: Income) => total + (income.amount * income.interval), 0);

  // For all Expense
  const allocateAll = async () => {
    
    const budget = totalIncome;
    const remainingPercentage = Math.max(100 - savings, 0);

    const totalNeedsWants = needs + wants;
    const scaledNeedsWants = totalNeedsWants > 0 ? (needs / totalNeedsWants) * remainingPercentage : 0;

    const Allocation = Math.round(budget * (scaledNeedsWants / 100));

    const allTransactions = transactions.filter(transaction =>
      categories.find(category => category.id === transaction.category_id)
    );


    const adjustedCategories = adjustProportions(
      categories,
      allTransactions
    );


    adjustedCategories.sort((a, b) => b.adjustedProportion - a.adjustedProportion);

    try {
      // Allocation of all Transactions
      for (const category of adjustedCategories) {
        const cattransactions = allTransactions.filter(transaction => transaction.category_id === category.id);
        const fixedTransactions = cattransactions.filter(transaction => transaction.isfixedamount === "Yes");
        const variableTransactions = cattransactions.filter(transaction => transaction.isfixedamount !== "Yes");

        const totalFixedTransactions = allTransactions
        .filter(transaction => transaction.isfixedamount === "Yes")
        .reduce((sum, transaction) => sum + (transaction.amount * transaction.interval), 0);

        let remainingAllocation = Allocation - totalFixedTransactions;
        remainingAllocation = Math.max(remainingAllocation, 0);

        for (const transaction of fixedTransactions) {
          try {
            await updateTransaction({ ...transaction, amount: transaction.amount });
          } catch (error) {
            console.error(`Error updating fixed essential transaction ${transaction.id}:`, error);
            alert(`An error occurred while saving expense ${transaction.description}.`);
          }
        }

        let categoryBudget = remainingAllocation > 0 ? Math.round(remainingAllocation * (category.adjustedProportion / 100)) : 0;
        let remainingBudget = categoryBudget;

        for (const transaction of variableTransactions) {
          let allocation = remainingBudget > 0 ? Math.floor(remainingBudget / variableTransactions.length) : 0;
          try {
            await updateTransaction({ ...transaction, amount: Math.floor(allocation / transaction.interval) });
          } catch (error) {
            console.error(`Error updating variable essential transaction ${transaction.id}:`, error);
            alert(`An error occurred while saving expense ${transaction.description}.`);
          }
        }
      }

      await fetchData();
    } catch (error) {
      console.error('Unexpected error while allocating budget:', error);
      alert('An unexpected error occurred while allocating budget.');
    }
  };

  // For Split Expense
  const splitAllocation = async () => {
    const budget = totalIncome;
    const remainingPercentage = Math.max(100 - savings, 0);

    const totalNeedsWants = needs + wants;
    const scaledNeeds = totalNeedsWants > 0 ? (needs / totalNeedsWants) * remainingPercentage : 0;
    const scaledWants = totalNeedsWants > 0 ? (wants / totalNeedsWants) * remainingPercentage : 0;

    const essentialsAllocation = Math.round(budget * (scaledNeeds / 100));
    const nonEssentialsAllocation = Math.round(budget * (scaledWants / 100));

    const essentialTransactions = transactions.filter(
      (transaction) => transaction.type === "Essential"
  );
  
  const nonEssentialTransactions = transactions.filter(
      (transaction) => transaction.type === "Non_Essential"
  );

    const adjustedEssentialCategories = adjustProportions(
      categories,
      essentialTransactions
    );
    const adjustedNonEssentialCategories = adjustProportions(
      categories,
      nonEssentialTransactions
    );

    adjustedEssentialCategories.sort((a, b) => b.adjustedProportion - a.adjustedProportion);
    adjustedNonEssentialCategories.sort((a, b) => b.adjustedProportion - a.adjustedProportion);

    try {
      // Essentials
      for (const category of adjustedEssentialCategories) {
        const cattransactions = essentialTransactions.filter(transaction => transaction.category_id === category.id);
        const fixedTransactions = cattransactions.filter(transaction => transaction.isfixedamount === "Yes");
        const variableTransactions = cattransactions.filter(transaction => transaction.isfixedamount !== "Yes");

        const totalFixedEssentials = essentialTransactions
        .filter(transaction => transaction.isfixedamount === "Yes")
        .reduce((sum, transaction) => sum + (transaction.amount * transaction.interval), 0);

      let remainingEssentialsAllocation = essentialsAllocation - totalFixedEssentials;
      remainingEssentialsAllocation = Math.max(remainingEssentialsAllocation, 0);

        // Allocate fixed transactions (even if amount is 0)
        for (const transaction of fixedTransactions) {
          try {
            await updateTransaction({ ...transaction, amount: transaction.amount });
          } catch (error) {
            console.error(`Error updating fixed essential transaction ${transaction.id}:`, error);
            alert(`An error occurred while saving expense ${transaction.description}.`);
          }
        }

        let categoryBudget = remainingEssentialsAllocation > 0 ? Math.round(remainingEssentialsAllocation * (category.adjustedProportion / 100)) : 0;
        let remainingBudget = categoryBudget;

        for (const transaction of variableTransactions) {
          let allocation = remainingBudget > 0 ? Math.floor(remainingBudget / variableTransactions.length) : 0;
          try {
            await updateTransaction({ ...transaction, amount: (Math.round(allocation / transaction.interval)) });
          } catch (error) {
            console.error(`Error updating variable essential transaction ${transaction.id}:`, error);
            alert(`An error occurred while saving expense ${transaction.description}.`);
          }
        }
      }

      // Non-Essentials
      for (const category of adjustedNonEssentialCategories) {
        const cattransactions = nonEssentialTransactions.filter(transaction => transaction.category_id === category.id);
        const fixedTransactions = cattransactions.filter(transaction => transaction.isfixedamount === "Yes");
        const variableTransactions = cattransactions.filter(transaction => transaction.isfixedamount !== "Yes");

        const totalFixedNonEssentials = nonEssentialTransactions
        .filter(transaction => transaction.isfixedamount === "Yes")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

        let remainingNonEssentialsAllocation = nonEssentialsAllocation - totalFixedNonEssentials;
        remainingNonEssentialsAllocation = Math.max(remainingNonEssentialsAllocation, 0);

       
        for (const transaction of fixedTransactions) {
          try {
            await updateTransaction({ ...transaction, amount: transaction.amount });
          } catch (error) {
            console.error(`Error updating fixed non-essential transaction ${transaction.id}:`, error);
            alert(`An error occurred while saving expense ${transaction.description}.`);
          }
        }

        let categoryBudget = remainingNonEssentialsAllocation > 0 ? Math.round(remainingNonEssentialsAllocation * (category.adjustedProportion / 100)) : 0;
        let remainingBudget = categoryBudget;

        for (const transaction of variableTransactions) {
          let allocation = remainingBudget > 0 ? Math.floor(remainingBudget / variableTransactions.length) : 0;
          try {
            await updateTransaction({ ...transaction, amount: (Math.round(allocation / transaction.interval)) });
          } catch (error) {
            console.error(`Error updating variable non-essential transaction ${transaction.id}:`, error);
            alert(`An error occurred while saving expense ${transaction.description}.`);
          }
        }
      }

      await fetchData();
    } catch (error) {
      console.error('Unexpected error while saving expenses:', error);
      alert('An unexpected error occurred while saving expenses.');
    }
  };


  return {
    allocateAll,
    splitAllocation
  };
}


