import { Category, Transaction } from "@/types";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TransactionListItem from "./TransactionListItem";



export default function TransactionList({
    transactions,
    categories,
    deleteTransaction,
}: {
    categories: Category[];
    transactions: Transaction[];
    deleteTransaction: (id: number) => Promise<void>;
}) {
    const essentialTransactions = transactions.filter(
        (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
    );
    const nonEssentialTransactions = transactions.filter(
        (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential"
    );

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                {essentialTransactions.map((transaction) => {
                    const categoryForCurrentItem = categories.find(
                        (category) => category.id === transaction.category_id
                    )
                    return (
                        <TouchableOpacity
                            key={transaction.id}
                            activeOpacity={0.5}
                            onLongPress={()=> deleteTransaction(transaction.id)}
                        >
                            <TransactionListItem 
                            transaction={transaction} 
                            categoryInfo={categoryForCurrentItem}
                            />
                        </TouchableOpacity>
                    )
                })}   
            </View>
            <View>
                {nonEssentialTransactions.map((transaction) => {
                    const categoryForCurrentItem = categories.find(
                        (category) => category.id === transaction.category_id
                    )
                    return (
                        <TouchableOpacity
                            key={transaction.id}
                            activeOpacity={0.5}
                            onLongPress={()=> deleteTransaction(transaction.id)}
                        >
                            <TransactionListItem 
                            transaction={transaction} 
                            categoryInfo={categoryForCurrentItem}
                            />
                        </TouchableOpacity>
                    )
                })}   
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    
    },
    item:{
        flex:1,
    }
})