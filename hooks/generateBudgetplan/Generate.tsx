import { Income } from '@/types';
import calculateMonthlyAmount from '@/utils/calcMonthlyAmount';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { UseTransactionService } from '../editData/TransactionService';


export default function GenerateService() {

  const { categories, transactions, incomes } = useSelector((state: RootState) => state.data);
  const { updateTransaction } = UseTransactionService();

  // Calculate the total monthly Income amount
  const calcMonthAmount = (incomes: Income[]): number => {
    return incomes.reduce((total: number, income: Income) => {
      const amount = income.amount || 0;
      const frequency = income.frequency || 'Monthly';
      return total + calculateMonthlyAmount(amount, frequency);
    }, 0);
  };
  const budget = calcMonthAmount(incomes);

  const essentials = budget * 0.5;
  const nonEssentials = budget * 0.3;
  const savings = budget * 0.2;



  // Filter Types
  const nonEssentialTransactions = transactions.filter((transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential");
  const essentialTransactions = transactions.filter((transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential");


  
 const handleSaveExpense = async () => {
  try {
    // Update each essential transaction
    for (const transaction of essentialTransactions) {
      const category = categories.find((cat) => cat.id === transaction.category_id);
      const updatedTransaction = {
        ...transaction,
        amount: essentials / essentialTransactions.length, // Update amount based on the budget allocation for Essentials
      };
      
      try {
        await updateTransaction(updatedTransaction); 
      } catch (error) {
        console.error(`Error updating essential transaction ${transaction.id}:`, error);
        alert(`Error updating essential transaction ${transaction.description}.`);
      }
    }

    // Update each non-essential transaction
    for (const transaction of nonEssentialTransactions) {
      const updatedTransaction = {
        ...transaction,
        amount: nonEssentials / nonEssentialTransactions.length, // Update amount based on the budget allocation for Non-Essentials
      };
      
      try {
        await updateTransaction(updatedTransaction); // Wrap in try-catch for each update
      } catch (error) {
        console.error(`Error updating non-essential transaction ${transaction.id}:`, error);
        // Optionally show an error message to the user, e.g., using an alert or toast
        alert(`Error updating non-essential transaction ${transaction.description}.`);
      }
    }

    // Optionally, show a success message
    alert('Expenses updated successfully!');

  } catch (error) {
    // Handle any unexpected errors that occur during the entire process
    console.error('Unexpected error while saving expenses:', error);
    alert('An unexpected error occurred while saving expenses.');
  }
};

return {
  handleSaveExpense,
}
}
