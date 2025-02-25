import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Card from './Card';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useSQLiteContext } from 'expo-sqlite';
import { Income, IncomeCategory } from '@/types';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import { ScrollView } from 'react-native-gesture-handler';


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
    const [isRecurrence, setRecurrence] = React.useState<string>("");
    const [isRecurrenceInput, setRecurrenceInput] = React.useState<string>("");
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
      if ( !description || !amount || !typeSelected || (frequency == 'Daily' && !isRecurrence) || (subType === 'Custom' && !isRecurrence) || (frequency == 'Monthly' && !isRecurrence))  {
        return false;
      }
      
      return true;
    }


   useEffect(() => {
         if (frequency === 'Daily') {
           setRecurrence('30'); 
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
          if (currentIncome) {
            setAmount(String(currentIncome.amount || ""));
            setRecurrence(String(currentIncome.interval || ""));
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
          isRecurrence: Number(isRecurrence),
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
          interval: Number(isRecurrence),
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
      <View style={{flex: 8}}>
        <ScrollView>
          {/* DESCRIPTION */}
          <Text style={styles.btext}>Item</Text>
          <TextInput
            placeholder="Provide an entry description"
            style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black'}}
            value={description}
            onChangeText={setDescription}
          />

            {/* AMOUNT */}
            <Text style={styles.btext}>Amount</Text>
            <TextInput
                placeholder="Enter Amount"
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
                        setRecurrence(isRecurrence)
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
        </ScrollView>
      </View>

        {/* Cancel and Save Button */}
      <View style={{flex: 1}}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-around", }}
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