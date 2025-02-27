import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSQLiteContext } from 'expo-sqlite';
import { Category } from '@/types';
import { UseTransactionService } from '@/hooks/editData/TransactionService';



interface addExpenseProps {
  setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdatingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
 
}

export default function AddExpense({
    setIsAddingTransaction, setIsUpdatingTransaction,
}: addExpenseProps) {

      const { insertTransaction } = UseTransactionService();
    

    const [currentTab, setCurrentTab] = React.useState<number>(0);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [typeSelected, setTypeSelected] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [isrecurrence, setRecurrence] = React.useState<string>("");
    const [isRecurrenceInput, setRecurrenceInput] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [frequency, setFrequency] = React.useState<string>("Daily");
    const [subType, setsubType] = React.useState<string>("Weekends");
    const [prioritization, setPrioritization] = React.useState<string>("High");
    const [isfixedamount, setIsFixedAmount] = React.useState<string>("Yes");
    const [category, setCategory] = React.useState<string>("Essential");
    const [categoryId, setCategoryId] = React.useState<number>(1);
    const [recurrenceId, setRecurrenceId] = React.useState<number>(1);
    const [id] = React.useState<number>(0);
   
    const db = useSQLiteContext();
    const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

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
        await insertTransaction({
          description,
          frequency: frequency as "Daily" | "Weekly" | "Monthly",
          prioritization: prioritization as "High" | "Medium" | "Low",
          isfixedamount: isfixedamount as "Yes" | "No",
          amount: Number(amount),
          category_id: categoryId,
          type: category as "Essential" | "Non_Essential",
          recurrence_id: recurrenceId,
          interval: Number(isrecurrence),
          subtype: subType as "Weekends" | "Weekdays" | "All" | "Custom",
          id,
        });
        setDescription("");
        setFrequency("Daily");
        setPrioritization("High");
        setIsFixedAmount("Yes");
        setAmount("");
        setCategoryId(1);
        setRecurrenceId(1);
        setCurrentTab(0);
        setIsAddingTransaction(false);

        
    }
    
     useEffect(() => {
          if (frequency === 'Daily') {
            setRecurrence('28'); 
            setsubType('Custom')
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
      <View style={{flex: 9}}>
        <ScrollView >
          {/* DESCRIPTION */}
          <View style={styles.content}>
              <Text style={styles.btext}>Item</Text>
              <TextInput
                placeholder="Provide an Item Description"
                style={{ marginBottom: 15, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'black'}}
                onChangeText={setDescription}
              />
          </View>

          {/* IS FIXED AMOUNT */}
          <View>
            <View style={styles.content}>
              <Text style={{fontWeight: 'bold', marginBottom:10}}>Is this a fixed amount?</Text>
              <SegmentedControl
                values={['Yes', 'No']}
                selectedIndex={selectedIndex}
                onChange={(event) => {setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
                }}
              />
            </View>
            {/* AMOUNT */}
            <View style={styles.content}>
              <Text style={{fontWeight: 'bold', marginBottom:10}}>Amount</Text>
              <TextInput
                placeholder="Enter Amount"
                style={{ marginBottom: 15, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'black' }}
                keyboardType="numeric"
                onChangeText={(text) => {
                  // Remove any non-numeric characters before setting the state
                  const numericValue = text.replace(/[^0-9.]/g, "");
                  setAmount(numericValue);
                  setIsFixedAmount("Yes")

                }}
              />
              
            </View>
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
                      setsubType(["Weekends", "Weekdays", "All", "Custom"][event.nativeEvent.selectedSegmentIndex]);
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      placeholder="0"
                      value={isRecurrenceInput}
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: 'black',
                        paddingHorizontal: 5,
                        textAlign: 'center',
                      }}
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


          {/* ENTRY TYPE, ESSENTIAL & NON ESSENTIAL */}
          <View style={styles.content}>
            <Text style={styles.btext}>Select an Expense Type</Text>
            <SegmentedControl
              values={["Needs", "Wants"]}
              style={{ marginBottom: 15, marginTop: 10, }}
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
          <Button title="Save" color={'black'} 
          onPress={()=>handleSaveExpense()} disabled={!validateFields()} 
          />
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

})