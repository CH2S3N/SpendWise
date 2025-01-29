import { Goal, Income, Transaction, User } from "@/types";
import * as React from "react";
import {  StyleSheet, View, Text } from "react-native";
import { Button } from "@rneui/base";





export default function GenerateBudgetPlan ({
  setIsAddingBudgetPlan, insertTransaction, insertGoal, insertIncome,
}: {
    setIsAddingBudgetPlan: React.Dispatch<React.SetStateAction<boolean>>;
     insertTransaction(transaction: Transaction ): Promise<void>;
    insertGoal(goal: Goal): Promise<void>;
    insertIncome(income: Income): Promise<void>;
}) {
   
    return (
        <View>
          <Text>Generate A budget Plan</Text>
          <Button onPress={() => setIsAddingBudgetPlan(false)}><Text>Back</Text></Button>
        </View>
    );
}

const styles = StyleSheet.create({
  container:{
  width: '95%',
  height: '90%',

  }
})