import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import Card from './Card';
import { User } from '@/types';


export default function AddBudget({
    setIsAddingTransaction, 
    insertBudget,
}: {
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
    insertBudget(user: User): Promise<void>;
}) {
    const [budget_Amount, setBudgetAmount] = React.useState<string>("");
   

    async function handleSaveExpense() {
        console.log ({
          budget_Amount: Number(budget_Amount),
          id: 1,
 
        });

        // to insert Budget
        await insertBudget({
          budget_Amount: Number(budget_Amount),
          id: 1,
          userName: ''
        });
        setBudgetAmount("");
        setIsAddingTransaction(false);
        
    }
    
  return (
    
    <Card content={
      <>
        <TextInput
          placeholder="₱Amount"
          style={{ fontSize: 32, marginBottom: 15, fontWeight: "bold" }}
          keyboardType="numeric"
          onChangeText={(text) => {
            // Remove any non-numeric characters before setting the state
            const numericValue = text.replace(/[^0-9.]/g, "");
            setBudgetAmount(numericValue);
          }}
        />

        {/* Cancel and Save Button */}
        <View
          style={{ flexDirection: "row", justifyContent: "space-around" }}
        >
          <Button title="Cancel" color={'black'} onPress={() => setIsAddingTransaction(false)}
          />
          <Button title="Save" color={'black'} onPress={handleSaveExpense} />
        </View>
      </>
    }>
  </Card>
  )
}
