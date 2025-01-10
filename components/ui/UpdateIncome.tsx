import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useEffect } from 'react'
import Card from './Card';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSQLiteContext } from 'expo-sqlite';
import { Category, Income, IncomeCategory } from '@/types';


interface Props {
  setIsUpdatingIncome: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updateIncome(income: Income): Promise<void>;
  currentIncome: Income;
}

export default function UpdateIncome({
     updateIncome, 
     setIsUpdatingIncome, 
     setIsModalVisible, 
     currentIncome,
}: Props) {

    const [currentTab, setCurrentTab] = React.useState<number>(0);
    const [incomeCategories, setIncomeCategories] = React.useState<IncomeCategory[]>([]);
    const [typeSelected, setTypeSelected] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [frequency, setFrequency] = React.useState<string>("Daily");
    const [incomeCategory, setIncomeCategory] = React.useState<string>("Essential");
    const [incomeCategoryId, setIncomeCategoryId] = React.useState<number>(1);
   
    const db = useSQLiteContext();
    const [selectedIndex, setSelectedIndex] = React.useState<number>(1);

    React.useEffect(() => {
          if (currentIncome) {
            setAmount(String(currentIncome.amount || ""));
            setDescription(currentIncome.description || "");
            setFrequency(currentIncome.frequency || "Daily");
            setIncomeCategory(currentIncome.type || "Allowance");
            setIncomeCategoryId(currentIncome.incomeCategory_id || 1);
          }
        }, [currentIncome]);


     useEffect(() => {
            async function fetchIncomeCategories() {
                const result = await db.getAllAsync<IncomeCategory>('SELECT * FROM IncomeCategory;');
                setIncomeCategories(result);
            }
            fetchIncomeCategories();
          }, []);

    async function handleSaveIncome() {
        console.log ({
          id: currentIncome.id,
          description,
          frequency: frequency as "Daily" | "Weekly" | "Bi-Weekly" | "Monthly",
          amount: Number(amount),
          category_id: incomeCategoryId,
          type: incomeCategory as "Allowance" | "Salary" | "Others",
        });

      
        // to update transactions
        await updateIncome({
          id: currentIncome.id,
          description,
          frequency: frequency as "Daily" | "Weekly" | "Bi-Weekly" | "Monthly",
          amount: Number(amount),
          incomeCategory_id: incomeCategoryId,
          type: incomeCategory as "Allowance" | "Salary" | "Others",
        });
        setDescription("");
        setFrequency("Daily");
        setAmount("");
        setIncomeCategoryId(1);
        setCurrentTab(0);
        setIsModalVisible(false);
        setIsUpdatingIncome(false);
       
    }
    
  return (
    <Card content={
      <>
        {/* DESCRIPTION */}
        <TextInput
          placeholder="Provide an entry description"
          style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black'}}
          value={description}
          onChangeText={setDescription}
        />


          {/* AMOUNT */}
          <TextInput
              placeholder="₱Amount"
              style={{ marginBottom: 15, fontWeight: "bold", borderBottomWidth: 1, borderBottomColor: 'black' }}
              keyboardType="numeric"
              value={amount}
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
              setIsModalVisible(false);
              setIsUpdatingIncome(false)
            }
          
          }
          />
          <Button title="Save" color={'black'} onPress={handleSaveIncome} />
        </View>
          </>
        }>
    </Card>
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
