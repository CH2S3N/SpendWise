import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Modal } from 'react-native'
import React, { useEffect } from 'react'
import Card from './Card';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSQLiteContext } from 'expo-sqlite';
import { Income } from '@/types';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '@/constants/colors';


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
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const [typeSelected, setTypeSelected] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [frequency, setFrequency] = React.useState<string>("Daily");
  const [subType, setSubType] = React.useState<string>("Weekends");
  const [incomeCategory, setIncomeCategory] = React.useState<string>("Essential");
  const [incomeCategoryId, setIncomeCategoryId] = React.useState<number>(1);
  
  const db = useSQLiteContext();

  const { updateIncome } = UseTransactionService();
  const [isConfirmModalVisible, setIsConfirmModalVisible] = React.useState(false);


  function handleConfirmSave() {
      setIsConfirmModalVisible(false);
      handleSaveIncome(); 
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
    setDescription("");
    setFrequency("Daily");
    setAmount("");
    setIncomeCategoryId(1);
    setCurrentTab(0);
    setIsModalVisible(false);
    setIsUpdatingIncome(false);
      
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
            placeholder="Provide an Item Description"
            style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black'}}
            onChangeText={setDescription}
          />
        </View>

        {/* AMOUNT */}
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

        {/* FREQUENCY */}
        <View>
          <View style={styles.content}>
              <Text style={styles.btext}>Recurrence</Text>
              <SegmentedControl
                values={["Daily", "Weekly", "Bi-Weekly", "Monthly"]}
                style={{ marginTop: 10, }}
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
                  style={{ marginTop: 10, }}
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
                  const numericValue = text.replace(/[^0-9.]/g, "");
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
                    const numericValue = text.replace(/[^0-9.]/g, "");
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
                      const numericValue = text.replace(/[^0-9]/g, "");
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
                  />
                  <Text>Time/s per Month</Text>
                </View>
              )}
          </View>
        </View>


        <Text style={styles.btext}>Income Type</Text>
        <SegmentedControl
          values={["Allowance", "Salary", "Others"]}
          style={{ marginTop: 10, }}
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
        <Button title="Cancel" color={colors.green} 
        onPress={
          () => {
            setIsModalVisible(false);
            setIsUpdatingIncome(false)
          }
        
        }
        />
        <Button title="Save" color={colors.green} onPress={()=> setIsConfirmModalVisible(true)} disabled={!validateFields()}/>
      </View>

    
      {/* Confirmation Modal */}
      <Modal
      visible={isConfirmModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsConfirmModalVisible(false)}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <View style={{
          width: 300,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
            Confirm Save
          </Text>
          <Text style={{ marginBottom: 20 }}>
            Are you sure you want to save the changes?
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Button title="Cancel" color={colors.red} onPress={() => setIsConfirmModalVisible(false)} />
            <Button title="Confirm" color={colors.green} onPress={handleConfirmSave} />
          </View>
        </View>
      </View>
      </Modal>
    
    </View>




  )
}


// ENTRY TYPE PICKER
function CategoryButton({
    id,
    title,
    isSelected,
    setTypeSelected,
    setIncomeCategoryId,
} : {
    id: number;
    title: string;
    isSelected: boolean;
    setTypeSelected: React.Dispatch<React.SetStateAction<string>>
    setIncomeCategoryId: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <TouchableOpacity
        onPress={() => {
            setTypeSelected(title);
            setIncomeCategoryId(id);
        }}
        activeOpacity={0.5}
        style={{
            height: 40,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isSelected? 'black' : 'white',
            borderRadius: 15,
            marginBottom: 6,
          
        }}
        >
            <Text
                style={{
                    fontWeight: "700",
                    color: isSelected? 'white' : 'black',
                    marginLeft: 5,
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
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