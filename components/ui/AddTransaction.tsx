import * as React from "react";
import {  ScrollView, StyleSheet, View } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import AddExpense from "./AddExpense";
import AddIncome from "./addIncome";
import { colors } from "@/constants/colors";





export default function AddTransaction ({
    setIsAddingTransaction, selectedTypeIndex, setselectedTypeIndex
}: {
  selectedTypeIndex: number;
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
    setselectedTypeIndex: React.Dispatch<React.SetStateAction<number>>;
    
}) {
    // Return function of the Add transaction
    return (
      <View style={[styles.container, ]}>
               <SegmentedControl
                style={styles.segmentCon}
                  values={['Expense', 'Income']}
                  selectedIndex={selectedTypeIndex}
                  onChange={(event) => 
                    setselectedTypeIndex(event.nativeEvent.selectedSegmentIndex)
                  }
                  tintColor={ selectedTypeIndex === 0 ? colors.red : colors.green} 
                  backgroundColor={selectedTypeIndex === 0 ? colors.lightRed : colors.ligthGreen}
                  fontStyle={{ color: colors.dark }} 
                  activeFontStyle={{ color: colors.light }} 
                />
                {/* Expense Form */}
                 {selectedTypeIndex === 0 && ( 
                  <AddExpense setIsAddingTransaction={setIsAddingTransaction}/>
                )}
                {/* Budget Form */}
                 {selectedTypeIndex === 1 && ( 
                  <AddIncome setIsAddingIncome={setIsAddingTransaction}/>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
  container:{
  width: '95%',
  height: '97%',
  },
  segmentCon:{

  }
})