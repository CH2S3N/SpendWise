import { View, TextInput, Button, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Goal } from '@/types';
import { Divider } from '@rneui/base';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import Card from './Card';

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
    <Card
    content={
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Update Goal</Text>
      </View>
      {/* DESCRIPTION */}
      <View style={styles.content}>
        <Text style={styles.textTitle}>Item</Text>
          <TextInput
            placeholder="Provide an entry description"
            style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black' }}
            value={name}
            onChangeText={setName}
          />
      </View>
        {/* AMOUNT */}
        <View style={styles.content}>
        <Text style={styles.textTitle}>Total Amount</Text>
        <TextInput
          placeholder="₱Amount"
          style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black' }}
          value={amount}
          keyboardType="numeric"
          onChangeText={(text) => {
            // Remove any non-numeric characters before setting the state
            const numericValue = text.replace(/[^0-9.]/g, "");
            setAmount(numericValue);
          }}
        />
        </View>
        <Text style={styles.textTitle}>Accumulated Amount</Text>
        {/* ACCUMULATED AMOUNT */}
        <TextInput
          placeholder="Enter Amount"
          style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black' }}
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
       

        {/* Cancel and Save Button */}
        <View style={styles.btn}>
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
    </View>

    }
    />
  )
}

const styles = StyleSheet.create({
  header:{
    width: "100%",
    alignItems: "center",
    justifyContent:'center'
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold'
  },
  textTitle:{
    fontWeight: 'bold'
  },
  container:{
    flex:1,
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
