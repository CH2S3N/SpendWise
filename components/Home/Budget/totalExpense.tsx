import { RootState } from '@/state/store';
import calculateMonthlyAmount from '@/utils/calcMonthlyAmount';
import { useSelector } from 'react-redux';

const TotalExpense = () => {
  const { transactions } = useSelector((state: RootState) => state.data);
  
  const totalExpenses = transactions.reduce((total, transaction) => {
    const amount = (transaction.amount * transaction.interval) || 0;
      const frequency = transaction.frequency || 'Monthly';
      return total + calculateMonthlyAmount(amount, frequency);
  }, 0);

  return totalExpenses
};

export default TotalExpense;