import { Category, Transaction } from "@/types";


export const calculateTotalExpense = (transactions: Transaction[], categories: Category[], type: string): number => {
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.type === "Non_Essential"
);


    return filteredTransactions.reduce((total, transaction) => {
      return total + transaction.amount * transaction.interval;
    }, 0);
  };


  