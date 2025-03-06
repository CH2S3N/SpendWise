import * as React from "react";
import {  ScrollView, StyleSheet, View } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import AddExpense from "./AddExpense";
import AddIncome from "./addIncome";





export default function AddTransaction ({
    setIsAddingTransaction,
}: {
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
    
}) {
    const [isUpdatingTransaction, setIsUpdatingTransaction] = React.useState<boolean>(false);
    const [selectedTypeIndex, setselectedTypeIndex] = React.useState<number>(0);
    // Return function of the Add transaction
    return (
      <View style={styles.container}>
               <SegmentedControl
                  values={['Expense', 'Income']}
                  selectedIndex={selectedTypeIndex}
                  onChange={(event) => setselectedTypeIndex(event.nativeEvent.selectedSegmentIndex)}
                />
                {/* Expense Form */}
                 {selectedTypeIndex === 0 && ( 
                  <AddExpense setIsAddingTransaction={setIsAddingTransaction} setIsUpdatingTransaction={setIsUpdatingTransaction}/>
                )}
                {/* Budget Form */}
                 {selectedTypeIndex === 1 && ( 
                  <AddIncome setIsAddingTransaction={setIsAddingTransaction} setIsUpdatingTransaction={setIsUpdatingTransaction} />
                )}
        </View>
    );
}

const styles = StyleSheet.create({
  container:{
  width: '95%',
  height: '97%',

  }
})