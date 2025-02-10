import { Category, Income } from '@/types';
import calculateMonthlyAmount from '@/utils/calcMonthlyAmount';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { UseTransactionService } from '../editData/TransactionService';
import { useFetchData } from '../useFetchData';

export default function GenerateService() {
  const { fetchData } = useFetchData();
  const { categories, transactions, incomes } = useSelector((state: RootState) => state.data);
  const { updateTransaction } = UseTransactionService();
  const { needs, wants, savings } = useSelector((state: RootState) => state.budget);

  const calcMonthIncome = (incomes: Income[]): number => {
    return incomes.reduce((total: number, income: Income) => {
      const amount = income.amount || 0;
      const frequency = income.frequency || 'Monthly';
      return total + calculateMonthlyAmount(amount, frequency);
    }, 0);
  };

  // Returns subcategories with Transactions 
  const adjustProportions = (categories: Category[], transactions: any[]) => {
    const availableCategories = categories.filter(cat => transactions.some(tx => tx.category_id === cat.id));
    const totalProportion = availableCategories.reduce((total, cat) => total + cat.proportion, 0);
    return availableCategories.map(cat => ({
      ...cat,
      adjustedProportion: totalProportion > 0 ? (cat.proportion / totalProportion) * 100 : 0,
    }));
  };

  const handleSaveExpense = async () => {
    const budget = calcMonthIncome(incomes);
    const essentialsAllocation = budget * (needs / 100);
    const nonEssentialsAllocation = budget * (wants / 100);
    const savingsAllocation = budget * (savings / 100);

    // Filter transactions by type
    const essentialTransactions = transactions.filter(tx =>
      categories.find(category => category.id === tx.category_id)?.type === "Essential"
    );
    const nonEssentialTransactions = transactions.filter(tx =>
      categories.find(category => category.id === tx.category_id)?.type === "Non_Essential"
    );

    // Adjust proportions for subcategories 
    const adjustedEssentialCategories = adjustProportions(
      categories.filter(cat => cat.type === "Essential"),
      essentialTransactions
    );
    const adjustedNonEssentialCategories = adjustProportions(
      categories.filter(cat => cat.type === "Non_Essential"),
      nonEssentialTransactions
    );

    try {
      //ESSENTIALS
      for (const category of adjustedEssentialCategories) {
        const catTxs = essentialTransactions.filter(tx => tx.category_id === category.id);
        let categoryBudget = Math.round(essentialsAllocation * (category.adjustedProportion / 100));

        const fixedTxs = catTxs.filter(tx => tx.isfixedamount === "Yes");
        const variableTxs = catTxs.filter(tx => tx.isfixedamount !== "Yes");

        // Allocate fixed transactions fully 
        for (const tx of fixedTxs) {
          const allocation = Math.min(tx.amount, categoryBudget);
          categoryBudget -= allocation;
          const updatedTx = { ...tx, amount: allocation };
          try {
            await updateTransaction(updatedTx);
          } catch (error) {
            console.error(`Error updating fixed essential transaction ${tx.id}:`, error);
            alert(`An error occurred while saving expense ${tx.description}.`);
          }
        }

        //allocate remaining funds 
        if (variableTxs.length > 0) {
          const equalShare = Math.floor(categoryBudget / variableTxs.length);
          let remainder = categoryBudget % variableTxs.length;
          if (categoryBudget === 0){
            for (const tx of variableTxs) {
             
              const updatedTx = {
                ...tx, amount: 0
              };
              try {
                await updateTransaction(updatedTx);
              } catch (error) {
                console.error(`Error updating variable essential transaction ${tx.id}:`, error);
                alert(`An error occurred while saving expense ${tx.description}.`);
              }
            }
          }
          else{
            for (const tx of variableTxs) {
              let allocation = equalShare;
              if (remainder > 0) {
                allocation += 1;
                remainder--;
              }
              // Subtract allocation from categoryBudget as we go (should reach 0 by end)
              categoryBudget -= allocation;
              const updatedTx = {
                ...tx,
                amount: Math.round(allocation / (tx.interval || 1)),
              };
              try {
                await updateTransaction(updatedTx);
              } catch (error) {
                console.error(`Error updating variable essential transaction ${tx.id}:`, error);
                alert(`An error occurred while saving expense ${tx.description}.`);
              }
            }
          }
        }

      }

      // NON-ESSENTIALS
      for (const category of adjustedNonEssentialCategories) {
        const catTxs = nonEssentialTransactions.filter(tx => tx.category_id === category.id);
        let categoryBudget = Math.round(nonEssentialsAllocation * (category.adjustedProportion / 100));

        const fixedTxs = catTxs.filter(tx => tx.isfixedamount === "Yes");
        const variableTxs = catTxs.filter(tx => tx.isfixedamount !== "Yes");

        // Allocate fixed transactions
        for (const tx of fixedTxs) {
          const allocation =  Math.min(tx.amount, categoryBudget);
          categoryBudget -= allocation;
          const updatedTx = { ...tx, amount: allocation };
          try {
            await updateTransaction(updatedTx);
          } catch (error) {
            console.error(`Error updating fixed non-essential transaction ${tx.id}:`, error);
            alert(`An error occurred while saving expense ${tx.description}.`);
          }
        }

        // Allocate remaining funds to variable transactions so that categoryBudget is fully used
        if (variableTxs.length > 0) {
          const equalShare = Math.floor(categoryBudget / variableTxs.length);
          let remainder = categoryBudget % variableTxs.length;
          if (categoryBudget === 0){
            for (const tx of variableTxs) {
             
              const updatedTx = {
                ...tx, amount: 0
              };
              try {
                await updateTransaction(updatedTx);
              } catch (error) {
                console.error(`Error updating variable essential transaction ${tx.id}:`, error);
                alert(`An error occurred while saving expense ${tx.description}.`);
              }
            }
          } else{
            for (const tx of variableTxs) {
              let allocation = equalShare;
              if (remainder > 0) {
                allocation += 1;
                remainder--;
              }
              categoryBudget -= allocation;
              const updatedTx = {
                ...tx,
                amount: Math.round(allocation / (tx.interval || 1)),
              };
              try {
                await updateTransaction(updatedTx);
              } catch (error) {
                console.error(`Error updating variable non-essential transaction ${tx.id}:`, error);
                alert(`An error occurred while saving expense ${tx.description}.`);
              }
            }
          }
        }
      }

      await fetchData();
      alert('Budget Plan Generated Successfully!');
    } catch (error) {
      console.error('Unexpected error while saving expenses:', error);
      alert('An unexpected error occurred while saving expenses.');
    }
  };

  return {
    handleSaveExpense,
  };
}
