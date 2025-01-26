import { Category, Income } from '@/types';
import calculateMonthlyAmount from '@/utils/calcMonthlyAmount';
import { RootState } from '@/state/store';
import { useSelector, useDispatch } from 'react-redux';
import { UseTransactionService } from '../editData/TransactionService';
import { useFetchData } from '../useFetchData';

export default function GenerateService() {
  const { fetchData } = useFetchData();
  
  const { categories, transactions, incomes } = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();
  const { updateTransaction } = UseTransactionService();
  const { needs, wants, savings } = useSelector((state: RootState) => state.budget); 
  

  const calcMonthAmount = (incomes: Income[]): number => {
    return incomes.reduce((total: number, income: Income) => {
      const amount = income.amount || 0;
      const frequency = income.frequency || 'Monthly';
      return total + calculateMonthlyAmount(amount, frequency);
    }, 0);
  };

  const adjustProportions = (categories: Category[], transactions: any[]) => {
    const availableCategories = categories.filter(cat =>
      transactions.some(tx => tx.category_id === cat.id)
    );
    const totalProportion = availableCategories.reduce((total, cat) => total + cat.proportion, 0);
    return availableCategories.map(cat => ({
      ...cat,
      adjustedProportion: (cat.proportion / totalProportion) * 100,
    }));
  };

  const handleSaveExpense = async () => {
    const budget = calcMonthAmount(incomes);
    const essentials = budget * (needs / 100);
    const nonEssentials = budget * (wants / 100);
    const difference = budget * (savings / 100);

    const essentialTransactions = transactions.filter((transaction) =>
      categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
    );
    const nonEssentialTransactions = transactions.filter((transaction) =>
      categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential"
    );

    const adjustedEssentialCategories = adjustProportions(
      categories.filter(cat => cat.type === "Essential"),
      essentialTransactions
    );
    const adjustedNonEssentialCategories = adjustProportions(
      categories.filter(cat => cat.type === "Non_Essential"),
      nonEssentialTransactions
    );

    try {
      // Update all essential transactions
      for (const category of adjustedEssentialCategories) {
        const categoryTransactions = essentialTransactions.filter(tx => tx.category_id === category.id);
        const categoryAmount = Math.round(essentials * (category.adjustedProportion / 100));

        const amountPerTransaction = categoryTransactions.length > 0
          ? Math.round(categoryAmount / categoryTransactions.length)
          : 0;

        for (const transaction of categoryTransactions) {
          const updatedTransaction = {
            ...transaction,
            amount:Math.round(amountPerTransaction / transaction.interval), 
            isfixedamount: 'Yes' as 'Yes' | 'No',
          };

          try {
            await updateTransaction(updatedTransaction);
          } catch (error) {
            console.error(`Error updating essential transaction ${transaction.id}:`, error);
            alert(`An unexpected error occurred while saving expense ${transaction.description}.`);
          }
        }
      }

      // Update all non-essential transactions
      for (const category of adjustedNonEssentialCategories) {
        const categoryTransactions = nonEssentialTransactions.filter(tx => tx.category_id === category.id);
        const categoryAmount = Math.round(nonEssentials * (category.adjustedProportion / 100));

        const amountPerTransaction = categoryTransactions.length > 0 ? Math.round(categoryAmount / categoryTransactions.length): 0;

        for (const transaction of categoryTransactions) {
          const isSubscription = transaction.category_id === 9; 
          const updatedTransaction = {
            ...transaction,
            amount: category.name === "Subscription" ?  transaction.amount: Math.round(amountPerTransaction / transaction.interval),
            isfixedamount: 'Yes' as 'Yes' | 'No',
          };

          try {
            await updateTransaction(updatedTransaction);
          } catch (error) {
            console.error(`Error updating non-essential transaction ${transaction.id}:`, error);
            alert(`An unexpected error occurred while saving expense ${transaction.description}.`);
          }
        }
      }
      await fetchData(); // Re-fetch the latest data after the updates

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

