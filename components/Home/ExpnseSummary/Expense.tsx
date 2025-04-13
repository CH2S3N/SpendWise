import { Category, Transaction } from "@/types";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Modal as RNModal   } from "react-native";
import { Modal } from "@/components/Modal";
import UpdateExpense from "@/components/ui/UpdateExpense";
import React, { useState } from "react";
import { UseTransactionService } from "@/hooks/editData/TransactionService";
import { colors } from "@/constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ConfirmModal from "@/components/Modal/ConfirmModal";

 
export default function Expense() { 
    const { categories, transactions } = useSelector(
        (state: RootState) => state.data
      );
    const { deleteTransaction } = UseTransactionService();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
    const [tappedTransactionId, setTappedTransactionId] = useState<number | null>(null);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = React.useState(false);
      

    function calcTransactions() {
        return transactions.reduce((total, transaction) => {
          return total + (transaction.amount * transaction.interval) || 0;
    
        }, 0)  
    
      };



    return (
        <View style={styles.maincontainer}>
                <View style={styles.tableheader}>
                    <View style={styles.row}>
                        <Text style={styles.title}>Expenses</Text>
                        <Text style={[styles.amount, {color: colors.green}]}>Total: ₱ {calcTransactions()}</Text>
                    </View>
                </View>
                {transactions.length > 0 ? (
                    <>
                            {/* Expenses Lists */}
                            <View style={styles.container}>  
                                <View style={styles.contentSection}>
                                    <ScrollView>
                                        {transactions.map((transaction) => {
                                            const categoryForCurrentItem = categories.find(
                                                (category) => category.id === transaction.category_id
                                            );
                                            const isExpanded = tappedTransactionId === transaction.id;
                                            return (
                                                    <TouchableOpacity
                                                        key={transaction.id}
                                                        style={[styles.card, isExpanded ? {backgroundColor: colors.ligthGreen, } : { backgroundColor: colors.light, marginHorizontal:20}]}
                                                        activeOpacity={.8}
                                                        onPress={() => setTappedTransactionId(isExpanded ? null : transaction.id)}
                                                    >

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
                                                                        <Text style={[styles.label]}>Budget per Month</Text>
                                                                    </View>
                                                                </>
                                                            ) : (
                                                                <View style={[styles.cardinfo, ]}>

                                                                    <View style={styles.header}>
                                                                        <View style={styles.description}>
                                                                            <Text style={styles.title}>
                                                                                {transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}
                                                                            </Text>
                                                                        </View>
                                                                        <View style={styles.item}>
                                                                            <Text style={styles.amount}>₱ {Math.round(transaction.amount * transaction.interval)}</Text>
                                                                            <Text style={[styles.label]}>Budget per Month</Text>
                                                                        </View>
                                                                    </View>

                                                                    <View style={styles.details}>
                                                                    <View style={styles.row}>
                                                                            <Text style={[styles.label]}>
                                                                                <FontAwesome6 name="calendar-day" size={18} color={colors.green} /> Budget per Occurrence:
                                                                            </Text>
                                                                            <Text style={[styles.amount, { color: colors.green, fontSize:15, }]} >₱ {Math.round(transaction.amount)}</Text>
                                                                        </View>
                                                                        <View style={styles.row}>
                                                                            <Text style={[styles.label]}>
                                                                                <FontAwesome6 name="bag-shopping" size={18} color={colors.green} /> Expense Type:
                                                                            </Text>
                                                                            { transaction.type === "Non_Essential" ? (
                                                                                <Text style={styles.value}>Non Essential</Text>
                                                                            ) : (
                                                                                <Text style={styles.value}>Essential</Text>
                                                                            )}
                                                                        </View> 
                                                                        <View style={styles.row}>
                                                                            <Text style={[styles.label]}>
                                                                                <FontAwesome6 name="bag-shopping" size={18} color={colors.green} /> Expense Subtype:
                                                                            </Text>
                                                                            <Text style={styles.value}>{categoryForCurrentItem?.name}</Text>
                                                                        </View>
                                                                        <View style={styles.row}>
                                                                            <Text style={[styles.label]}>
                                                                                <FontAwesome6 name="calendar-alt" size={18} color={colors.green} /> Recurrence Pattern:
                                                                            </Text>
                                                                            <Text style={styles.value}>{transaction.frequency}{transaction.subtype === "Custom" ? (null) : (<Text>/{transaction.subtype}</Text>)}</Text>
                                                                        </View>
                                                                        <View style={styles.row}>
                                                                            <Text style={[styles.label]}>
                                                                                <FontAwesome6 name="calendar-day" size={18} color={colors.green} /> Occurrence Count:
                                                                            </Text>
                                                                            <Text style={styles.value}>{transaction.interval} Time/s per Month</Text>
                                                                        </View>
                                                                        <View style={styles.row}>
                                                                            <Text style={[styles.label]}>
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
                                                                                <Text style={[[styles.icon], { marginRight: 20 }]}>
                                                                                    <FontAwesome6 name="edit" size={35} color={colors.green} />
                                                                                </Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity onPress={() => setIsConfirmModalVisible(true)}>
                                                                                <Text style={[[styles.icon], { marginRight: 20 }]}>
                                                                                    <FontAwesome6 name="square-xmark" size={35} color={colors.red} />
                                                                                </Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            )}
                                                        </View>

                                                        
                                                    </TouchableOpacity>
                                            );
                                        })}
                                    </ScrollView>
                                </View>
                            </View>
                    </>
                ) : (
                        <View style={styles.noData}>
                            <Text style={styles.noDataTxt}>Manage your Expense here!</Text>
                            <Text style={styles.titletext}>To add your expenses just tap the Add Expense button.</Text>
                        </View>
                )}


            {/* Modal */}
            <Modal isOpen={isModalVisible} transparent animationType="fade" onRequestClose={() => setIsModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>UPDATE EXPENSE</Text>
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


            {/* Confirmation Deletion  Modal */}
            <ConfirmModal
            visible={isConfirmModalVisible} 
            title={'Confirm Deletion'} 
            message={'Are you sure you want to delete this entry?'} 
            onConfirm={()=> {
                if (tappedTransactionId !== null) {
                    deleteTransaction(tappedTransactionId);
                    setIsConfirmModalVisible(false); // Close modal after deletion
                    }
            }} 
            onCancel={() => setIsConfirmModalVisible(false)}      
            />
        </View>
    );
}

