import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { Goal } from '@/types';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import { colors } from '@/constants/colors';
import ConfirmModal from '../Modal/ConfirmModal';
import Card from './Card';
import { useFetchData } from '@/hooks/useFetchData';
 
export default function UpdateGoal({
    setIsUpdatingGoal, 
    currentGoal,
}: {
    setIsUpdatingGoal: React.Dispatch<React.SetStateAction<boolean>>;
    currentGoal: Goal;
}) {
    const { fetchData } = useFetchData();
    const { updateGoal } = UseTransactionService();
    const [name, setName] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [accumulatedAmount, setAccumulatedAmount] = React.useState<string>("");
    const [isConfirmModalVisible, setIsConfirmModalVisible] = React.useState(false);
    
    React.useEffect(() => {
        if (currentGoal) {
            setName(currentGoal.name || "");
            setAmount(String(currentGoal.amount || ""));
            setAccumulatedAmount(String(currentGoal.currentAmount || ""));
        }
    }, [currentGoal]);

    
    async function handleUpdateGoal() {
      await updateGoal({
          id: currentGoal.id,
          name,
          amount: Number(amount),
          currentAmount: Number(accumulatedAmount),
      });
      setAccumulatedAmount("");
      setAmount("");
      setAmount("");
      setIsConfirmModalVisible(false);
      setIsUpdatingGoal(false);
      Alert.alert(
        "Goal",      
        "Goal Updated Successfully", 
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
  }


    function validateFields() {
        if ( amount === "" || name === "" || accumulatedAmount === ""){
        return false;
      }
      return true;
    }
  

    return (
      <>

        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>UPDATE GOAL</Text>
          </View>

          {/* Item Name Input */}
          <View style={styles.content}>
            <Text style={styles.textTitle}>Item</Text>
            <TextInput
              value={name}
              placeholder="Provide an Item Description"
              style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black'}}
              onChangeText={(txt) => {
                setName(
                  txt
                    .toLowerCase()
                    .replace(/\b\w/g, (char) => char.toUpperCase())
                )
                }}
                maxLength={25} 
            />
          </View>

          {/* Total Amount Input */}
          <View style={styles.content}>
            <Text style={styles.textTitle}>Total Amount</Text>
            <TextInput
              value={amount}
              placeholder="Enter Amount"
              style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black' }}
              keyboardType="numeric"
              onChangeText={(text) => {
                // Remove any non-numeric characters before setting the state
                let numericValue = text.replace(/[^0-9]/g, "");
                if (numericValue.length > 1) {
                  numericValue = numericValue.replace(/^0+/, ""); 
                }
                setAmount(numericValue);
                
              }}
              maxLength={7}
            />
          </View>

          {/* Accumulated Amount Input */}
          <View style={styles.content}>
            <Text style={styles.textTitle}>Accumulated Amount</Text>
            <TextInput
              value={accumulatedAmount}
              placeholder="Enter Accumulated Amount"
              style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black' }}
              keyboardType="numeric"
              onChangeText={(text) => {
                let numericValue = text.replace(/[^0-9]/g, "");
                if (numericValue.length > 1) {
                  numericValue = numericValue.replace(/^0+/, ""); 
                }
                setAccumulatedAmount(numericValue);
                
              }}                  
              onBlur={() => {
                let accAmount = parseInt(accumulatedAmount) || 0; 
                if (accAmount > parseInt(amount)) {
                  accAmount = parseInt(amount);
                }
                setAccumulatedAmount(accAmount.toString()); 
              }}
              maxLength={7}
            />
          </View>

          {/* Buttons */}
          <View style={styles.btn}>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <Button title="Cancel" color={colors.red} onPress={() => setIsUpdatingGoal(false)} />
              <Button title="Save" testID='save-button' color={colors.green} onPress={() => setIsConfirmModalVisible(true)} disabled={!validateFields()} />
            </View>
          </View>
        </View>
          
        

        {/* Confirmation Modal */}
        <ConfirmModal
          visible={isConfirmModalVisible} 
          title="Confirm Changes" 
          message="Are you sure you want to save the changes?" 
          onConfirm={handleUpdateGoal}
          onCancel={() => setIsConfirmModalVisible(false)}
        />
      </>
    );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  textTitle: {
    fontWeight: "bold",
  },
  container: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    flex: 1,
  },
  btn: {
    flex: 1,
    flexDirection: "column-reverse",
    paddingBottom: 20,
  },
  content: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  input: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.green,
  },
});

