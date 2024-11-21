import { Category, Goal, Transaction, User } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import * as React from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Card from "./Card";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import AntDesign from '@expo/vector-icons/AntDesign';
import AddButton from "../buttons/AddButton";
import AddExpense from "./AddExpense";
import AddGoal from "./AddGoal";
import AddBudget from "./AddBudget";





export default function AddTransaction ({
    insertTransaction, insertGoal, insertBudget, 
}: {
    insertTransaction(transaction: Transaction): Promise<void>;
    insertGoal(goal: Goal): Promise<void>;
    insertBudget(user: User): Promise<void>;
   
}) {
    const [isAddingTransaction, setIsAddingTransaction] = React.useState<boolean>(false);
    const [selectedTypeIndex, setselectedTypeIndex] = React.useState<number>(0);

    // Return function of the Add transaction
    return (
        <View style={styles.container}>
        {isAddingTransaction? (
          <View >
               <SegmentedControl
                  values={['Expense', 'Goal', 'Budget']}
                  selectedIndex={selectedTypeIndex}
                  onChange={(event) => setselectedTypeIndex(event.nativeEvent.selectedSegmentIndex)}
                />
                {/* Expense Form */}
                 {selectedTypeIndex === 0 && ( 
                  <AddExpense setIsAddingTransaction={setIsAddingTransaction} insertTransaction={insertTransaction} />
                )}
                  {/* Goal Form */}
                 {selectedTypeIndex === 1 && ( 
                  <AddGoal setIsAddingTransaction={setIsAddingTransaction} insertGoal={insertGoal}/>
                 
                )}
                {/* Budget Form */}
                 {selectedTypeIndex === 2 && ( 
                   <AddBudget setIsAddingTransaction={setIsAddingTransaction} insertBudget={insertBudget}/>
                )}
          </View>

        ) : (
          <AddButton setIsAddingTransaction={setIsAddingTransaction} />
        )}
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  item: {
    height: '100%'
  }
})