const styles=StyleSheet.create({
    maincontainer: {
        flex: 1,
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
        
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowRadius: 8,
        shadowOffset: { height: 6, width: 0 },
        shadowOpacity: 0.15,
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
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: "#000",
        shadowRadius: 8,
        shadowOffset: { height: 6, width: 0 },
        shadowOpacity: 0.15,
        flex: 1,
        marginBottom: 10
    },
    cardinfo: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title: {
        color: colors.dark,

        fontSize: 20,
        fontWeight: "bold",
    },
    amount: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "bold",
        color: colors.green,
        textShadowColor: 'black', 
        textShadowOffset: { width: .2, height: .2 }, 
        textShadowRadius: .2,
    },
    details: {
        borderTopWidth: 2,
        borderColor: colors.light,
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
        color: colors.dark,
        
    },
    value: {
        color: colors.dark,
        fontSize: 14,
        fontWeight: "bold",
    },

    tableheader: {
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 5,  
        borderBottomWidth:1,
        marginBottom:10
    },
    noData:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      noDataTxt:{
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.dark,
        fontSize: 30,
      },
      titletext:{
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.dark,
        fontSize: 20,
      },
      icon:{
        width: 40,
        textShadowColor: 'black', 
        textShadowOffset: { width: .7, height: .7 }, 
        textShadowRadius: .7, 
      }

})