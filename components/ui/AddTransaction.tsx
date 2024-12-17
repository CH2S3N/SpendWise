import { Goal, Income, Transaction, User } from "@/types";
import * as React from "react";
import {  View } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import AddButton from "../buttons/AddButton";
import AddExpense from "./AddExpense";
import AddGoal from "./AddGoal";
import AddBudget from "./AddBudget";
import AddIncome from "./addIncome";




export default function AddTransaction ({
    insertTransaction, insertGoal, insertBudget, insertIncome, 
}: {
    insertTransaction(transaction: Transaction ): Promise<void>;
    insertGoal(goal: Goal): Promise<void>;
    insertBudget(user: User): Promise<void>;
    insertIncome(income: Income): Promise<void>;
}) {
    const [isAddingTransaction, setIsAddingTransaction] = React.useState<boolean>(false);
    const [isUpdatingTransaction, setIsUpdatingTransaction] = React.useState<boolean>(false);
    const [selectedTypeIndex, setselectedTypeIndex] = React.useState<number>(0);
    // Return function of the Add transaction
    return (
        <View>
        {isAddingTransaction? (
          <View>
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
                  //  <AddBudget setIsAddingTransaction={setIsAddingTransaction} insertBudget={insertBudget}/>
                  <AddIncome setIsAddingTransaction={setIsAddingTransaction} setIsUpdatingTransaction={setIsUpdatingTransaction} insertIncome={insertIncome} />
                )}
          </View>
        ) : (
          <AddButton setIsAddingTransaction={setIsAddingTransaction} />
        )}
      </View>
    );
}