import { View, TextInput, Button } from 'react-native'
import React from 'react'
import Card from './Card';
import { Goal } from '@/types';

export default function AddGoal({
    setIsAddingTransaction, 
    insertGoal,
}: {
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
    insertGoal(goal: Goal): Promise<void>;
}) {
    const [amount, setAmount] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");

    async function handleSaveExpense() {
        console.log ({
            name,
            amount: Number(amount),
        });

        // to insert transactions
        await insertGoal({
          name,
          amount: Number(amount),
          id: 0
        });
        setName("");
        setAmount("");
        setIsAddingTransaction(false);
    }

  return (
    <Card content={
      <>
        {/* DESCRIPTION */}
        <TextInput
          placeholder="Provide an entry description"
          style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black'}}
          onChangeText={setName}
        />
        <TextInput
          placeholder="₱Amount"
          style={{ fontSize: 32, marginBottom: 15, fontWeight: "bold" }}
          keyboardType="numeric"
          onChangeText={(text) => {
            // Remove any non-numeric characters before setting the state
            const numericValue = text.replace(/[^0-9.]/g, "");
            setAmount(numericValue);
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

