import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useEffect } from 'react'
import Card from './Card';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSQLiteContext } from 'expo-sqlite';
import { Category, Transaction } from '@/types';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Modal } from 'react-native';
import { colors } from '@/constants/colors';
import RNPickerSelect from 'react-native-picker-select';
import ConfirmModal from '../Modal/ConfirmModal';


interface Props {
  setIsUpdatingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentTransaction: Transaction;
}

export default function UpdateExpense({
     setIsUpdatingTransaction, 
     setIsModalVisible, 
     currentTransaction,
}: Props) {

    const { updateTransaction } = UseTransactionService();
    const { categories } = useSelector(
      (state: RootState) => state.data
    );

    const [recurrence, setRecurrence] = React.useState<string>("");
    const [isRecurrenceInput, setRecurrenceInput] = React.useState<string>("");
    const [currentTab, setCurrentTab] = React.useState<number>(0);
    const [typeSelected, setTypeSelected] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [frequency, setFrequency] = React.useState<string>("Daily");
    const [subType, setSubType] = React.useState<string>("Daily");
    const [prioritization, setPrioritization] = React.useState<string>("High");
    const [isfixedamount, setIsFixedAmount] = React.useState<string>("Yes");
    const [category, setCategory] = React.useState<string>("Essential");
    const [categoryId, setCategoryId] = React.useState<number>(1);
   
    const [selectedIndex, setSelectedIndex] = React.useState<number>(1);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = React.useState(false);
  
    function handleConfirmSave() {
        setIsConfirmModalVisible(false);
        handleSaveExpense(); 
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




    React.useEffect(() => {
      if (currentTransaction) {
        setAmount(String(currentTransaction.amount));
        setRecurrence(String(currentTransaction.interval));
        setRecurrenceInput(String(currentTransaction.intervalInput));
        setDescription(currentTransaction.description);
        setFrequency(currentTransaction.frequency);
        setPrioritization(currentTransaction.prioritization);
        setIsFixedAmount(currentTransaction.isfixedamount);
        setSubType(currentTransaction.subtype)
        setCategory(currentTransaction.type);
        setCategoryId(currentTransaction.category_id);
        setCurrentTab(currentTransaction.type === "Essential" ? 0 : 1);
        setTypeSelected(currentTransaction.type);
        setSelectedIndex(currentTransaction.isfixedamount === "Yes" ? 0 : 1);
      }
    }, [currentTransaction]);


    function validateFields() {
      if (!description ||  description.length < 3 || (subType === 'Custom' && !recurrence) || !category || !prioritization || !typeSelected ) {
        return false;
      }
      
      return true;
    }


    async function handleSaveExpense() {
        const calculatedAmount = Number(amount)

        await updateTransaction({
          id: currentTransaction.id,
          description,
          frequency: frequency as "Daily" | "Weekly" | "Bi-Weekly" | "Monthly",
          prioritization: prioritization as "High" | "Medium" | "Low",
          isfixedamount: isfixedamount as "Yes" | "No",
          amount: calculatedAmount,
          category_id: categoryId,
          type: category as "Essential" | "Non_Essential",
          interval: Number(recurrence),
          intervalInput: Number(isRecurrenceInput),
          subtype: subType as "Weekends" | "Weekdays" | "All" | "Custom",
        });
        Alert.alert(
          "Expense",      
          "Expense Updated Successfully", 
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
    }
    
    

  return (
    <View style={styles.mainCon}>
      <ScrollView style={{flex: 1}}>
        <Text style={styles.btext}>Item</Text>
        {/* DESCRIPTION */}
        <TextInput
          placeholder="Provide an entry description"
          style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black' }}
          value={description}
          onChangeText={(txt) => {
            setDescription(
              txt
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())
            )
          }}
          maxLength={25} 
        />

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
              <Text>Time(s) per Month</Text>
                </View>
              )}
          </View>
        </View>

        {/* IS FIXED AMOUNT */}
        <View>
          <Text style={styles.btext}>Is a Fixed Amount?</Text>
          <SegmentedControl
            style={styles.segmentCon}
            values={['Yes', 'No']}
            selectedIndex={selectedIndex}
            onChange={(event) => {
              setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
              setIsFixedAmount(event.nativeEvent.selectedSegmentIndex === 0 ? "Yes" : "No")

            }}
            fontStyle={{ color: colors.dark }}
            activeFontStyle={{ color: colors.light }}
            tintColor={colors.green} 
            backgroundColor={colors.ligthGreen}
          />
          {/* AMOUNT */}
            <Text style={styles.btext}>Amount</Text>
            <TextInput
              placeholder={isfixedamount === "Yes" ? ("Enter Amount (Required)"): ("Enter Amount (Not required)")}
              value={amount}
              style={{ marginBottom: 15, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'black' }}
              keyboardType="numeric"
              onChangeText={(text) => {
                let numericValue = text.replace(/[^0-9]/g, "");
                if (numericValue.length > 1) {
                  numericValue = numericValue.replace(/^0+/, ""); 
                }

                setAmount(numericValue);
                setIsFixedAmount('Yes')
              }}
            
              maxLength={7}
            />
        </View>

          {/* ENTRY TYPE, ESSENTIAL & NON ESSENTIAL */}
        <Text style={styles.btext}>Select an Expense Type</Text>
        <SegmentedControl
          values={["Needs", "Wants"]}
          style={styles.segmentCon}
          selectedIndex={["Essential","Non_Essential"].indexOf(category)}
          onChange={(event) => {
            setCategory(["Essential","Non_Essential"][event.nativeEvent.selectedSegmentIndex])
          }}
          fontStyle={{ color: colors.dark }}
          activeFontStyle={{ color: colors.light }}
          tintColor={colors.green} 
          backgroundColor={colors.ligthGreen}
        />

        <Text style={styles.btext}>Select an Expense Sub-type</Text>
        <View style={styles.dropdownContainer}>
            <RNPickerSelect   
              style={{
                placeholder: {color: colors.dark},
                inputAndroid: { color: colors.dark},
              }}               
              value={categoryId}
              onValueChange={(value) => {
                setTypeSelected(value);
                const selectedCategory = categories.find((cat) => cat.name === value);
                if (selectedCategory) {
                  setCategoryId(selectedCategory.id);
                }
              }}
              items={categories.map((cat) => ({
                label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
                value: cat.name,
              }))}
              placeholder={{ label: "Select a sub-type...", value: null }}
            />
        </View>


      </ScrollView>

      {/* Cancel and Save Button */}
      <View
        style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 10 }}
      >
        <Button title="Cancel" color={colors.green} 
        
        onPress={
          () => {
            setIsModalVisible(false);
            setIsUpdatingTransaction(false);
          }

        }
        />
        <Button title="Save" color={colors.green}  onPress={()=> setIsConfirmModalVisible(true)} disabled={!validateFields()}/>
      </View>



    {/* Confirmation Modal */}
    <ConfirmModal 
      visible={isConfirmModalVisible} 
      title={'Confirm Changes'} 
      message={'Are you sure you want to save the changes?'} 
      onConfirm={()=> {
        handleSaveExpense();
        setIsConfirmModalVisible(false)
        setIsUpdatingTransaction(false);
        setIsModalVisible(false);
      }} 
      onCancel={() => setIsConfirmModalVisible(false)}      
      />

    </View>
    
  )
}



const styles = StyleSheet.create({
  mainCon:{
    flex:1,
    width: "100%"
  },
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
  dropdownContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: colors.ligthGreen,

  },
  segmentCon:{
    borderWidth:1, 
    marginVertical:10
  }
})