import { Category, Transaction } from "@/types";
import { Button, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import TransactionDetails from "./TransactionDetails";
import { Modal } from "@/components/Modal";
import UpdateExpense from "@/components/ui/UpdateExpense";
import React, { useState } from "react";
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
    const [isAddingTransaction, setIsAddingTransaction] = React.useState<boolean>(false);
    const [isUpdatingTransaction, setIsUpdatingTransaction] = React.useState<boolean>(false);
    const essentialTransactions = transactions.filter(
        (transaction) => transaction.type === "Essential"
    );
    
    const nonEssentialTransactions = transactions.filter(
        (transaction) => transaction.type === "Non_Essential"
    );

    const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
    const [tappedTransactionId, setTappedTransactionId] = useState<number | null>(null); // Track which transaction is tapped


    return (
        <View style={styles.maincontainer}>
            <ScrollView>
            <View style={styles.container}>
                    <View style={styles.section}>
                        {essentialTransactions.map((transaction) => {
                            const categoryForCurrentItem = categories.find(
                                (category) => category.id === transaction.category_id
                            );

                            return (
                                <TouchableOpacity
                                    key={transaction.id}
                                    style={styles.item}
                                    onPress={() =>
                                        setTappedTransactionId(tappedTransactionId === transaction.id ? null : transaction.id)
                                    }
                                >
                                    <TransactionDetails 
                                        transaction={transaction} 
                                        categoryInfo={categoryForCurrentItem}
                                        setIsModalVisible={setIsModalVisible}
                                        setCurrentTransaction={setCurrentTransaction}
                                        deleteTransaction={deleteTransaction}
                                        isTapped={tappedTransactionId === transaction.id}
                                    />
                                </TouchableOpacity>
                            );
                        })}   
                    </View>


                    <Modal isOpen={isModalVisible} transparent animationType="fade">
                    <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                        <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                            {currentTransaction && (
                                <UpdateExpense setIsModalVisible={setIsModalVisible} setIsUpdatingTransaction={setIsAddingTransaction}
                                currentTransaction={currentTransaction}
                                />
                            )}
                            </View>
                        </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
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
       paddingBottom: 5,
       marginBottom: 5

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