
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Income } from '@/types';
import calculateMonthlyAmount from '@/utils/calcMonthlyAmount';

export default function Budget() {
  const { incomes } = useSelector((state: RootState) => state.data);

  const totalIncome =  incomes.reduce((total: number, income: Income) => {
      const amount = (income.amount * income.interval) || 0;
      const frequency = income.frequency || 'Monthly';
      return total + calculateMonthlyAmount(amount, frequency);
    }, 0);

  return totalIncome;
}