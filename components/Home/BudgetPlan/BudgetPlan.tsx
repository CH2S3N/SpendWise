import { RootState } from "@/state/store";
import { Income, Transaction } from "@/types";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const BudgetPlanner = () => {
  const { categories, transactions, incomes } = useSelector(
    (state: RootState) => state.data
  );

    const totalIncome =  incomes.reduce((total: number, income: Income) => {
        return total + (income.amount * income.interval)
      }, 0);


        const totalExpense =  transactions.reduce((total: number, transaction: Transaction) => {
            return total + (transaction.amount || 0)
        }, 0);

  const essentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
  );
  const nonEssentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential"
  );

  const summedEssentialTransactions = Object.values(
    essentialTransactions.reduce((acc, transaction) => {
      const categoryName = categories.find(c => c.id === transaction.category_id)?.name || "Unknown";
      acc[categoryName] = acc[categoryName] || { count: 0, categoryName, amount: 0 };
      acc[categoryName].count += 1;
      acc[categoryName].amount += transaction.amount;
      return acc;
    }, {} as Record<string, { count: number; categoryName: string; amount: number }>)
  );
  const summedNonEssentialTransactions = Object.values(
    nonEssentialTransactions.reduce((acc, transaction) => {
      const categoryName = categories.find(c => c.id === transaction.category_id)?.name || "Unknown";
      acc[categoryName] = acc[categoryName] || { count: 0, categoryName, amount: 0 };
      acc[categoryName].count += 1;
      acc[categoryName].amount += transaction.amount;
      return acc;
    }, {} as Record<string, { count: number; categoryName: string; amount: number }>)
  );
  return (
    <ScrollView style={styles.container}>
      {/* Income Section */}
      <View style={styles.container}>
        <Text style={styles.header}>INCOME</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cell}>CATEGORY</Text>
            <Text style={styles.cell}>AMOUNT</Text>
          </View>
          {incomes.map((income) => {
                return (
                    <View key={income.id} style={styles.row}>
                      <Text style={styles.cell}>{income.type}</Text>
                      <Text style={styles.cell}>{income.amount * income.interval}</Text>
                </View>
                )
              })}  
        </View>

      </View>

      {/* Expenses Section */}
        <View style={styles.container}>
          <Text style={styles.header}>Essentials</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cell}>No. of Expense</Text>
                <Text style={styles.cell}>CATEGORY</Text>
              <Text style={styles.cell}>AMOUNT</Text>
            </View>
            {summedEssentialTransactions.map(({ count, categoryName, amount }) => (
              <View key={categoryName} style={styles.row}>
                <Text style={styles.cell}>{count}</Text> 
                <Text style={styles.cell}>{categoryName}</Text>
                <Text style={styles.cell}>{amount}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.header}>Non-Essentials</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cell}>No. of Expense</Text>
              <Text style={styles.cell}>CATEGORY</Text>
              <Text style={styles.cell}>AMOUNT</Text>
            </View>
            {summedNonEssentialTransactions.map(({ count, categoryName, amount }) => (
              <View key={categoryName} style={styles.row}>
                <Text style={styles.cell}>{count}</Text> 
                <Text style={styles.cell}>{categoryName}</Text>
                <Text style={styles.cell}>{amount}</Text>
              </View>
            ))}
          </View>
        </View>


      {/* Summary Section */}
      <View style={styles.container}>
        <Text style={styles.header}>SUMMARY</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cell}>CATEGORY</Text>
            <Text style={styles.cell}>AMOUNT</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Income</Text>
            <Text style={styles.cell}>{totalIncome}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Expense</Text>
            <Text style={styles.cell}>{totalExpense}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Savings</Text>
            <Text style={styles.cell}>{totalIncome - totalExpense}</Text>
          </View>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    textAlign: 'center'
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default BudgetPlanner;
