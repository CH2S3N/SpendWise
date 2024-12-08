import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import Card from './Card';
import { IncomeCategory, User } from '@/types';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

interface Props {
  setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
 
  insertBudget(user: User): Promise<void>;
}


export default function AddBudget({
    setIsAddingTransaction, 
    insertBudget,
}: Props) {
    const [budget_Amount, setBudgetAmount] = React.useState<string>("");
    const [currentTab, setCurrentTab] = React.useState<number>(0);
    const [incomeCategories, setIncomeCategories] = React.useState<IncomeCategory[]>([]);
    const [typeSelected, setTypeSelected] = React.useState<string>("");
    async function handleSaveExpense() {
        console.log ({
          budget_Amount: Number(budget_Amount),
          id: 1,
 
        });

        // to insert Budget
        await insertBudget({
          budget_Amount: Number(budget_Amount),
          id: 1,
          userName: ''
        });
        setBudgetAmount("");
        setIsAddingTransaction(false);
        
    }
    
  return (
    
    <Card content={
      <>
        <TextInput
          placeholder="₱Amount"
          style={{ fontSize: 32, marginBottom: 15, fontWeight: "bold" }}
          keyboardType="numeric"
          onChangeText={(text) => {
            // Remove any non-numeric characters before setting the state
            const numericValue = text.replace(/[^0-9.]/g, "");
            setBudgetAmount(numericValue);
          }}
        />



        {/* Cancel and Save Button */}
        <View
          style={{ flexDirection: "row", justifyContent: "space-around" }}
        >
          <Button title="Cancel" color={'black'} onPress={() => setIsAddingTransaction(false)}
          />
          <Button title="Save" color={'black'} onPress={handleSaveExpense} />
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
} : {
  id: number;
  title: string;
  isSelected: boolean;
  setTypeSelected: React.Dispatch<React.SetStateAction<string>>
 
}) {
  return (
      <TouchableOpacity
      onPress={() => {
          setTypeSelected(title);
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
