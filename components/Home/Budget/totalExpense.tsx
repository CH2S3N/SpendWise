import { RootState } from '@/state/store';
import calculateMonthlyAmount from '@/utils/calcMonthlyAmount';
import { useSelector } from 'react-redux';

const TotalExpense = () => {
  const { transactions } = useSelector((state: RootState) => state.data);
  
  const totalExpenses = transactions.reduce((total, transaction) => {
      return total + (transaction.amount)
  }, 0);

  return totalExpenses
};

export default TotalExpense;