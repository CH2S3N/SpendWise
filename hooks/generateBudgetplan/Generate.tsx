import { Category, Income } from '@/types';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { UseTransactionService } from '../editData/TransactionService';
import { useFetchData } from '../useFetchData';

export default function GenerateService() {
  const { fetchData } = useFetchData();
  const { categories, transactions, incomes } = useSelector((state: RootState) => state.data);
  const { updateTransaction } = UseTransactionService();
  const { needs, wants, savings } = useSelector((state: RootState) => state.budget);


  // Returns subcategories with Transactions 
  const adjustProportions = (categories: Category[], transactions: any[]) => {
    const availableCategories = categories.filter(cat => transactions.some(transaction => transaction.category_id === cat.id));
    const totalProportion = availableCategories.reduce((total, cat) => total + cat.proportion, 0);
    return availableCategories.map(cat => ({
      ...cat,
      adjustedProportion: totalProportion > 0 ? (cat.proportion / totalProportion) * 100 : 0,
    }));
  };

  // total Income of the user
  const totalIncome =  incomes.reduce((total: number, income: Income) => {
    return total + (income.amount * income.interval)
  }, 0);

  const handleSaveExpense = async () => {
    const budget = totalIncome
    
    const scaledNeeds = (needs / (needs + wants)) * (100 - savings);
    const scaledWants = (wants / (needs + wants)) * (100 - savings);
    
    const essentialsAllocation = Math.round(budget * (scaledNeeds / 100));
    const nonEssentialsAllocation = Math.round(budget * (scaledWants / 100));


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

    adjustedEssentialCategories.sort((a, b) => b.adjustedProportion - a.adjustedProportion);
    adjustedNonEssentialCategories.sort((a, b) => b.adjustedProportion - a.adjustedProportion);

    try {
      //ESSENTIALS
      for (const category of adjustedEssentialCategories) {
        const catTxs = essentialTransactions.filter(transaction => transaction.category_id === category.id);
        let categoryBudget = Math.round(essentialsAllocation * (category.adjustedProportion / 100));
    
        const fixedTransactions = catTxs.filter(transaction => transaction.isfixedamount === "Yes");
        const variableTransactions = catTxs.filter(transaction => transaction.isfixedamount !== "Yes");
    
        // Allocate fixed transactions first 
        for (const transaction of fixedTransactions) {
          const allocation = Math.min((transaction.amount * transaction.interval), categoryBudget);
          categoryBudget -= allocation;
          const updatedTx = { ...transaction, amount: allocation };
          try {
            await updateTransaction(updatedTx);
          } catch (error) {
            console.error(`Error updating fixed essential transaction ${transaction.id}:`, error);
            alert(`An error occurred while saving expense ${transaction.description}.`);
          }
        }
    
        // Allocate remaining funds to variable transactions
        let remainingBudget = categoryBudget;
        let allocatedAmounts = [];
        
        if (variableTransactions.length > 0) {
          const equalShare = Math.floor(remainingBudget / variableTransactions.length);
          let remainder = remainingBudget % variableTransactions.length;
    
          for (let i = 0; i < variableTransactions.length; i++) {
            let allocation = equalShare;
            if (remainder > 0) {
              allocation += 1;
              remainder--;
            }
            
            allocatedAmounts.push({ tx: variableTransactions[i], amount: allocation });
          }
    
          // Ensure last transaction takes any remaining unallocated budget
          const totalAllocated = allocatedAmounts.reduce((sum, { amount }) => sum + amount, 0);
          const difference = remainingBudget - totalAllocated;
          if (difference !== 0 && allocatedAmounts.length > 0) {
            allocatedAmounts[allocatedAmounts.length - 1].amount += difference;
          }
    
          // Save transactions
          for (const { tx, amount } of allocatedAmounts) {
            const updatedTx = { ...tx, amount: Math.round(amount) };
            try {
              await updateTransaction(updatedTx);
            } catch (error) {
              console.error(`Error updating variable essential transaction ${tx.id}:`, error);
              alert(`An error occurred while saving expense ${tx.description}.`);
            }
          }
        }
    }
    

      // NON-ESSENTIALS
      for (const category of adjustedNonEssentialCategories) {
        const catTxs = nonEssentialTransactions.filter(transaction => transaction.category_id === category.id);
        let categoryBudget = Math.round(nonEssentialsAllocation * (category.adjustedProportion / 100));
    
        const fixedTransactions = catTxs.filter(transaction => transaction.isfixedamount === "Yes");
        const variableTransactions = catTxs.filter(transaction => transaction.isfixedamount !== "Yes");
    
        // Allocate fixed transactions first 
        for (const transaction of fixedTransactions) {
          const allocation = Math.min((transaction.amount * transaction.interval), categoryBudget);
          categoryBudget -= allocation;
          const updatedTx = { ...transaction, amount: allocation };
          try {
            await updateTransaction(updatedTx);
          } catch (error) {
            console.error(`Error updating fixed essential transaction ${transaction.id}:`, error);
            alert(`An error occurred while saving expense ${transaction.description}.`);
          }
        }
    
        // Allocate remaining funds to variable transactions
        let remainingBudget = categoryBudget;
        let allocatedAmounts = [];
        
        if (variableTransactions.length > 0) {
          const equalShare = Math.floor(remainingBudget / variableTransactions.length);
          let remainder = remainingBudget % variableTransactions.length;
    
          for (let i = 0; i < variableTransactions.length; i++) {
            let allocation = equalShare;
            if (remainder > 0) {
              allocation += 1;
              remainder--;
            }
            
            allocatedAmounts.push({ tx: variableTransactions[i], amount: allocation });
          }
    
          // Ensure last transaction takes any remaining unallocated budget
          const totalAllocated = allocatedAmounts.reduce((sum, { amount }) => sum + amount, 0);
          const difference = remainingBudget - totalAllocated;
          if (difference !== 0 && allocatedAmounts.length > 0) {
            allocatedAmounts[allocatedAmounts.length - 1].amount += difference;
          }
    
          // Save transactions
          for (const { tx, amount } of allocatedAmounts) {
            const updatedTx = { ...tx, amount: Math.round(amount) };
            try {
              await updateTransaction(updatedTx);
            } catch (error) {
              console.error(`Error updating variable essential transaction ${tx.id}:`, error);
              alert(`An error occurred while saving expense ${tx.description}.`);
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
