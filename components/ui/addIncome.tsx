import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Card from './Card';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSQLiteContext } from 'expo-sqlite';
import { Category, Income, IncomeCategory, Transaction } from '@/types';
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/state/dataSlice';


interface addIncomeProps {
  setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdatingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  insertIncome(income: Income): Promise<void>;
}

export default function AddIncome({
    setIsAddingTransaction, insertIncome, setIsUpdatingTransaction
}: addIncomeProps) {

    const [currentTab, setCurrentTab] = React.useState<number>(0);
    const [incomeCategories, setIncomeCategories] = React.useState<IncomeCategory[]>([]);
    const [typeSelected, setTypeSelected] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [frequency, setFrequency] = React.useState<string>("Daily");
    const [incomeCategory, setincomeCategory] = React.useState<string>("Daily");
    const [incomeCategoryId, setIncomeCategoryId] = React.useState<number>(1);

    const db = useSQLiteContext();

    useEffect(() => {
        async function fetchIncomeCategories() {
            const result = await db.getAllAsync<IncomeCategory>('SELECT * FROM IncomeCategory;');
            setIncomeCategories(result);
        }
        fetchIncomeCategories();
      }, []);


    async function handleSaveIncome() {
        console.log ({
            amount: Number(amount),
            description,
            frequency: frequency as "Daily" | "Weekly" | "Bi-Weekly" | "Monthly",
            incomeCategory_id: incomeCategoryId,
        });

        // to insert transactions
        await insertIncome({
            amount: Number(amount),
            description,
            frequency: frequency as "Daily" | "Weekly" | "Bi-Weekly" | "Monthly",
            incomeCategory_id: incomeCategoryId,
            type: incomeCategory as "Allowance" | "Salary" | "Others",
            id: 0
        });
        setDescription("");
        setFrequency("Daily");
        setAmount("");
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


            {/* AMOUNT */}
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

          <Text style={{ marginBottom: 6 }}>Select a Entry Type</Text>
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
            <Button title="Save" color={'black'} onPress={handleSaveIncome} />
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
                {title}
            </Text>
        </TouchableOpacity>
    )
}

