import { IncomeCategory, Transaction, Income} from "@/types";
import calculateMonthlyAmount from "./calcMonthlyAmount";


export const calculateTotalIncome = (incomes: Income[], categories: IncomeCategory[], type: string): number => {
    const filteredIncome = incomes.filter((income) =>
      categories.find((category) => category.id === income.incomeCategory_id)?.type === type
    );
  
    return filteredIncome.reduce((total, income) => {
      return total + calculateMonthlyAmount(income.amount, income.frequency);
    }, 0);
  };
