import { View, TextInput, Button, Text, StyleSheet } from 'react-native'
import React from 'react'
import Card from './Card';
import { Goal } from '@/types';
import { UseTransactionService } from '@/hooks/editData/TransactionService';

export default function AddGoal({
    setIsAddingTransaction, 
}: {
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
      const { insertGoal } = UseTransactionService();
    


    const [amount, setAmount] = React.useState<string>("");
    const [currentAmount, setCurrentAmount] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");


    function validateFields() {
      if ( !amount || !name ) {
        return false;
      }
      
      return true;
    }



    async function handleSaveExpense() {
        console.log ({
            name,
            amount: Number(amount),
            currentAmount: Number(currentAmount),
        });

        // to insert transactions
        await insertGoal({
          name,
          amount: Number(amount),
          currentAmount: Number(currentAmount),
          id: 0
        });
        setName("");
        setAmount("");
        setIsAddingTransaction(false);
    }

  return (

    <View style={styles.container}>
    <View style={styles.content}>
      {/* DESCRIPTION */}
      <Text style={styles.btext}>Item</Text>
      <TextInput
        placeholder="Enter Item Name"
        style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black'}}
        onChangeText={setName}
      />
    </View>

    <View style={styles.content}>
        <Text style={styles.btext}>Amount</Text>
      <TextInput
        placeholder="Enter Amount"
        style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black' }}
        keyboardType="numeric"
        onChangeText={(text) => {
          // Remove any non-numeric characters before setting the state
          const numericValue = text.replace(/[^0-9.]/g, "");
          setAmount(numericValue);
        }}
      />
    </View>

    <View style={styles.content}>
      <Text style={styles.btext}>Initial Amount</Text>
      <TextInput
        placeholder="Enter Amount"
        style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black' }}
        keyboardType="numeric"
        onChangeText={(text) => {
          // Remove any non-numeric characters before setting the state
          const numericValue = text.replace(/[^0-9.]/g, "");
          setCurrentAmount(numericValue);
        }}
      />
    </View>

      {/* Cancel and Save Button */}
      <View style={styles.btn}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-around" }}
        >
          <Button title="Cancel" color={'black'} onPress={() => setIsAddingTransaction(false)}
          />
          <Button title="Save" color={'black'} onPress={handleSaveExpense} disabled={!validateFields()}/>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container:{
    height: '100%',
  },
  btn:{
    flex: 1,
    flexDirection: 'column-reverse',
    paddingBottom: 20
  },
  content:{
    paddingTop: 10
  },
  btext:{
    fontWeight: 'bold'
  }
})