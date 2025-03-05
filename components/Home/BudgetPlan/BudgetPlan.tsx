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
          return total + (transaction.amount * transaction.interval || 0)
      }, 0);

  const essentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
  );
  const nonEssentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential"
  );

  return (
    <ScrollView style={styles.container}>
      {/* Income Section */}
      <View style={styles.container}>
        <Text style={styles.header}>INCOME</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.celltitle}>Item</Text>
            <Text style={styles.celltitle}>Category</Text>
            <Text style={styles.celltitle}>Recurrence</Text>
            <Text style={styles.celltitle}>Income per Occurrence</Text>
            <Text style={styles.celltitle}>Total Amount</Text>
          </View>
          {incomes.map((income) => {
                return (
                    <View key={income.id} style={styles.row}>
                      <Text style={styles.cell}>{income.description}</Text>
                      <Text style={styles.cell}>{income.type}</Text>
                      <Text style={styles.cell}>{income.frequency}/ {income.subtype} ({income.interval})</Text>
                      <Text style={styles.cell}>₱ {income.amount}</Text>
                      <Text style={styles.cell}>₱ {income.amount  * income.interval}</Text>
                </View>
                )
              })}  
        </View>

      </View>

      {/* Expenses Section */}
      {nonEssentialTransactions.length <= 0 ? (
        <>
          {/* Expense */}
          <View style={styles.container}>
            <Text style={styles.header}>Expenses</Text>
            <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.celltitle}>Item</Text>
              <Text style={styles.celltitle}>Category</Text>
              <Text style={styles.celltitle}>Recurrence</Text>
              <Text style={styles.celltitle}>Budget per Occurrence</Text>
              <Text style={[styles.celltitle, {}]}>Total Amount</Text>
            </View>
              {transactions.map((transaction) => {
                const categoryInfo = categories.find(
                (category) => category.id === transaction.category_id
                )
              return (
                <View key={transaction.id} style={styles.row}>
                  <Text style={styles.cell}>{transaction.description}</Text> 
                  <Text style={styles.cell}>{categoryInfo?.name}</Text> 
                  <Text style={styles.cell}>{transaction.frequency}
                    {transaction.subtype === "Custom" ? (null) : (<Text>/{transaction.subtype}</Text>)} ({transaction.interval})</Text>
                  <Text style={[styles.cell, {}]}>₱ {Math.round(transaction.amount)}</Text>
                  <Text style={[styles.cell, {}]}>₱ {transaction.amount * transaction.interval}</Text>
                </View>
              )})}
            </View>
          </View>
        </>
      ) : (

        <>
        {/* Needs */}
          <View style={styles.container}>
            <Text style={styles.header}>Essentials (Basic Needs)</Text>
            <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.celltitle}>Item</Text>
              <Text style={styles.celltitle}>Category</Text>
              <Text style={styles.celltitle}>Recurrence</Text>
              <Text style={styles.celltitle}>Budget per Occurrence</Text>
              <Text style={styles.celltitle}>Total Amount</Text>
            </View>
              {essentialTransactions.map((transaction) => {
                const categoryInfo = categories.find(
                (category) => category.id === transaction.category_id
                )
              return (
                <View key={transaction.id} style={styles.row}>
                  <Text style={styles.cell}>{transaction.description}</Text> 
                  <Text style={styles.cell}>{categoryInfo?.name}</Text> 
                  <Text style={styles.cell}>{transaction.frequency}
                    {transaction.subtype === "Custom" ? (null) : (<Text>/{transaction.subtype}</Text>)} ({transaction.interval})</Text>
                  <Text style={[styles.cell, {}]}>₱ {Math.round(transaction.amount)}</Text>
                  <Text style={[styles.cell, {}]}>₱ {transaction.amount * transaction.interval}</Text>
                </View>
              )})}
            </View>
          </View>
        {/* Wants */}
          <View style={styles.container}>
            <Text style={styles.header}>Non-Essentials (Wants & Optional Spending)</Text>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.celltitle}>Item</Text>
                <Text style={styles.celltitle}>Category</Text>
                <Text style={styles.celltitle}>Recurrence</Text>
                <Text style={styles.celltitle}>Budget per Occurrence</Text>
                <Text style={styles.celltitle}>Total Amount</Text>
              </View>
              {nonEssentialTransactions.map((transaction) => {
                const categoryInfo = categories.find(
                (category) => category.id === transaction.category_id
                )
              return (
                <View key={transaction.id} style={styles.row}>
                  <Text style={styles.cell}>{transaction.description}</Text> 
                  <Text style={styles.cell}>{categoryInfo?.name}</Text> 
                  <Text style={styles.cell}>{transaction.frequency}
                    {transaction.subtype === "Custom" ? (null) : (<Text>/{transaction.subtype}</Text>)} ({transaction.interval})</Text>
                  <Text style={[styles.cell, {}]}>₱ {Math.round(transaction.amount)}</Text>
                  <Text style={[styles.cell, {}]}>₱ {transaction.amount * transaction.interval}</Text>
                </View>
              )})}
            </View>
          </View>
        </>
      )}


      {/* Summary Section */}
      {/* Wants */}
      <View style={styles.container}>
        <Text style={styles.header}>SUMMARY</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.celltitle}>Category</Text>
            <Text style={styles.celltitle}>Total Amount</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Income</Text>
            <Text style={styles.cell}>₱ {totalIncome}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Expense</Text>
            <Text style={styles.cell}>₱ {totalExpense}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Savings</Text>
            <Text style={styles.cell}>₱ {totalIncome - totalExpense}</Text>
          </View>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: 'center',
    color: "#333",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },

  celltitle: {
    flex: 1,
    padding: 5,
    textAlignVertical: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    textAlignVertical: 'center',
    textAlign: "center",
    fontSize: 12,
    color: "#333",
  },
  cellAmount: {
    textAlign: "right",
    fontWeight: "bold",
  },
});



export default BudgetPlanner;
