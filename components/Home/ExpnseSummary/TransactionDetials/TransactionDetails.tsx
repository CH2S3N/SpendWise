import { Modal } from "@/components/Modal";
import Card from "@/components/ui/Card";
import UpdateExpense from "@/components/ui/UpdateExpense";
import { UseTransactionService } from "@/hooks/editData/TransactionService";
import { RootState } from "@/state/store";
import { Category, Transaction } from "@/types"
import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";


interface Props{
    transaction: Transaction;
    categoryInfo: Category | undefined;
}

export default function TransactionDetails({ transaction, categoryInfo }: Props) {
    const { deleteTransaction, } = UseTransactionService();
    const { categories, transactions } = useSelector((state: RootState) => state.data);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddingTransaction, setIsAddingTransaction] = React.useState<boolean>(false);
    const [isUpdatingTransaction, setIsUpdatingTransaction] = React.useState<boolean>(false);
    const essentialTransactions = transactions.filter((transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential");

    const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
    const [isTapped, setIsTapped] = useState(false);
    return (
        <>
        <Card content={
            <>

                <TouchableOpacity
                        onPress={() => setIsTapped(prev => !prev)} 
                        onLongPress={() => deleteTransaction(transaction.id)}
                > 
                    <View style={styles.container}>  
                        {!isTapped ? (
                            <>
                                <View style={styles.description}>
                                    <Text style={styles.btext}>
                                        {transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}
                                    </Text>
                                    <Text style={styles.text}>{categoryInfo?.name}</Text>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.btext}>{transaction.amount}</Text>
                                    <Text style={styles.text}>{transaction.frequency}</Text>
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.description}>
                                    <Text style={styles.btext}>
                                        {transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}
                                    </Text>
                                    <Text style={styles.text}>{categoryInfo?.name}</Text>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.btext}>{transaction.amount}</Text>
                                    <Text style={styles.text}>{transaction.frequency}</Text>
                                </View>
                            </>
                        )}

                    </View>   
                </TouchableOpacity>

            </>
        }/>




        <Modal isOpen={isModalVisible} style={styles.modal}>
            {currentTransaction && (
                <UpdateExpense setIsModalVisible={setIsModalVisible} setIsUpdatingTransaction={setIsAddingTransaction}
                currentTransaction={currentTransaction}
                />
            )}
        </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
    },
    btext: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    item: {
        flex: 1,
        alignItems: 'center'
    },
    description: {
        flex: 2,
        alignItems: 'flex-start'
    },
    modal: {
        flex: 1,   
    }
})
