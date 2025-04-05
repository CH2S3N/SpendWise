import { View, TextInput, Button, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React from 'react'
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import ConfirmModal from '../Modal/ConfirmModal';
import { colors } from '@/constants/colors';

export default function AddGoal({
    setIsAddingGoal, 
}: {
    setIsAddingGoal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
      const { insertGoal } = UseTransactionService();
    


    const [amount, setAmount] = React.useState<string>("");
    const [accumulatedAmount, setAccumulatedAmount] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [id] = React.useState<number>(0);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = React.useState(false);
    

    function validateFields() {
      if ( !amount || !name || name.length < 3 ) {
        return false;
      }
      
      return true;
    }



    async function handleSaveGoal() {
        // to insert transactions
        await insertGoal({
          name,
          amount: Number(amount),
          currentAmount: Number(accumulatedAmount),
          id,
        });
        setName("");
        setAmount("");
        setAccumulatedAmount("");
        Alert.alert(
          "Goal",      
          "Goal Added Successfully", 
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
    }

  return (
    <View style={styles.container}>
      <View style={{flex: 9}}>
        <ScrollView>
          <View style={styles.content}>
            {/* DESCRIPTION */}
            <Text style={styles.btext}>Item</Text>
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

          <View style={styles.content}>
              <Text style={styles.btext}>Amount</Text>
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

          <View style={styles.content}>
            <Text style={styles.btext}>Accumulated Amount</Text>
            <TextInput
                  value={accumulatedAmount}
                  placeholder="Enter Accumulated Amount"
                  style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black' }}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    // Remove any non-numeric characters before setting the state
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
        </ScrollView>
        
      </View>
      {/* Cancel and Save Button */}
      <View style={styles.btn}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-around" }}
        >
          <Button title="Cancel" color={colors.red} onPress={() => setIsAddingGoal(false)}
          />
          <Button title="Save" color={colors.green} onPress={()=> setIsConfirmModalVisible(true)} disabled={!validateFields()}/>
        </View>
      </View>



      <ConfirmModal
      visible={isConfirmModalVisible} 
      title={'Confirm Save'} 
      message={'Are you sure you want to save this entry?'} 
      onConfirm={()=> {
        handleSaveGoal();
        setIsConfirmModalVisible(false);
      }} 
      onCancel={() => setIsConfirmModalVisible(false)}      
      />
    </View>
  )
}

const styles = StyleSheet.create({
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