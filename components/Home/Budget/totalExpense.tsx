import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

const TotalExpense = () => {
  const { transactions } = useSelector((state: RootState) => state.data);
  
  const totalExpenses = transactions.reduce((total, transaction) => {
    return (total + (transaction.amount * transaction.interval) || 0)
  }, 0);

  return totalExpenses
};

export default TotalExpense;