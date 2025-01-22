import { RootState } from "@/state/store";
import { Income } from "@/types";
import { useSelector } from "react-redux";
import calculateMonthlyAmount from "./calcMonthlyAmount";



const incomes: Income[] = useSelector((state: RootState) => state.data.incomes);

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