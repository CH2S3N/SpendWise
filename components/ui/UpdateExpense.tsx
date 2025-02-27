import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Card from './Card';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSQLiteContext } from 'expo-sqlite';
import { Category, Transaction } from '@/types';
import { UseTransactionService } from '@/hooks/editData/TransactionService';


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
    

    const [recurrence, setRecurrence] = React.useState<string>("");
    const [isRecurrenceInput, setRecurrenceInput] = React.useState<string>("");
    const [recurrenceId, setRecurrenceId] = React.useState<number>(1);
    const [currentTab, setCurrentTab] = React.useState<number>(0);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [typeSelected, setTypeSelected] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [frequency, setFrequency] = React.useState<string>("Daily");
    const [subType, setSubType] = React.useState<string>("Daily");
    const [prioritization, setPrioritization] = React.useState<string>("High");
    const [isfixedamount, setIsFixedAmount] = React.useState<string>("Yes");
    const [category, setCategory] = React.useState<string>("Essential");
    const [categoryId, setCategoryId] = React.useState<number>(1);
   
    const db = useSQLiteContext();
    const [selectedIndex, setSelectedIndex] = React.useState<number>(1);
   
    useEffect(() => {
      if (frequency === 'Daily') {
        setRecurrence('1'); 
        setSubType('Custom')
      }
      if (frequency === 'Weekly' && subType === 'Weekends') {
        setRecurrence('2'); 
      }
      if (frequency === 'Weekly' && subType === 'Weekdays') {
        setRecurrence('5'); 
      }
      if (frequency === 'Weekly' && subType === 'All') {
        setRecurrence('7'); 
      }
      if (frequency === 'Weekly' && subType === 'Custom') {
        setRecurrence('1'); 
      }
      if (frequency === 'Monthly'){
        setRecurrence('1'); 
        setSubType('Custom')
      }
      if (frequency === 'Bi-Weekly'){
        setRecurrence('1'); 
        setSubType('Custom')
      }
    }, [frequency, subType]);




    React.useEffect(() => {
      if (currentTransaction) {
        setAmount(String(currentTransaction.amount || ""));
        setRecurrence(String(currentTransaction.interval || ""));
        setDescription(currentTransaction.description || "");
        setFrequency(currentTransaction.frequency || "Daily");
        setPrioritization(currentTransaction.prioritization || "High");
        setIsFixedAmount(currentTransaction.isfixedamount || "Yes");
        setSubType(currentTransaction.subtype || "")
        setCategory(currentTransaction.type || "Essential");
        setCategoryId(currentTransaction.category_id || 1);
        setCurrentTab(currentTransaction.type === "Essential" ? 0 : 1);
        setTypeSelected(currentTransaction.type || "Essential");
        setSelectedIndex(currentTransaction.isfixedamount === "Yes" ? 0 : 1);
      }
    }, [currentTransaction]);

    React.useEffect(() => {
        getExpenseType(currentTab);
    }, [currentTab]);

    async function getExpenseType(currentTab: number) {
        setCategory(currentTab === 0 ? "Essential" : "Non_Essential");
        const type = currentTab === 0 ? "Essential" : "Non_Essential";

        const result = await db.getAllAsync<Category>(
            'SELECT * FROM CATEGORIES WHERE type = ?;',
            [type]
        );
        setCategories(result);
    }

    function validateFields() {
      if (!description || (subType === 'Custom' && !recurrence) || !category || !prioritization || !typeSelected ) {
        return false;
      }
      
      return true;
    }

        useEffect(() => {
          if (selectedIndex === 0) {
            setIsFixedAmount('Yes');
          } else {
            setIsFixedAmount('No');
          }
        }, [selectedIndex]);

    async function handleSaveExpense() {
        await updateTransaction({
          id: currentTransaction.id,
          description,
          frequency: frequency as "Daily" | "Weekly" | "Bi-Weekly" | "Monthly",
          prioritization: prioritization as "High" | "Medium" | "Low",
          isfixedamount: isfixedamount as "Yes" | "No",
          amount: Number(amount),
          category_id: categoryId,
          type: category as "Essential" | "Non_Essential",
          interval: Number(recurrence),
          subtype: subType as "Weekends" | "Weekdays" | "All" | "Custom",
          recurrence_id: recurrenceId,
        });
        setDescription("");
        setFrequency("Daily");
        setPrioritization("High");
        setIsFixedAmount("Yes");
        setAmount("");
        setCategoryId(1);
        setCurrentTab(0);
        setIsModalVisible(false);
        setIsUpdatingTransaction(false);

    }
    
    

  return (
    <Card
    content={
      <>
        <ScrollView style={{flex: 8}}>
          {/* DESCRIPTION */}
          <Text style={styles.btext}>Item</Text>
          <TextInput
            placeholder="Provide an entry description"
            style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black'}}
            value={description}
            onChangeText={setDescription}
          />

          {/* FREQUENCY */}
          <View>
            <View style={styles.content}>
                <Text style={styles.btext}>Frequency</Text>
                <SegmentedControl
                  values={["Daily", "Weekly", "Bi-Weekly", "Monthly"]}
                  style={{ marginTop: 10, }}
                  selectedIndex={["Daily", "Weekly", "Bi-Weekly", "Monthly"].indexOf(frequency)}
                  onChange={(event) => {
                    setFrequency(["Daily", "Weekly", "Bi-Weekly", "Monthly"][event.nativeEvent.selectedSegmentIndex]);
                    setRecurrence(recurrence);
                  }}
                />
            </View>
            <View style={styles.content}>

                {frequency === 'Daily' && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    
                  </View>
                )}

                {frequency === 'Weekly' && (
                  <SegmentedControl
                    values={["Weekends", "Weekdays", "All", "Custom"]}
                    style={{ marginTop: 10, }}
                    selectedIndex={["Weekends", "Weekdays", "All", "Custom"].indexOf(subType)}
                    onChange={(event) => {
                      setSubType(["Weekends", "Weekdays", "All", "Custom"][event.nativeEvent.selectedSegmentIndex]);
                      setRecurrence(recurrence);
                    }}
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
                  <Text>Day(s) per Week</Text>
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
                  <Text>Day(s) per Bi-Week</Text>
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
                <Text>Day(s) per Month</Text>
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
            values={["Essential", "Non Essential"]}
            style={{ marginBottom: 15 }}
            selectedIndex={currentTab}
            onChange={(event) => {
              setCurrentTab(event.nativeEvent.selectedSegmentIndex);
            }}
          />

          {categories.map((cat) => (
            <CategoryButton
              key={cat.name}
              id={cat.id}
              title={cat.name}
              isSelected={typeSelected === cat.name}
              setTypeSelected={setTypeSelected}
              setCategoryId={setCategoryId}
            />
          ))}
        </ScrollView>

        {/* Cancel and Save Button */}
        <View
          style={{ flexDirection: "row", justifyContent: "space-around" }}
        >
          <Button title="Cancel" color={'black'} 
          onPress={
            () => {
              setIsModalVisible(false);
              setIsUpdatingTransaction(false);
            }

          }
          />
          <Button title="Save" color={'black'} onPress={handleSaveExpense} disabled={!validateFields()}/>
        </View>
      </>
    }
    />
      
  )
}


// ENTRY TYPE PICKER
function CategoryButton({
    id,
    title,
    isSelected,
    setTypeSelected,
    setCategoryId,
} : {
    id: number;
    title: string;
    isSelected: boolean;
    setTypeSelected: React.Dispatch<React.SetStateAction<string>>
    setCategoryId: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <TouchableOpacity
        onPress={() => {
            setTypeSelected(title);
            setCategoryId(id);
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
  },

})