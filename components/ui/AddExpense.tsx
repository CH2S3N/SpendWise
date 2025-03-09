import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSQLiteContext } from 'expo-sqlite';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { colors } from '@/constants/colors';
import RNPickerSelect from 'react-native-picker-select';



interface addExpenseProps {
  setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
 
}

export default function AddExpense({
    setIsAddingTransaction, 
}: addExpenseProps) {

    const { insertTransaction } = UseTransactionService();
    const { categories, transactions } = useSelector(
      (state: RootState) => state.data
    );

    const [currentTab, setCurrentTab] = React.useState<number>(0);
    const [typeSelected, setTypeSelected] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [amountInput, setAmountInput] = React.useState<string>("");
    const [isrecurrence, setRecurrence] = React.useState<string>("");
    const [isRecurrenceInput, setRecurrenceInput] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [frequency, setFrequency] = React.useState<string>("Daily");
    const [subType, setSubType] = React.useState<string>("Weekends");
    const [prioritization, setPrioritization] = React.useState<string>("High");
    const [isfixedamount, setIsFixedAmount] = React.useState<string>("Yes");
    const [category, setCategory] = React.useState<string>("Essential");
    const [categoryId, setCategoryId] = React.useState<number>(1);
    const [recurrenceId, setRecurrenceId] = React.useState<number>(1);
    const [id] = React.useState<number>(0);
   
    const db = useSQLiteContext();
    const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = React.useState(false);
    const [categoryDescription, setCategoryDescription] = useState('');
    function handleConfirmSave() {
        setIsConfirmModalVisible(false);
        handleSaveExpense();
    }
    function validateFields() {
      if ( !description || (isfixedamount == 'Yes' && !amount) || !typeSelected || (frequency == 'Daily' && (isrecurrence === "0" || null)) || (frequency == 'Bi-Weekly' && (isrecurrence === "0" || null)) || (subType === 'Custom' && (isrecurrence === "0" || null)) || (frequency == 'Monthly' && (isrecurrence === "0" || null)))  {
        return false;
      }
      
      return true;
    }

    useEffect(() => {
      if (selectedIndex === 0) {
        setIsFixedAmount('Yes');
      } else {
        setIsFixedAmount('No');
        setAmount("");  
      }
    }, [selectedIndex]);
    


    async function handleSaveExpense() {
      const calculatedAmount = Number(amount)

      await insertTransaction({
        description,
        frequency: frequency as "Daily" | "Weekly" | "Monthly",
        prioritization: prioritization as "High" | "Medium" | "Low",
        isfixedamount: isfixedamount as "Yes" | "No",
        amount: calculatedAmount, 
        category_id: categoryId,
        type: category as "Essential" | "Non_Essential",
        interval: Number(isrecurrence),
        intervalInput: Number(isRecurrenceInput),
        subtype: subType as "Weekends" | "Weekdays" | "All" | "Custom",
        id,
      });
      alert("Expense Added Successfully")
      setDescription("");
      setFrequency("Daily");
      setPrioritization("High");
      setIsFixedAmount("Yes");
      setAmount("");
      setCategoryId(1);
      setRecurrenceId(1);
      setCurrentTab(0);
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
         if (frequency === 'Bi-Weekly'){
           setSubType('Custom')
         }
         if (frequency === 'Monthly'){
           setSubType('Custom')
         }
       }, [frequency]);

    

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
          {/* DESCRIPTION */}
          <Text style={styles.btext}>Item</Text>
          <TextInput
            placeholder="Provide an entry description"
            style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black'}}
            value={description}
            onChangeText={setDescription}
          />

          {/* Recurrence */}
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
                  tintColor={colors.red} 
                  backgroundColor={colors.lightRed}
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
                    tintColor={colors.red} 
                    backgroundColor={colors.lightRed}
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
                    setRecurrence(numericValue ? String(parseInt(numericValue) * 4) : "");
                  }}
                  onBlur={() => {
                    let numericValue = parseInt(isRecurrenceInput) || 0; 
                    if (numericValue > 7) {
                      numericValue = 7;
                    }
                    setRecurrenceInput(numericValue.toString()); 
                    setRecurrence(numericValue ? String(numericValue * 4) : ""); 
                  }}
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
                <Text>Time(s) per Month</Text>
                  </View>
                )}
            </View>
          </View>

          {/* IS FIXED AMOUNT */}
          <View>
            <Text style={styles.btext}>Is a Fixed Amount?</Text>
            <SegmentedControl
              values={['Yes', 'No']}
              selectedIndex={selectedIndex}
              onChange={(event) => {
                setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
                if (selectedIndex === 1) {
                  setAmount('');
                  setIsFixedAmount('No')
                }
              }}
              fontStyle={{ color: colors.dark }}
              activeFontStyle={{ color: colors.light }}
              tintColor={colors.red} 
              backgroundColor={colors.lightRed}
            />
            {/* AMOUNT */}
              <Text style={styles.btext}>Amount</Text>
              <TextInput
                placeholder="Enter Amount"
                style={{ marginBottom: 15, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'black' }}
                value={amount}
                keyboardType="numeric"
                onChangeText={(text) => {
                  // Remove any non-numeric characters before setting the state
                  const numericValue = text.replace(/[^0-9.]/g, "");
                  setAmount(numericValue);
                  setIsFixedAmount('Yes')
                }}
              />
          </View>

            {/* ENTRY TYPE, ESSENTIAL & NON ESSENTIAL */}
          <Text style={styles.btext}>Select an Expense Type</Text>
          <SegmentedControl
            values={["Needs", "Wants"]}
            style={{ marginBottom: 15 }}
            selectedIndex={["Essential","Non_Essential"].indexOf(category)}
            onChange={(event) => {
              setCategory(["Essential","Non_Essential"][event.nativeEvent.selectedSegmentIndex])
            }}
            fontStyle={{ color: colors.dark }}
            activeFontStyle={{ color: colors.light }}
            tintColor={colors.red} 
            backgroundColor={colors.lightRed}
          />

          <Text style={styles.btext}>Select an Expense Sub-type</Text>
          <View style={styles.dropdownContainer}>
              <RNPickerSelect    
              style={{}}            
                value={categoryId}
                onValueChange={(value) => {
                  setTypeSelected(value);
                  const selectedCategory = categories.find((cat) => cat.name === value);
                  if (selectedCategory) {
                    setCategoryId(selectedCategory.id);
                    setCategoryDescription(selectedCategory.description);
                  }
                }}
               
                items={categories.map((cat) => ({
                  label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1) ,
                  value: (cat.id ),
                }))}
                placeholder={{ label: "Select a sub-type...", value: null }}
              />
          </View>


      </ScrollView>


      {/* Cancel and Save Button */}
        <View
          style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 10}}
        >
          <Button title="Cancel" color={colors.red} 
          onPress={
            () => {
              setIsAddingTransaction(false);
            }
          
          }
          />
          <Button title="Save" color={colors.red} 
          onPress={()=> {
              setIsConfirmModalVisible(true)
            }} disabled={!validateFields() } 

          />
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
              Are you sure you want to save this entry?
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



const styles = StyleSheet.create({
  container:{
    flex: 1,
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



// Weekly Recurrence
  dayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
  },
  selectedDayButton: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  dayButtonText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
  },
  selectedDayButtonText: {
    color: '#fff',
  },
  dropdownContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 14,
    color: 'gray',
  },
})

