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
    const [periodicity, setPeriodicity] = React.useState<string>("");
    const [currentTab, setCurrentTab] = React.useState<number>(0);
    const [incomeCategories, setIncomeCategories] = React.useState<IncomeCategory[]>([]);
    const [typeSelected, setTypeSelected] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [frequency, setFrequency] = React.useState<string>("Daily");
    const [incomeCategory, setIncomeCategory] = React.useState<string>("Allowance");
    const [incomeCategoryId, setIncomeCategoryId] = React.useState<number>(1);

    const db = useSQLiteContext();

    useEffect(() => {
        async function fetchIncomeCategories() {
            const result = await db.getAllAsync<IncomeCategory>('SELECT * FROM IncomeCategory;');
            setIncomeCategories(result);
        }
        fetchIncomeCategories();
      }, []);

      

      function validateFields() {
        if ( !description || !amount || !typeSelected || !periodicity) {
          return false;
        }
        
        return true;
      }
  

    async function handleSaveIncome() {
        console.log ({
            amount: Number(amount),
            description,
            frequency: frequency as "Daily" | "Weekly" | "Bi-Weekly" | "Monthly",
            incomeCategory_id: incomeCategoryId,
            type: incomeCategory as "Allowance" | "Salary" | "Others",
            periodicity: Number(periodicity),
            id: 0
        });

        // to insert transactions
        await insertIncome({
            amount: Number(amount),
            description,
            frequency: frequency as "Daily" | "Weekly" | "Monthly",
            incomeCategoryId: incomeCategoryId,
            type: incomeCategory as "Allowance" | "Salary" | "Others",
            periodicity: Number(periodicity),
            id: 0
        });
        setDescription("");
        setFrequency("Daily");
        setAmount("");
        setIncomeCategory("Allowance");
        setIsAddingTransaction(false);

    }
    
  return (
    <View style={styles.container}>

      <View style={styles.content}>
      {/* DESCRIPTION */}
      <Text style={styles.btext}>Item</Text>
        <TextInput
          placeholder="Provide an entry description"
          style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black'}}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.content}>
      {/* AMOUNT */}
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
      {/* Frequency */}
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
                      placeholder='0'
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
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TextInput
                      placeholder='0'
                      value={periodicity}
                      style={{borderBottomWidth: 1, borderBottomColor: 'black', paddingHorizontal: 5, textAlign: 'center'}}
                      keyboardType="numeric"
                      onChangeText={(text) => setPeriodicity(text)} // Update text as user types
                      onBlur={() => {
                        const numericValue = parseInt(periodicity);
                        if (numericValue > 7) {
                          setPeriodicity("7"); 
                        }
                        if (numericValue < 1) {
                          setPeriodicity("1");  
                        }
                      }}
                    />
                  <Text>Day/s in a Week</Text>
                    </View>
                      
                    
                    )}
        
                    {frequency === 'Monthly' && (
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text>Every</Text>
                      <TextInput
                      placeholder='0'
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
        <Text style={styles.btext}>Select a Entry Type</Text>
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