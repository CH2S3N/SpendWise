import { View, TextInput, Button, Text, StyleSheet } from 'react-native'
import React from 'react'
import Card from './Card';
import { Goal } from '@/types';
import { Divider } from '@rneui/base';
import { UseTransactionService } from '@/hooks/editData/TransactionService';

export default function UpdateGoal({
    setIsUpdatingGoal, 
    setIsModalVisible,
    currentGoal,
}: {
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsUpdatingGoal: React.Dispatch<React.SetStateAction<boolean>>;
    currentGoal: Goal;
}) {

    const { updateGoal } = UseTransactionService();
    
    const [amount, setAmount] = React.useState<string>("");
    const [accumulatedAmount, setAccumulatedAmount] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");

    React.useEffect(() => {
      if (currentGoal) {
        setName(currentGoal.name || "");
        setAmount(String(currentGoal.amount || ""));
        setAccumulatedAmount(String(currentGoal.currentAmount || ""));
       
      }
    }, [currentGoal]);

    function validateFields() {
      if ( !amount || !name || !accumulatedAmount ) {
        return false;
      }
      
      return true;
    }

    async function handleUpdateGoal() {
        console.log ({
            id: currentGoal.id,
            name,
            amount: Number(amount),
            accumulatedAmount: Number(accumulatedAmount)
        });

        // to insert transactions
        await updateGoal({
          id: currentGoal.id,
          name,
          amount: Number(amount),
          currentAmount: Number(accumulatedAmount)
        });
        setName("");
        setAmount("");
        setAccumulatedAmount("")
        setIsUpdatingGoal(false);
        setIsModalVisible(false);
    }

  return (
    <View >
      <View style={styles.header}>
        <Text style={styles.title}>Update Goal</Text>
      </View>
      <Text style={styles.textTitle}>Item</Text>
        {/* DESCRIPTION */}
        <TextInput
          placeholder="Provide an entry description"
          style={{ }}
          value={name}
          onChangeText={setName}
        />
        <Divider/>
        <Text style={styles.textTitle}>Total Amount</Text>
        {/* AMOUNT */}
        <TextInput
          placeholder="₱Amount"
          style={{}}
          value={amount}
          keyboardType="numeric"
          onChangeText={(text) => {
            // Remove any non-numeric characters before setting the state
            const numericValue = text.replace(/[^0-9.]/g, "");
            setAmount(numericValue);
          }}
        />
        <Divider/>
        <Text style={styles.textTitle}>Accumulated Amount</Text>
        {/* ACCUMULATED AMOUNT */}
        <TextInput
          placeholder="Enter Amount"
          style={{ }}
          value={accumulatedAmount}
          keyboardType="numeric"
          onChangeText={(text) => {
            // Remove any non-numeric characters before setting the state
            const numericValue = text.replace(/[^0-9.]/g, "");
            setAccumulatedAmount(numericValue);
          }}
          onBlur={() => {
            const numericAccumulatedAmount = parseFloat(accumulatedAmount);
            const numericAmount = parseFloat(amount);

            if (numericAccumulatedAmount > numericAmount) {
              setAccumulatedAmount(amount);
            }
          }}
        />
        <Divider style={{marginBottom: 20}}/>
       

        {/* Cancel and Save Button */}
        <View
          style={{ flexDirection: "row", justifyContent: "space-around" }}
        >
          <Button title="Cancel" color={'black'} onPress={() => {
            setIsUpdatingGoal(false)
            setIsModalVisible(false);
          }}
          />
          <Button title="Save" color={'black'} onPress={handleUpdateGoal}  disabled={!validateFields()}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header:{
    width: "100%",
    alignItems: "center",
    justifyContent:'center'
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  textTitle:{
    fontWeight: 'bold'
  },
  foot:{
    marginVertical: 15
  }
})
