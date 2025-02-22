import { Goal, Transaction, User } from "@/types";
import * as React from "react";
import { Text, View } from "react-native";
import Card from "./Card";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import AddButton from "../buttons/AddButton";
import AddTransaction from "./AddTransaction";

export default function PickType ({
    insertTransaction, insertGoal,insertBudget
}: {
    insertTransaction(transaction: Transaction): Promise<void>;
    insertGoal(goal: Goal): Promise<void>;
    insertBudget(user: User): Promise<void>;
}) {
    const [isAddingTransaction, setIsAddingTransaction] = React.useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = React.useState<number>(1);


    return (
        <View style={{ marginBottom: 15}}>
        {isAddingTransaction ? (
          <View>
            <Card content={
              <View>
              <Text style={{ marginBottom: 6 }}>What do you want to Add?</Text>
              <SegmentedControl
                values={['Expense', 'Goal', 'Budget']}
                selectedIndex={selectedIndex}
                onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
              />

              {selectedIndex === 0 && ( 
               <AddTransaction setIsAddingTransaction={setIsAddingTransaction}/>
              )}
            </View>
            }/>

          </View>

        ) : (
          <AddButton setIsAddingTransaction={setIsAddingTransaction} />
        )}
      </View>
    );
}

