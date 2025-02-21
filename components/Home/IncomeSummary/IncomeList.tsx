import { Income } from "@/types";
import { ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
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
                        <IncomeDetails
                          income={income}
                          incomeCategoryInfo={categoryForCurrentItem}
                          setIsModalVisible={setIsModalVisible}
                          setCurrentIncome={setCurrentIncome}
                          deleteIncome={deleteIncome}
                        />
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
          <Modal isOpen={isModalVisible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                      {currentIncome && (
                    <UpdateIncome
                      setIsModalVisible={setIsModalVisible}
                      setIsUpdatingIncome={setIsUpdatingIncome}
                      currentIncome={currentIncome}
                    />
                  )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
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
       paddingBottom: 5,
       marginBottom: 10
    },
    modal: {
        flex: 1,
        
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContent: {
      width: '80%',
      height: '80%',
    },
})