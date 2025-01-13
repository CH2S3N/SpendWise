import { Goal, Income, Transaction, User } from "@/types";
import * as React from "react";
import {  StyleSheet, View } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import AddExpense from "./AddExpense";
import AddGoal from "./AddGoal";
import AddIncome from "./addIncome";
import AddButton from "../buttons/AddButton";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "@/constants/colors";




export default function AddTransaction ({
    insertTransaction, insertGoal, insertIncome, setIsAddingTransaction
}: {
    insertTransaction(transaction: Transaction ): Promise<void>;
    insertGoal(goal: Goal): Promise<void>;
    insertIncome(income: Income): Promise<void>;
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [isAddingTransaction, ] = React.useState<boolean>(false);
    const [isUpdatingTransaction, setIsUpdatingTransaction] = React.useState<boolean>(false);
    const [selectedTypeIndex, setselectedTypeIndex] = React.useState<number>(0);
    // Return function of the Add transaction
    return (
        <View style={styles.container}>
               <SegmentedControl
                  values={['Expense', 'Goal', 'Income']}
                  selectedIndex={selectedTypeIndex}
                  onChange={(event) => setselectedTypeIndex(event.nativeEvent.selectedSegmentIndex)}
                />
                {/* Expense Form */}
                 {selectedTypeIndex === 0 && ( 
                  <AddExpense setIsAddingTransaction={setIsAddingTransaction} insertTransaction={insertTransaction} setIsUpdatingTransaction={setIsUpdatingTransaction}/>
                )}
                  {/* Goal Form */}
                 {selectedTypeIndex === 1 && ( 
                  <AddGoal setIsAddingTransaction={setIsAddingTransaction} insertGoal={insertGoal}/>
                )}
                {/* Budget Form */}
                 {selectedTypeIndex === 2 && ( 
                  <AddIncome setIsAddingTransaction={setIsAddingTransaction} setIsUpdatingTransaction={setIsUpdatingTransaction} insertIncome={insertIncome} />
                )}
          </View>
    );
}

const styles = StyleSheet.create({
  container:{
  width: '95%',
  height: '90%',

  }
})