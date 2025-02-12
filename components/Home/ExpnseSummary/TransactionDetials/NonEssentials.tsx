import { Category, Transaction } from "@/types";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import TransactionDetails from "./TransactionDetails";
import React, { useState } from "react";
import { Modal } from "@/components/Modal";
import UpdateExpense from "@/components/ui/UpdateExpense";
import { UseTransactionService } from "@/hooks/editData/TransactionService";


export default function NonEssential({
    transactions,
    categories,
}: {
    categories: Category[];
    transactions: Transaction[];
}) {

      const { deleteTransaction } = UseTransactionService();
    

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdatingTransaction, setIsUpdatingTransaction] = React.useState<boolean>(false);
    const nonEssentialTransactions = transactions.filter((transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential");
    const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
    
    return (
        <View style={styles.maincontainer}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.section}>
                        {nonEssentialTransactions.map((transaction) => {
                            const categoryForCurrentItem = categories.find(
                                (category) => category.id === transaction.category_id
                            )
                            return (
                                <View key={transaction.id} style={styles.item}>
                                    <TouchableOpacity 
                                        onPress={() => {
                                            setCurrentTransaction(transaction);
                                        }}
                                    >
                                        <TransactionDetails 
                                            transaction={transaction} 
                                            categoryInfo={categoryForCurrentItem}
                                            setIsModalVisible={setIsModalVisible}
                                            setCurrentTransaction={setCurrentTransaction}
                                            deleteTransaction={deleteTransaction}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}   
                    </View>

                    
                    <Modal isOpen={isModalVisible} style={styles.modal}>
                            {currentTransaction && (
                                <UpdateExpense setIsModalVisible={setIsModalVisible} setIsUpdatingTransaction={setIsUpdatingTransaction}
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