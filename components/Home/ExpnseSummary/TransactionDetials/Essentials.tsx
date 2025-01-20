import { Category, Transaction } from "@/types";
import { Button, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import TransactionDetails from "./TransactionDetails";
import { Modal } from "@/components/Modal";
import UpdateExpense from "@/components/ui/UpdateExpense";
import React, { useState } from "react";
import { UseTransactionService } from "@/hooks/editData/TransactionService";


export default function Essential({
    transactions,
    categories,
}: {
    categories: Category[];
    transactions: Transaction[];
}) {

      const { deleteTransaction } = UseTransactionService();
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddingTransaction, setIsAddingTransaction] = React.useState<boolean>(false);
    const [isUpdatingTransaction, setIsUpdatingTransaction] = React.useState<boolean>(false);
    const essentialTransactions = transactions.filter(
        (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
    );

    const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  
    return (
        <View style={styles.maincontainer}>
            <ScrollView>
                <View style={styles.container}>
                        <View style={styles.section}>
                            {essentialTransactions.map((transaction) => {
                                const categoryForCurrentItem = categories.find(
                                    (category) => category.id === transaction.category_id
                                )
                                return (
                                    <View key={transaction.id} style={styles.item}>
                                    <TouchableOpacity 
                                        onPress={() => {
                                            setCurrentTransaction(transaction);
                                            setIsModalVisible(true)
                                        }}
                                        onLongPress={() => deleteTransaction(transaction.id)}
                                    >
                                        <TransactionDetails 
                                        transaction={transaction} 
                                        categoryInfo={categoryForCurrentItem}

                                        />
                                    </TouchableOpacity>
                                </View>
                                )
                            })}   
                        </View>


                        <Modal isOpen={isModalVisible} style={styles.modal}>
                            {currentTransaction && (
                                <UpdateExpense setIsModalVisible={setIsModalVisible} setIsUpdatingTransaction={setIsAddingTransaction}
                                currentTransaction={currentTransaction}
                                />
                            )}
                    </Modal>
                    
                </View>
            </ScrollView>
        </View>
    )
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