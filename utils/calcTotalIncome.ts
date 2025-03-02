import { Income } from "@/types";

export const calculateTotalIncome = (incomes: Income[], type: string): number => {
  const filteredIncome = incomes.filter((income) => income.type === type);

  return filteredIncome.reduce((total, income) => {
    return total + income.amount
  }, 0);
};
