import { Category, Transaction } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import * as React from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import Card from "./Card";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTransaction ({
    insertTransaction,
}: {
    insertTransaction(transaction: Transaction): Promise<void>;
}) {
    const [isAddingTransaction, setIsAddingTransaction] = React.useState<boolean>(false);
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


    // to save added transactions
    async function handleSave() {
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
          id: 0,
          description,
          frequency: frequency as "Daily" | "Weekly" | "Bi-Weekly" | "Monthly",
          prioritization: prioritization as "High" | "Medium" | "Low",
          isfixedamount: isfixedamount as "Yes" | "No",
          amount: Number(amount),
          category_id: categoryId,
          type: category as "Essential" | "Non_Essential",
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



    // Return function of the Add transaction
    return (
        <View style={{ marginBottom: 15}}>
        {isAddingTransaction ? (
          <View>
            <Card>

              {/* DESCRIPTION */}
              <TextInput
                placeholder="Provide an entry description"
                style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'black'}}
                onChangeText={setDescription}
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
                    placeholder="$Amount"
                    style={{ fontSize: 32, marginBottom: 15, fontWeight: "bold" }}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      // Remove any non-numeric characters before setting the state
                      const numericValue = text.replace(/[^0-9.]/g, "");
                      setAmount(numericValue);
                    }}
                  />
                )}
              </View>

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

            </Card>
            

            {/* Cancel and Save Button */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Button title="Cancel" color={'black'} onPress={() => setIsAddingTransaction(false)}
              />
              <Button title="Save" color={'black'} onPress={handleSave} />
            </View>
          </View>
        ) : (
          <AddButton setIsAddingTransaction={setIsAddingTransaction} />
        )}
      </View>
    );
}


// THE BUTTON FOR ADDING AN ENTRY
function AddButton({
    setIsAddingTransaction,
}: {
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
      <View style={{ 
        position: 'absolute', 
        bottom: 1, 
        left: 20,
        }}>
        <TouchableOpacity
            onPress={() => setIsAddingTransaction(true)}
            activeOpacity={0.5}
            
        >
            <AntDesign name="pluscircle" size={60} color={'black'} />
        </TouchableOpacity>
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


