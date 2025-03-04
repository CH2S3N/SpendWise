import { Category, Transaction } from "@/types";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Modal as RNModal   } from "react-native";
import TransactionDetails from "./TransactionDetails";
import { Modal } from "@/components/Modal";
import UpdateExpense from "@/components/ui/UpdateExpense";
import React, { useState } from "react";
import { UseTransactionService } from "@/hooks/editData/TransactionService";
import { colors } from "@/constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import Card from "@/components/ui/Card";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Divider } from "react-native-paper";


export default function Expense() {
    const { categories, transactions } = useSelector(
        (state: RootState) => state.data
      );
    const { deleteTransaction } = UseTransactionService();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
    const [tappedTransactionId, setTappedTransactionId] = useState<number | null>(null);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = React.useState(false);
      
    const essentialTransactions = transactions.filter(
        (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
    );
    const nonEssentialTransactions = transactions.filter(
        (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential"
    );


    function calcTransactions() {
        return transactions.reduce((total, transaction) => {
          return total + (transaction.amount * transaction.interval) || 0;
    
        }, 0)  
    
      };



    return (
        <View style={styles.maincontainer}>
                {transactions.length > 0 ? (
                    <>
                        <ScrollView>
                            {/* Expenses Lists */}
                            <View style={styles.container}>
                                <View style={styles.tableheader}>
                                <View style={styles.row}>
                                    <Text style={styles.title}>Expenses</Text>
                                    <Text style={[styles.title, {color: colors.red}]}>Total: ₱ {calcTransactions()}</Text>
                                </View>
                                </View>
                                <Divider style={{marginBottom: 10}}/>
                                <View style={styles.contentSection}>
                                    {transactions.map((transaction) => {
                                        const categoryForCurrentItem = categories.find(
                                            (category) => category.id === transaction.category_id
                                        );
                                        const isExpanded = tappedTransactionId === transaction.id;
                                        return (
                                            <TouchableOpacity
                                                key={transaction.id}
                                                style={styles.item}
                                                activeOpacity={.8}
                                                onPress={() => setTappedTransactionId(isExpanded ? null : transaction.id)}
                                            >
                                                <Card
                                                    content={
                                                        <View style={styles.content}>
                                                            {!isExpanded ? (
                                                                <>
                                                                    <View style={styles.description}>
                                                                        <Text style={styles.title}>
                                                                            {transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}
                                                                        </Text>
                                                                    </View>
                                                                    <View style={styles.item}>
                                                                        <Text style={styles.amount}>₱ {transaction.amount * transaction.interval}</Text>
                                                                        <Text style={styles.label}>Budget per Month</Text>
                                                                    </View>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <View style={styles.card}>

                                                                        <View style={styles.header}>
                                                                            <View style={styles.description}>
                                                                                <Text style={styles.title}>
                                                                                    {transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}
                                                                                </Text>
                                                                            </View>
                                                                            <View style={styles.item}>
                                                                                <Text style={styles.amount}>₱ {Math.round(transaction.amount * transaction.interval)}</Text>
                                                                                <Text style={styles.label}>Budget per Month</Text>
                                                                            </View>
                                                                        </View>

                                                                        <View style={styles.details}>
                                                                        <View style={styles.row}>
                                                                                <Text style={styles.label}>
                                                                                    <FontAwesome6 name="calendar-day" size={18} color={colors.green} /> Budget per Occurrence:
                                                                                </Text>
                                                                                <Text style={[styles.value, { color: colors.green, fontSize:15, }]} >₱ {Math.round(transaction.amount)}</Text>
                                                                            </View>
                                                                            <View style={styles.row}>
                                                                                <Text style={styles.label}>
                                                                                    <FontAwesome6 name="bag-shopping" size={18} color={colors.green} /> Expense Type:
                                                                                </Text>
                                                                                { transaction.type === "Non_Essential" ? (
                                                                                    <Text style={styles.value}>Non Essential</Text>
                                                                                ) : (
                                                                                    <Text style={styles.value}>Essential</Text>
                                                                                )}
                                                                            </View>
                                                                            <View style={styles.row}>
                                                                                <Text style={styles.label}>
                                                                                    <FontAwesome6 name="bag-shopping" size={18} color={colors.green} /> Expense Subtype:
                                                                                </Text>
                                                                                <Text style={styles.value}>{categoryForCurrentItem?.name}</Text>
                                                                            </View>
                                                                            <View style={styles.row}>
                                                                                <Text style={styles.label}>
                                                                                    <FontAwesome6 name="calendar-alt" size={18} color={colors.green} /> Recurrence Pattern:
                                                                                </Text>
                                                                                <Text style={styles.value}>{transaction.frequency}{transaction.subtype === "Custom" ? (null) : (<Text>/{transaction.subtype}</Text>)}</Text>
                                                                            </View>
                                                                            <View style={styles.row}>
                                                                                <Text style={styles.label}>
                                                                                    <FontAwesome6 name="calendar-alt" size={18} color={colors.green} /> Occurrence Count:
                                                                                </Text>
                                                                                <Text style={styles.value}>{transaction.interval} Time/s per Month</Text>
                                                                            </View>
                                                                            <View style={styles.row}>
                                                                                <Text style={styles.label}>
                                                                                    <FontAwesome6 name="lock" size={18} color={colors.green} /> Fixed Amount?
                                                                                </Text>
                                                                                <Text style={[styles.value, { color: transaction.isfixedamount  === "Yes" ? colors.green : colors.red }]}>
                                                                                    {transaction.isfixedamount === "Yes" ? "Yes" : "No"}
                                                                                </Text>
                                                                            </View>
                                                                            <View style={styles.row2}>
                                                                                <TouchableOpacity onPress={() => {
                                                                                    setCurrentTransaction(transaction);
                                                                                    setIsModalVisible(true);
                                                                                }}>
                                                                                    <Text style={[styles.label, { marginRight: 20 }]}>
                                                                                        <FontAwesome6 name="edit" size={35} color={colors.green} />
                                                                                    </Text>
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity onPress={() => setIsConfirmModalVisible(true)}>
                                                                                    <Text style={[styles.label, { marginRight: 20 }]}>
                                                                                        <FontAwesome6 name="square-xmark" size={35} color={colors.red} />
                                                                                    </Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </>
                                                            )}
                                                        </View>
                                                    }
                                                />
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                        </ScrollView>
                    </>
                ) : (
                    <View style={[styles.container, { height: 400}]}>
                        <View style={styles.noData}>
                            <Text style={styles.noDataTxt}>No Expense Data!</Text>
                            <Text style={styles.titletext}>Please add some Expenses</Text>
                        </View>
                    </View>
                )}


            {/* Modal */}
            <Modal isOpen={isModalVisible} transparent animationType="fade" onRequestClose={() => setIsModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {currentTransaction && (
                            <UpdateExpense
                                setIsModalVisible={setIsModalVisible}
                                setIsUpdatingTransaction={setIsModalVisible} // Fix incorrect prop
                                currentTransaction={currentTransaction}
                            />
                        )}
                    </View>
                </View>
            </Modal>


            {/* Confirmation Modal */}
            <RNModal
            visible={isConfirmModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsConfirmModalVisible(false)}
            >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
                <View style={{
                width: 300,
                padding: 20,
                backgroundColor: 'white',
                borderRadius: 10,
                alignItems: 'center',
                }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
                    Confirm Save
                </Text>
                <Text style={{ marginBottom: 20 }}>
                    Are you sure you want to delete this entry?
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Button title="Cancel" color={colors.red} onPress={() => setIsConfirmModalVisible(false)} />
                    <Button title="Confirm" color={colors.green} onPress={()=> {
                        if (tappedTransactionId !== null) {
                            deleteTransaction(tappedTransactionId);
                            setIsConfirmModalVisible(false); // Close modal after deletion
                            }
                    }} />
                </View>
                </View>
            </View>
            </RNModal>
        </View>
    );
}

const styles=StyleSheet.create({
    maincontainer: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 5
    },

    contentSection: {
      
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


    description: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    description2: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },

    card: {
        flex: 1,
        paddingHorizontal: 5
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    amount: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "bold",
        color: colors.green,
    },
    details: {
        borderTopWidth: 1,
        borderColor: "#ddd",
        paddingTop: 10,
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    row2: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#666",
    },
    value: {
        fontSize: 14,
        fontWeight: "bold",
    },

    tableheader: {
        flex: 1,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingBottom: 5,  
    },
    noData:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      noDataTxt:{
        fontWeight: 'bold',
        textAlign: 'left',
        color: colors.dark,
        fontSize: 30,
      },
      titletext:{
        fontWeight: 'bold',
        color: colors.dark,
        fontSize: 20,
      },

})