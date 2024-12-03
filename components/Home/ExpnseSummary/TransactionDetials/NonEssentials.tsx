import { Category, Transaction } from "@/types";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TransactionDetails from "./TransactionDetails";
import React, { useState } from "react";
import { Modal } from "@/components/Modal";
import Card from "@/components/ui/Card";
import AddExpense from "@/components/ui/AddExpense";
import UpdateExpense from "@/components/ui/UpdateExpense";


export default function NonEssential({
    transactions,
    categories,
    deleteTransaction,
    updateTransaction
}: {
    categories: Category[];
    transactions: Transaction[];
    deleteTransaction: (id: number) => void;
    updateTransaction(transaction: Transaction): Promise<void>;
}) {
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

                    
                    <Modal isOpen={isModalVisible} transparent={true}>
                        <View style={styles.modal}>
                            {currentTransaction && (
                                <UpdateExpense setIsModalVisible={setIsModalVisible} updateTransaction={updateTransaction} setIsUpdatingTransaction={setIsUpdatingTransaction}
                                currentTransaction={currentTransaction}
                                />
                            )}
                      </View>
                            
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