import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView, Modal, Alert } from 'react-native'
import React, { useEffect } from 'react'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSQLiteContext } from 'expo-sqlite';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import { colors } from '@/constants/colors';
import ConfirmModal from '../Modal/ConfirmModal';


interface addIncomeProps {
  setIsAddingIncome: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddIncome({
    setIsAddingIncome,
}: addIncomeProps) { 

    const { insertIncome } = UseTransactionService();
    const [isrecurrence, setRecurrence] = React.useState<string>("0");
    const [isRecurrenceInput, setRecurrenceInput] = React.useState<string>("0");
    const [typeSelected, setTypeSelected] = React.useState<string>("Allowance");
    const [amount, setAmount] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [subType, setSubType] = React.useState<string>("Weekends");
    const [frequency, setFrequency] = React.useState<string>("Daily");
    const [incomeCategory, setIncomeCategory] = React.useState<string>("Allowance");
    const [incomeCategoryId, setIncomeCategoryId] = React.useState<number>(1);
    const [id] = React.useState<number>(0);
  
    const [isConfirmModalVisible, setIsConfirmModalVisible] = React.useState(false);


      function validateFields() {
        if ( !description || description.length < 3 || !amount || parseInt(amount) < 1 || !typeSelected || parseInt(isrecurrence) < 1 || (frequency !== "Daily" && subType === "Custom" && parseInt(isRecurrenceInput) < 1)) {
          return false;
        }
        
        return true;
      }
  

    async function handleSaveIncome() {
      const calculatedAmount = Number(amount)

        await insertIncome({

            amount: calculatedAmount,
            description,
            frequency: frequency as "Daily" | "Weekly" | "Monthly",
            incomeCategoryId: incomeCategoryId,
            type: incomeCategory as "Allowance" | "Salary" | "Others",
            interval: Number(isrecurrence),
            intervalInput: Number(isRecurrenceInput),
            subtype: subType as "Weekends" | "Weekdays" | "All" | "Custom",
            id,
        });
        setDescription("");
        setFrequency("Daily");
        setAmount("");
        setRecurrenceInput("")
        setIncomeCategory("Allowance");
        Alert.alert(
          "Income",      
          "Income Added Successfully", 
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );

    }
    

    
   useEffect(() => {
         if (frequency === 'Daily') {
           setRecurrence('28'); 
           setSubType('Custom')
         }
         if (frequency === 'Weekly' && subType === 'Weekends') {
           setRecurrence('8'); 
         }
         if (frequency === 'Weekly' && subType === 'Weekdays') {
           setRecurrence('20'); 
         }
         if (frequency === 'Monthly'){
           setSubType('Custom')
         }
         if (frequency === 'Bi-Weekly'){
           setSubType('Custom')
         }
       }, [frequency, subType]);

  return (
    <View style={styles.container}>
        <ScrollView>
          {/* DESCRIPTION */}
          <View style={styles.content}>
          <Text style={styles.btext}>Item</Text>
            <TextInput
              value={description}
              placeholder="Provide an Item Description"
              style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black'}}
              onChangeText={(txt) => {
                setDescription(
                  txt
                    .toLowerCase()
                    .replace(/\b\w/g, (char) => char.toUpperCase())
                )
          }}
          maxLength={25} 
            />
          </View>

          {/* AMOUNT */}
          <View style={styles.content}>
            <Text style={styles.btext}>Amount</Text>
            <TextInput
              placeholder="Enter Amount"
              value={amount}
              style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black' }}
              keyboardType="numeric"
              onChangeText={(text) => {
                let numericValue = text.replace(/[^0-9]/g, "");
                if (numericValue.length > 1) {
                  numericValue = numericValue.replace(/^0+/, ""); 
                }

                setAmount(numericValue);
              }}
              maxLength={7} 
            />
          </View>

          {/* FREQUENCY */}
          <View>
            <View style={styles.content}>
                <Text style={styles.btext}>Recurrence</Text>
                <SegmentedControl
                  testID="income-recurrence-segmented-control"
                  values={["Daily", "Weekly", "Bi-Weekly", "Monthly"]}
                  style={[styles.segmentCon, {marginBottom: 0}]}
                  selectedIndex={["Daily", "Weekly", "Bi-Weekly", "Monthly"].indexOf(frequency)}
                  onChange={(event) => {
                    setFrequency(["Daily", "Weekly", "Bi-Weekly", "Monthly"][event.nativeEvent.selectedSegmentIndex]);
                    if ((frequency !== "Daily" && subType === "Custom")) {
                      setRecurrenceInput('0');
                      setRecurrence('0'); 
                    }
                  }}
                  fontStyle={{ color: colors.dark }}
                  activeFontStyle={{ color: colors.light }}
                  tintColor={colors.green} 
                  backgroundColor={colors.ligthGreen}
                />
            </View>
            <View style={styles.content}>
                {frequency === 'Daily' && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  </View>
                )}
                {frequency === 'Weekly' && (
                  <SegmentedControl
                    values={["Weekends", "Weekdays", "Custom"]}
                    style={[styles.segmentCon, {marginTop:0}]}
                    selectedIndex={["Weekends", "Weekdays", "Custom"].indexOf(subType)}
                    onChange={(event) => {
                      setSubType(["Weekends", "Weekdays", "Custom"][event.nativeEvent.selectedSegmentIndex]);
                      const selectedType = ["Weekends", "Weekdays", "Custom"][event.nativeEvent.selectedSegmentIndex];
                      setSubType(selectedType);
                  
                      if (selectedType === "Weekends") {
                        setRecurrence("8");
                      } else if (selectedType === "Weekdays") {
                        setRecurrence("20");
                      } else if (selectedType === "Custom") {
                        setRecurrenceInput("0");
                        setRecurrence("0");
                      }
                    }}
                    fontStyle={{ color: colors.dark }}
                    activeFontStyle={{ color: colors.light }}
                    tintColor={colors.green} 
                    backgroundColor={colors.ligthGreen}
                  />
                  
                )}
                {frequency === 'Weekly' && subType === 'Custom' && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                  placeholder='0'
                    value={isRecurrenceInput}
                  style={{ borderBottomWidth: 1, borderBottomColor: 'black',  paddingHorizontal: 5, textAlign: 'center'}}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    // Remove any non-numeric characters before setting the state
                    let numericValue = text.replace(/[^0-9.]/g, "");
                    if (numericValue.startsWith("0") && numericValue.length > 1) {
                      numericValue = numericValue.replace(/^0+/, ""); // Remove leading zeros
                    }
                    setRecurrenceInput(numericValue);
                    setRecurrence(numericValue ? String(parseInt(numericValue) * 4) : "");                  }}
                    onBlur={() => {
                      let numericValue = parseInt(isRecurrenceInput) || 0; 
                      if (numericValue > 7) {
                        numericValue = 7;
                      }
                      setRecurrenceInput(numericValue.toString()); 
                      setRecurrence(numericValue ? String(numericValue * 4) : ""); 
                    }}
                    maxLength={2}
                  />
                  <Text>Time(s) per Week</Text>
                  </View>
                )}
                {frequency === 'Bi-Weekly' && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    placeholder='0'
                    value={isRecurrenceInput}
                    style={{ borderBottomWidth: 1, borderBottomColor: 'black',  paddingHorizontal: 5, textAlign: 'center'}}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      // Remove any non-numeric characters before setting the state
                      let numericValue = text.replace(/[^0-9.]/g, "");
                      if (numericValue.startsWith("0") && numericValue.length > 1) {
                        numericValue = numericValue.replace(/^0+/, ""); // Remove leading zeros
                      }
                      setRecurrenceInput(numericValue);
                      setRecurrence(numericValue ? String(parseInt(numericValue) * 2) : "");                  }}
                      onBlur={() => {
                        let numericValue = parseInt(isRecurrenceInput) || 0;
                        if (numericValue > 14) {
                          numericValue = 14;
                        }
                        setRecurrenceInput(numericValue.toString()); 
                        setRecurrence(numericValue ? String(numericValue * 2) : ""); 
                      }}
                      maxLength={2}
                  />
                  <Text>Time(s) per Bi-Week</Text>
                  </View>
                )}

                {frequency === 'Monthly' && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                      placeholder='0'
                      value={isRecurrenceInput}
                      style={{ borderBottomWidth: 1, borderBottomColor: 'black',  paddingHorizontal: 5, textAlign: 'center'}}
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        // Remove any non-numeric characters before setting the state
                        let numericValue = text.replace(/[^0-9]/g, "");
                        if (numericValue.startsWith("0") && numericValue.length > 1) {
                          numericValue = numericValue.replace(/^0+/, ""); // Remove leading zeros
                        }
                        setRecurrenceInput(numericValue);
                        setRecurrence(numericValue);
                      }}
                      onBlur={() => {
                        let numericValue = parseInt(isRecurrenceInput) || 0; 
                        if (numericValue > 28) {
                          numericValue = 28;
                        }
                        setRecurrenceInput(numericValue.toString()); 
                        setRecurrence(numericValue.toString());
                      }}
                      maxLength={2}
                    />
                    <Text>Time(s) per Month</Text>
                  </View>
                )}
            </View>
          </View>

          {/* Income Type */}
          <Text style={styles.btext}>Income Type</Text>
          <SegmentedControl
            testID="income-segmented-control"
            values={["Allowance", "Salary", "Others"]}
            style={styles.segmentCon}
            selectedIndex={["Allowance", "Salary", "Others"].indexOf(incomeCategory)}
            onChange={(event) => {
              setIncomeCategory(["Allowance", "Salary", "Others"][event.nativeEvent.selectedSegmentIndex]);
            }}
            fontStyle={{ color: colors.dark }}
            activeFontStyle={{ color: colors.light }}
            tintColor={colors.green} 
            backgroundColor={colors.ligthGreen}
          />

        </ScrollView>
    
      {/* Cancel and Save Button */}
      <View
        style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 10 }}
      >

        <Button title="Cancel" color={colors.red} 
          onPress={
            () => {
              setIsAddingIncome(false);
            }
          }
        />
        <Button title="Save" color={colors.green} onPress={()=> setIsConfirmModalVisible(true)} disabled={!validateFields()} />
      </View>




      {/* Confirmation Modal */}
      <ConfirmModal
      visible={isConfirmModalVisible} 
      title={'Confirm Save'} 
      message={'Are you sure you want to save this entry?'} 
      onConfirm={()=> {
        handleSaveIncome();
        setIsConfirmModalVisible(false)
      }} 
      onCancel={() => setIsConfirmModalVisible(false)}      
      />
    </View>
  )
}



const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
  },
  btn:{
    flexDirection: 'column-reverse',
    paddingBottom: 10
  },
  content:{
    paddingTop: 10
  },
  btext:{
    fontWeight: 'bold'
  },
  segmentCon:{
    borderWidth:1, 
    marginVertical:10
  }
})