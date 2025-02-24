import { Modal } from "@/components/Modal";
import Card from "@/components/ui/Card";
import UpdateExpense from "@/components/ui/UpdateExpense";
import { colors } from "@/constants/colors";
import { UseTransactionService } from "@/hooks/editData/TransactionService";
import { RootState } from "@/state/store";
import { Category, Transaction } from "@/types"
import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MainContainer from '@/components/Containers/MainContainer';

interface Props{
    transaction: Transaction;
    categoryInfo: Category | undefined;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
    deleteTransaction: (id: number) => void;
    
}

export default function TransactionDetails({ transaction, categoryInfo, setIsModalVisible, setCurrentTransaction, deleteTransaction }: Props) {
    const [isTapped, setIsTapped] = useState(false);

    return (
            <Card content={
                <>

                    <TouchableOpacity
                            onPress={() => setIsTapped(prev => !prev)} 
                    > 
                        <View style={styles.container} >  
                            {!isTapped ? (
                                <>
                                    <View style={styles.description}>
                                        <Text style={styles.title}> {transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}</Text>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={styles.amount}>₱ {transaction.amount}</Text>
                                        <Text style={styles.label}>Budget per Month</Text>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View style={styles.card} >
                                        <View style={styles.header}>
                                            <View style={styles.description}>
                                                <Text style={styles.title}> {transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}</Text>
                                            </View>

                                            <View style={styles.item}>
                                                <Text style={styles.amount}>₱ {Math.round(transaction.amount/transaction.interval)}</Text>
                                                <Text style={styles.label}>Budget per Occurence</Text>
                                            </View>

                                        </View>
                                        <View style={styles.details}>
                                            <View style={styles.row}>
                                                <Text style={styles.label}><FontAwesome6 name="bag-shopping" size={18} color= {colors.green} /> Expense Type:</Text>
                                                <Text style={styles.value}>{categoryInfo?.name}</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={styles.label}><FontAwesome6 name="calendar-alt" size={18} color= {colors.green} /> Recurrence:</Text>
                                                <Text style={styles.value}>{transaction.frequency}/{transaction.subtype}</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={styles.label}><FontAwesome6 name="calendar-day" size={18} color={colors.green} /> Occurrence:</Text>
                                                <Text style={styles.value}>{transaction.interval} time(s) per month</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={styles.label}><FontAwesome6 name="lock" size={18} color={colors.green} /> Fixed Amount?</Text>
                                                {transaction.isfixedamount === 'Yes' ? (<Text style={[styles.value, { color: colors.green }]}>{transaction.isfixedamount}</Text>) : (<Text style={[styles.value, { color: colors.red }]}>{transaction.isfixedamount}</Text>)}
                                                
                                            </View>
                                            <View style={styles.row2} >
                                                <TouchableOpacity onPress={() => {
                                                    setCurrentTransaction(transaction);
                                                    setIsModalVisible(true)
                                                    }} >
                                                    <Text style={[styles.label, { marginRight: 20} ]}><FontAwesome6 name="edit" size={35} color={colors.green} /></Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => deleteTransaction(transaction.id)} >
                                                    <Text  style={[styles.label, { marginRight: 20} ]}><FontAwesome6 name="square-xmark" size={35} color={colors.red} /></Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </>
                            )}
                        </View>   
                    </TouchableOpacity>
                </>
            }/>
    )
}

const styles = StyleSheet.create({


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
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    description2: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    modal: {
        flex: 1,   
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
})
