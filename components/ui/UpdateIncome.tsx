import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Card from './Card';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSQLiteContext } from 'expo-sqlite';
import { Income, IncomeCategory } from '@/types';
import { UseTransactionService } from '@/hooks/editData/TransactionService';


interface Props {
  setIsUpdatingIncome: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentIncome: Income;
}

export default function UpdateIncome({
     setIsUpdatingIncome, 
     setIsModalVisible, 
     currentIncome,
}: Props) {
    const [interval, setInterval] = React.useState<string>("");
    const [currentTab, setCurrentTab] = React.useState<number>(0);
    const [incomeCategories, setIncomeCategories] = React.useState<IncomeCategory[]>([]);
    const [typeSelected, setTypeSelected] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [frequency, setFrequency] = React.useState<string>("Daily");
    const [subType, setSubType] = React.useState<string>("Weekends");
    const [incomeCategory, setIncomeCategory] = React.useState<string>("Essential");
    const [incomeCategoryId, setIncomeCategoryId] = React.useState<number>(1);
   
    const db = useSQLiteContext();

    const { updateIncome } = UseTransactionService();
    
    function validateFields() {
      if ( !description || !amount || !typeSelected || (frequency == 'Daily' && !interval) || (subType === 'Custom' && !interval) || (frequency == 'Monthly' && !interval))  {
        return false;
      }
      
      return true;
    }


   useEffect(() => {
         if (frequency === 'Daily') {
           setInterval('30'); 
           setSubType('Custom')
         }
         if (frequency === 'Weekly' && subType === 'Weekends') {
           setInterval('2'); 
         }
         if (frequency === 'Weekly' && subType === 'Weekdays') {
           setInterval('5'); 
         }
         if (frequency === 'Weekly' && subType === 'All') {
           setInterval('7'); 
         }
         if (frequency === 'Weekly' && subType === 'Custom') {
           setInterval('1'); 
         }
         if (frequency === 'Monthly'){
           setInterval('1'); 
           setSubType('Custom')
         }
         if (frequency === 'Bi-Weekly'){
           setInterval('1'); 
           setSubType('Custom')
         }
       }, [frequency, subType]);
   



    React.useEffect(() => {
          if (currentIncome) {
            setAmount(String(currentIncome.amount || ""));
            setInterval(String(currentIncome.interval || ""));
            setDescription(currentIncome.description || "");
            setFrequency(currentIncome.frequency || "Daily");
            setIncomeCategory(currentIncome.type || "Allowance");
            setIncomeCategoryId(currentIncome.incomeCategoryId || 1);
            setSubType(currentIncome.subtype || "")
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
          interval: Number(interval),
          subtype: subType as "Weekends" | "Weekdays" | "All" | "Custom",
        });

      
        // to update transactions
        await updateIncome({
          id: currentIncome.id,
          description,
          frequency: frequency as "Daily" | "Weekly" | "Monthly",
          amount: Number(amount),
          incomeCategoryId: incomeCategoryId,
          type: incomeCategory as "Allowance" | "Salary" | "Others",
          interval: Number(interval),
          subtype: subType as "Weekends" | "Weekdays" | "All" | "Custom",
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
                    <View>
                      <View style={styles.content}>
                          <Text style={styles.btext}>Frequency</Text>
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
                                setSubType(["Weekends", "Weekdays", "All", "Custom"][event.nativeEvent.selectedSegmentIndex]);
                                setInterval(interval)
                              }}
                            />
                            
                          )}
                          {frequency === 'Weekly' && subType === 'Custom' && (
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TextInput
                            placeholder='0'
                             value={interval}
                            style={{ borderBottomWidth: 1, borderBottomColor: 'black',  paddingHorizontal: 5, textAlign: 'center'}}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                              // Remove any non-numeric characters before setting the state
                              const numericValue = text.replace(/[^0-9.]/g, "");
                              setInterval(numericValue);
                            }}
                            />
                            <Text>Time/s in a Week</Text>
                            </View>
                          )}
                          {frequency === 'Bi-Weekly' && (
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TextInput
                              placeholder='0'
                              value={interval}
                              style={{ borderBottomWidth: 1, borderBottomColor: 'black',  paddingHorizontal: 5, textAlign: 'center'}}
                              keyboardType="numeric"
                              onChangeText={(text) => {
                                // Remove any non-numeric characters before setting the state
                                const numericValue = text.replace(/[^0-9.]/g, "");
                                setInterval(numericValue);
                              }}
                            />
                            <Text>Time/s in a Bi-Week</Text>
                            </View>
                          )}
              
                          {frequency === 'Monthly' && (
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                              <TextInput
                                placeholder='0'
                                value={interval}
                                style={{ borderBottomWidth: 1, borderBottomColor: 'black',  paddingHorizontal: 5, textAlign: 'center'}}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                  // Remove any non-numeric characters before setting the state
                                  const numericValue = text.replace(/[^0-9.]/g, "");
                                  setInterval(numericValue);
                                }}
                              />
                              <Text>Time/s in a Month</Text>
                            </View>
                          )}
                      </View>
                    </View>

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
          <Button title="Save" color={'black'} onPress={handleSaveIncome} disabled={!validateFields()}/>
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