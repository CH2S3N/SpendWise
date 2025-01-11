import { Income } from "@/types";
import calculateMonthlyAmount from "./calcMonthlyAmount";

export const calculateTotalIncome = (incomes: Income[], type: string): number => {
  const filteredIncome = incomes.filter((income) => income.type === type);

  return filteredIncome.reduce((total, income) => {
    return total + calculateMonthlyAmount(income.amount, income.frequency);
  }, 0);
};
