import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native'
import React from 'react'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSQLiteContext } from 'expo-sqlite';
import { Category, Transaction } from '@/types';



interface addExpenseProps {
  setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdatingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  insertTransaction(transaction: Transaction): Promise<void>;
}

export default function AddExpense({
    setIsAddingTransaction, insertTransaction, setIsUpdatingTransaction
}: addExpenseProps) {

    const [currentTab, setCurrentTab] = React.useState<number>(0);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [typeSelected, setTypeSelected] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [periodicity, setPeriodicity] = React.useState<string>("1");
    const [description, setDescription] = React.useState<string>("");
    const [frequency, setFrequency] = React.useState<string>("Daily");
    const [prioritization, setPrioritization] = React.useState<string>("High");
    const [recurrence, setRecurrence] = React.useState<string>("Sun");
    const [isfixedamount, setIsFixedAmount] = React.useState<string>("Yes");
    const [category, setCategory] = React.useState<string>("Essential");
    const [categoryId, setCategoryId] = React.useState<number>(1);
    const [recurrenceId, setRecurrenceId] = React.useState<number>(1);
    const [id, setId] = React.useState<number>(0);
   
    const db = useSQLiteContext();
    const [selectedIndex, setSelectedIndex] = React.useState<number>(1);

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

    async function handleSaveExpense() {
        console.log ({
            description,
            frequency: frequency as "Daily" | "Weekly" | "Bi-Weekly" | "Monthly",
            prioritization: prioritization as "High" | "Medium" | "Low",
            isfixedamount: isfixedamount as "Yes" | "No",
            amount: Number(amount),
            category_id: categoryId,
            type: category as "Essential" | "Non_Essential",
            recurrence: recurrence as "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat",
            periodicity: Number(periodicity),
            recurrence_id: recurrenceId,
            id,
        });

        // to insert transactions
        await insertTransaction({
          description,
          frequency: frequency as "Daily" | "Weekly" | "Monthly",
          prioritization: prioritization as "High" | "Medium" | "Low",
          isfixedamount: isfixedamount as "Yes" | "No",
          amount: Number(amount),
          category_id: categoryId,
          type: category as "Essential" | "Non_Essential",
          recurrence_id: recurrenceId,
          periodicity: Number(periodicity),
          id,
     
        });
        setDescription("");
        setFrequency("Daily");
        setPrioritization("High");
        setIsFixedAmount("Yes");
        setAmount("");
        setRecurrence("");
        setCategoryId(1);
        setRecurrenceId(1);
        setCurrentTab(0);
        setIsAddingTransaction(false);

        
    }
    
  return (
    <View style={styles.container}>
      <View style={styles.content}>
          {/* DESCRIPTION */}
          <Text style={styles.btext}>Item</Text>
          <TextInput
            placeholder="Provide an entry description"
            style={{ marginBottom: 15, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'black'}}
            onChangeText={setDescription}
          />
      </View>

      {/* IS FIXED AMOUNT */}
      <View>
        <View style={styles.content}>
          <Text style={{fontWeight: 'bold', marginBottom:10}}>Is Fixed Amount?</Text>
          <SegmentedControl
            values={['Yes', 'No']}
            selectedIndex={selectedIndex}
            onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
          />
        </View>
        <View style={styles.content}>
          {/* AMOUNT */}
          {selectedIndex === 0 && ( 
            <TextInput
              placeholder="Enter Amount"
              style={{ marginBottom: 15, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'black' }}
              keyboardType="numeric"
              onChangeText={(text) => {
                // Remove any non-numeric characters before setting the state
                const numericValue = text.replace(/[^0-9.]/g, "");
                setAmount(numericValue);
              }}
            />
          )}
        </View>
      </View>

      {/* FREQUENCY */}
      <View>
        <View style={styles.content}>
            <Text style={styles.btext}>Frequency</Text>
            <SegmentedControl
              values={["Daily", "Weekly", "Monthly"]}
              style={{ marginTop: 10, }}
              selectedIndex={["Daily", "Weekly", "Monthly"].indexOf(frequency)}
              onChange={(event) => {
                setFrequency(["Daily", "Weekly", "Monthly"][event.nativeEvent.selectedSegmentIndex]);
              }}
            />
        </View>
        <View style={styles.content}>
            {frequency === 'Daily' && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Every</Text>
              <TextInput
               value={periodicity}
              style={{ borderBottomWidth: 1, borderBottomColor: 'black',  paddingHorizontal: 5, textAlign: 'center'}}
              keyboardType="numeric"
              onChangeText={(text) => {
                // Remove any non-numeric characters before setting the state
                const numericValue = text.replace(/[^0-9.]/g, "");
                setPeriodicity(numericValue);
              }}
            />
            <Text>Day</Text>
              </View>
            )}
           {frequency === 'Weekly' && (
             <Text>Weekly</Text>
          
            
            )}

            {frequency === 'Monthly' && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Every</Text>
              <TextInput
              value={periodicity}
              style={{ borderBottomWidth: 1, borderBottomColor: 'black',  paddingHorizontal: 5, textAlign: 'center'}}
              keyboardType="numeric"
              onChangeText={(text) => {
                // Remove any non-numeric characters before setting the state
                const numericValue = text.replace(/[^0-9.]/g, "");
                setPeriodicity(numericValue);
              }}
            />
            <Text>Month</Text>
              </View>
            )}
        </View>
      </View>
      





      <View style={styles.content}>
          {/* PRIORITIZATION */}
          <Text style={styles.btext}>Prioritization</Text>
          <SegmentedControl
            values={["High", "Medium", "Low"]}
            style={{ marginBottom: 15, marginTop: 10, }}
            selectedIndex={["High", "Medium", "Low"].indexOf(prioritization)}
            onChange={(event) => {
              setPrioritization(["High", "Medium", "Low"][event.nativeEvent.selectedSegmentIndex]);
            }}
          />
      </View>

      <View style={styles.content}>
        {/* ENTRY TYPE, ESSENTIAL & NON ESSENTIAL */}
        <Text style={styles.btext}>Select a Entry Type</Text>
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
          // @ts-ignore
          id={cat.id}
          title={cat.name}
          isSelected={typeSelected === cat.name}
          setTypeSelected={setTypeSelected}
          setCategoryId={setCategoryId}
          />
        ))}
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
              <Button title="Save" color={'black'} onPress={handleSaveExpense} />
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