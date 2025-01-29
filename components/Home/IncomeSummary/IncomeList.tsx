import { Income } from "@/types";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Modal } from "@/components/Modal";
import React, { useState } from "react";
import IncomeDetails from "./IncomeDetails";
import UpdateIncome from "@/components/ui/UpdateIncome";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { UseTransactionService } from "@/hooks/editData/TransactionService";


export default function IncomeList() {

    const { deleteIncome } = UseTransactionService();
     const { incomeCategories, incomes } = useSelector(
          (state: RootState) => state.data
        );
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdatingIncome, setIsUpdatingIncome] = React.useState<boolean>(false);
    const [currentIncome, setCurrentIncome] = useState<Income | null>(null);
  
    return (
        <View style={styles.maincontainer}>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.section}>
                
                {incomes.map((income) => {
                  const categoryForCurrentItem = incomeCategories.find(
                    (incomeCategory) => incomeCategory.id === income.incomeCategoryId
                  );
                  return (
                    <View key={income.id} style={styles.item}>
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentIncome(income);
                          setIsModalVisible(true);
                        }}
                        onLongPress={() => deleteIncome(income.id)}
                      >
                        <IncomeDetails
                          income={income}
                          incomeCategoryInfo={categoryForCurrentItem}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
    
              <Modal isOpen={isModalVisible} transparent={true} style={styles.modal}>
                  {currentIncome && (
                    <UpdateIncome
                      setIsModalVisible={setIsModalVisible}
                      setIsUpdatingIncome={setIsUpdatingIncome}
                      currentIncome={currentIncome}
                    />
                  )}
              </Modal>
            </View>
          </ScrollView>
        </View>
      );
}

const styles=StyleSheet.create({
    maincontainer: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 5
    },

    section: {
      
       flex: 1
    },
    item: {
       paddingBottom: 5
    },
    modal: {
        flex: 1,
        
    }
})