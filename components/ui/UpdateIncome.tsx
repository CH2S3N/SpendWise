import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Modal, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Income } from '@/types';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import { colors } from '@/constants/colors';
import ConfirmModal from '../Modal/ConfirmModal';
 

interface Props {
  setIsUpdatingIncome: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentIncome: Income;
}

export default function UpdateIncome({
     setIsUpdatingIncome, 
     setIsModalVisible, 
     currentIncome,
}: Props) {
  const [isRecurrence, setRecurrence] = React.useState<string>("");
  const [isRecurrenceInput, setRecurrenceInput] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [frequency, setFrequency] = React.useState<string>("Daily");
  const [subType, setSubType] = React.useState<string>("Weekends");
  const [incomeCategory, setIncomeCategory] = React.useState<string>("Essential");
  const [incomeCategoryId, setIncomeCategoryId] = React.useState<number>(1);
  const { updateIncome } = UseTransactionService();
  const [isConfirmModalVisible, setIsConfirmModalVisible] = React.useState(false);



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
  }, [frequency]);
   



  React.useEffect(() => {
    if (currentIncome) {
      setAmount(String(currentIncome.amount || ""));
      setRecurrence(String(currentIncome.interval || ""));
      setRecurrenceInput(String(currentIncome.intervalInput || ""));
      setDescription(currentIncome.description || "");
      setFrequency(currentIncome.frequency || "Daily");
      setIncomeCategory(currentIncome.type || "Allowance");
      setIncomeCategoryId(currentIncome.incomeCategoryId || 1);
      setSubType(currentIncome.subtype || "")
    }
  }, [currentIncome]);



  async function handleSaveIncome() {
    const calculatedAmount = Number(amount)
    await updateIncome({
      id: currentIncome.id,
      description,
      frequency: frequency as "Daily" | "Weekly" | "Monthly",
      amount: calculatedAmount,
      incomeCategoryId: incomeCategoryId,
      type: incomeCategory as "Allowance" | "Salary" | "Others",
      interval: Number(isRecurrence),
      intervalInput: Number(isRecurrenceInput),
      subtype: subType as "Weekends" | "Weekdays" | "All" | "Custom",
    });  
  }
  
    
  function validateFields() {
    if ( !description || !amount || !frequency  )  {
      return false;
    }
    return true;
  }

  return (
    <View style={{flex: 1, width: "100%"}}>
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
                values={["Daily", "Weekly", "Bi-Weekly", "Monthly"]}
                style={[styles.segmentCon, {marginBottom:0}]}
                selectedIndex={["Daily", "Weekly", "Bi-Weekly", "Monthly"].indexOf(frequency)}
                onChange={(event) => {
                  setFrequency(["Daily", "Weekly", "Bi-Weekly", "Monthly"][event.nativeEvent.selectedSegmentIndex]);
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
                <Text>Time/s per Week</Text>
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
                <Text>Time/s per Bi-Week</Text>
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
                      let numericValue = text.replace(/[^0-9.]/g, "");
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
                  <Text>Time/s per Month</Text>
                </View>
              )}
          </View>
        </View>


        <Text style={styles.btext}>Income Type</Text>
        <SegmentedControl
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
        style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 10}}
      >
        <Button title="Cancel" color={colors.red} 
        onPress={
          () => {
            setIsModalVisible(false);
            setIsUpdatingIncome(false)
          }
        
        }
        />
        <Button title="Save" color={colors.green} onPress={()=> {setIsConfirmModalVisible(true); setIsUpdatingIncome(false); }} disabled={!validateFields()}/>
      </View>

    
      {/* Confirmation Modal */}
      <ConfirmModal
      visible={isConfirmModalVisible} 
      title={'Confirm Changes'} 
      message={'Are you sure you want to save the changes?'} 
      onConfirm={()=> {
        handleSaveIncome();
        setIsConfirmModalVisible(false)
        setIsModalVisible(false);
      }} 
      onCancel={() => setIsConfirmModalVisible(false)}      
      />
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
  },
  segmentCon:{
    borderWidth:1, 
    marginVertical:10
  }
})