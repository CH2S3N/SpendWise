import { Category, Transaction } from "@/types";
import calculateMonthlyAmount from "./calcMonthlyAmount";


export const calculateTotal = (transactions: Transaction[], categories: Category[], type: string): number => {
    const filteredTransactions = transactions.filter((transaction) =>
      categories.find((category) => category.id === transaction.category_id)?.type === type
    );
  
    return filteredTransactions.reduce((total, transaction) => {
      return total + calculateMonthlyAmount(transaction.amount, transaction.frequency);
    }, 0);
  };
