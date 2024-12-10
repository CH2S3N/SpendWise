import { View, TextInput, Button } from 'react-native'
import React from 'react'
import Card from './Card';
import { Goal } from '@/types';

export default function UpdateGoal({
    updateGoal,
    setIsUpdatingGoal, 
    setIsModalVisible,
    currentGoal,
}: {
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsUpdatingGoal: React.Dispatch<React.SetStateAction<boolean>>;
    updateGoal(goal: Goal): Promise<void>;
    currentGoal: Goal;
}) {
    const [amount, setAmount] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");

    React.useEffect(() => {
      if (currentGoal) {
        setName(currentGoal.name || "");
        setAmount(String(currentGoal.amount || ""));
       
      }
    }, [currentGoal]);



    async function handleUpdateGoal() {
        console.log ({
            id: currentGoal.id,
            name,
            amount: Number(amount),
        });

        // to insert transactions
        await updateGoal({
          id: currentGoal.id,
          name,
          amount: Number(amount),
        });
        setName("");
        setAmount("");
        setIsUpdatingGoal(false);
        setIsModalVisible(false);
    }

  return (
  <Card content={
      <>
        {/* DESCRIPTION */}
        <TextInput
          placeholder="Provide an entry description"
          style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black'}}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="₱Amount"
          style={{ fontSize: 32, marginBottom: 15, fontWeight: "bold" }}
          value={amount}
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
          <Button title="Cancel" color={'black'} onPress={() => {
            setIsUpdatingGoal(false)
            setIsModalVisible(false);
          }}
          />
          <Button title="Save" color={'black'} onPress={handleUpdateGoal} />
        </View>
      </>
    }>
  </Card>
  )
}

