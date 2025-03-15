import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
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
      console.log("currentGoal changed:", currentGoal);
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
  }


    function validateFields() {
        if ( amount === "" || name === "" || accumulatedAmount === ""){
        return false;
      }
      return true;
    }
  

    return (
      <>
        <Card
          content={
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>UPDATE GOAL</Text>
              </View>

              {/* Item Name Input */}
              <View style={styles.content}>
                <Text style={styles.textTitle}>Item</Text>
                <TextInput
                  placeholder="Provide an entry description"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Total Amount Input */}
              <View style={styles.content}>
                <Text style={styles.textTitle}>Total Amount</Text>
                <TextInput
                  value={amount}
                  placeholder="₱Amount"
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    // Remove any non-numeric characters before setting the state
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    setAmount(numericValue);
                }}
                />
              </View>

              {/* Accumulated Amount Input */}
              <View style={styles.content}>
                <Text style={styles.textTitle}>Accumulated Amount</Text>
                <TextInput
                  value={accumulatedAmount}
                  placeholder="Enter Amount"
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    // Remove any non-numeric characters before setting the state
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    setAccumulatedAmount(numericValue);
                }}
                />
              </View>

              {/* Buttons */}
              <View style={styles.btn}>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                  <Button title="Cancel" color={colors.green} onPress={() => setIsUpdatingGoal(false)} />
                  <Button title="Save" color={colors.green} onPress={() => setIsConfirmModalVisible(true)} disabled={!validateFields()} />
                </View>
              </View>
            </View>
          }
        />

        {/* Confirmation Modal */}
        <ConfirmModal
          visible={isConfirmModalVisible} 
          title="Confirm Save" 
          message="Are you sure you want to save this entry?" 
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
    flex: 1,
    height: "100%",
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

