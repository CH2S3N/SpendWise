import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Card from './Card';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default function AddExpense() {
  return (
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

        {/* Cancel and Save Button */}
        <View
        style={{ flexDirection: "row", justifyContent: "space-around" }}
        >
        <Button title="Cancel" color={'black'} onPress={() => setIsAddingTransaction(false)}
        />
        <Button title="Save" color={'black'} onPress={handleSave} />
        </View>
    </Card>
  )
}