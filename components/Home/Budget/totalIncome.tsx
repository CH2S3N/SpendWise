
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Income } from '@/types';

export default function Budget() {
  const { incomes } = useSelector((state: RootState) => state.data);

  const totalIncome =  incomes.reduce((total: number, income: Income) => {
      return total + (income.amount)
    }, 0);

  return totalIncome;
}