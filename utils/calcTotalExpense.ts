import { Category, Transaction } from "@/types";


export const calculateTotalExpense = (transactions: Transaction[], categories: Category[], type: string): number => {
  const filteredTransactions = transactions.filter((transaction) =>
      categories.find((category) => category.id === transaction.category_id)?.type === type
    );

    return filteredTransactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
  };


  