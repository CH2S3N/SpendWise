import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSQLiteContext } from 'expo-sqlite';
import { IncomeCategory } from '@/types';
import { UseTransactionService } from '@/hooks/editData/TransactionService';


interface addIncomeProps {
  setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdatingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddIncome({
    setIsAddingTransaction, setIsUpdatingTransaction
}: addIncomeProps) {

    const { insertIncome } = UseTransactionService();
    const [isrecurrence, setRecurrence] = React.useState<string>("");
    const [isRecurrenceInput, setRecurrenceInput] = React.useState<string>("");
    const [incomeCategories, setIncomeCategories] = React.useState<IncomeCategory[]>([]);
    const [typeSelected, setTypeSelected] = React.useState<string>("Allowance");
    const [amount, setAmount] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [subType, setSubType] = React.useState<string>("Weekends");
    const [frequency, setFrequency] = React.useState<string>("Daily");
    const [incomeCategory, setIncomeCategory] = React.useState<string>("Allowance");
    const [incomeCategoryId, setIncomeCategoryId] = React.useState<number>(1);
    const [id] = React.useState<number>(0);
  
    const db = useSQLiteContext();

    useEffect(() => {
        async function fetchIncomeCategories() {
            const result = await db.getAllAsync<IncomeCategory>('SELECT * FROM IncomeCategory;');
            setIncomeCategories(result);
        }
        fetchIncomeCategories();
      }, []);

      

      function validateFields() {
        if ( !description || !amount || !typeSelected || (frequency == 'Daily' && !isrecurrence) || (subType === 'Custom' && !isrecurrence) || (frequency == 'Monthly' && !isrecurrence))  {
          return false;
        }
        
        return true;
      }
  

    async function handleSaveIncome() {
        await insertIncome({
            amount: Number(amount),
            description,
            frequency: frequency as "Daily" | "Weekly" | "Monthly",
            incomeCategoryId: incomeCategoryId,
            type: incomeCategory as "Allowance" | "Salary" | "Others",
            interval: Number(isrecurrence),
            subtype: subType as "Weekends" | "Weekdays" | "All" | "Custom",
            id,
        });
        setDescription("");
        setFrequency("Daily");
        setAmount("");
        setIncomeCategory("Allowance");
        setIsAddingTransaction(false);

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
             if (frequency === 'Weekly' && subType === 'All') {
               setRecurrence('28'); 
             }
           }, [subType]);

  return (
    <View style={styles.container}>
      <View style={{flex: 9,}}>
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
                    setRecurrence('')
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
                  <Text>Day/s per Bi-Week</Text>
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
                    <Text>Day/s per Month</Text>
                  </View>
                )}
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.btext}>Select an Income Type</Text>
            {incomeCategories.map((cat) => (
              <CategoryButton
                key={cat.name}
                id={cat.id}
                title={cat.name}
                isSelected={typeSelected === cat.name}
                setTypeSelected={setTypeSelected}
                setIncomeCategoryId={setIncomeCategoryId}
              />
            ))}
          </View>

        </ScrollView>
      </View>
      {/* Cancel and Save Button */}
      <View style={styles.btn}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-around" }}
        >

          <Button title="Cancel" color={'black'} 
            onPress={
              () => {
                setIsAddingTransaction(false);
                setIsUpdatingTransaction(false)
              }
            }
          />
          <Button title="Save" color={'black'} onPress={handleSaveIncome} disabled={!validateFields()} />
        </View>
      </View>
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
                {title.charAt(0).toLocaleUpperCase() + title.slice(1)}
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