import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native'
import React from 'react'
import Card from './Card';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSQLiteContext } from 'expo-sqlite';
import { Category, Transaction } from '@/types';
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';


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
    const [description, setDescription] = React.useState<string>("");
    const [frequency, setFrequency] = React.useState<string>("Daily");
    const [prioritization, setPrioritization] = React.useState<string>("High");
    const [isfixedamount, setIsFixedAmount] = React.useState<string>("Yes");
    const [category, setCategory] = React.useState<string>("Essential");
    const [categoryId, setCategoryId] = React.useState<number>(1);
   
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
        });

        // to insert transactions
        await insertTransaction({
          description,
          frequency: frequency as "Daily" | "Weekly" | "Bi-Weekly" | "Monthly",
          prioritization: prioritization as "High" | "Medium" | "Low",
          isfixedamount: isfixedamount as "Yes" | "No",
          amount: Number(amount),
          category_id: categoryId,
          type: category as "Essential" | "Non_Essential",
          id: 0
        });
        setDescription("");
        setFrequency("Daily");
        setPrioritization("High");
        setIsFixedAmount("Yes");
        setAmount("");
        setCategoryId(1);
        setCurrentTab(0);
        setIsAddingTransaction(false);

    }
    
  return (
    <View>
      <Card content={
        <>
          {/* DESCRIPTION */}
          <TextInput
            placeholder="Provide an entry description"
            style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black'}}
            onChangeText={setDescription}
          />

             {/* IS FIXED AMOUNT */}
             <View>
            <Text style={{ marginBottom: 6 }}>Is Fixed Amount?</Text>
            <SegmentedControl
              values={['Yes', 'No']}
              selectedIndex={selectedIndex}
              onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
            />
            {/* AMOUNT */}
            {selectedIndex === 0 && ( 
              <TextInput
                placeholder="₱Amount"
                style={{ marginBottom: 15, fontWeight: "bold", borderBottomWidth: 1, borderBottomColor: 'black' }}
                keyboardType="numeric"
                onChangeText={(text) => {
                  // Remove any non-numeric characters before setting the state
                  const numericValue = text.replace(/[^0-9.]/g, "");
                  setAmount(numericValue);
                }}
              />
            )}
          </View>

          {/* FREQUENCY */}
          <Text style={{ marginBottom: 6 }}>Frequency</Text>
          <SegmentedControl
            values={["Daily", "Weekly", "Bi-Weekly", "Monthly"]}
            style={{ marginBottom: 15 }}
            selectedIndex={["Daily", "Weekly", "Bi-Weekly", "Monthly"].indexOf(frequency)}
            onChange={(event) => {
              setFrequency(["Daily", "Weekly", "Bi-Weekly", "Monthly"][event.nativeEvent.selectedSegmentIndex]);
            }}
          />
          {/* PRIORITIZATION */}
          <Text style={{ marginBottom: 6 }}>Prioritization</Text>
          <SegmentedControl
            values={["High", "Medium", "Low"]}
            style={{ marginBottom: 15 }}
            selectedIndex={["High", "Medium", "Low"].indexOf(prioritization)}
            onChange={(event) => {
              setPrioritization(["High", "Medium", "Low"][event.nativeEvent.selectedSegmentIndex]);
            }}
          />

       

            {/* ENTRY TYPE, ESSENTIAL & NON ESSENTIAL */}
          <Text style={{ marginBottom: 6 }}>Select a Entry Type</Text>
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
              // @ts-ignore
              id={cat.id}
              title={cat.name}
              isSelected={typeSelected === cat.name}
              setTypeSelected={setTypeSelected}
              setCategoryId={setCategoryId}
            />
          ))}

          {/* Cancel and Save Button */}
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
            </>
          }>
      </Card>
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

