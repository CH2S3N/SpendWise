import { Category, Transaction } from "@/types";
import { ScrollView, StyleSheet, View } from "react-native";
import TransactionListItem from "./TransactionListItem";



export default function TransactionList({
    transactions,
    categories,
    deleteTransaction,
}: {
    categories: Category[];
    transactions: Transaction[];
    deleteTransaction?: (id: number) => Promise<void>;
}) {
    const essentialTransactions = transactions.filter(
        (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
    );
    const nonEssentialTransactions = transactions.filter(
        (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential"
    );

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
                                        <TransactionListItem 
                                        transaction={transaction} 
                                        categoryInfo={categoryForCurrentItem}
                                        />
                                    </View>
                                )
                            })}   
                        </View>
                        <View style={styles.section}>
                            {nonEssentialTransactions.map((transaction) => {
                                const categoryForCurrentItem = categories.find(
                                    (category) => category.id === transaction.category_id
                                )
                                return (
                                    <View key={transaction.id} style={styles.item}>
                                        <TransactionListItem 
                                        transaction={transaction} 
                                        categoryInfo={categoryForCurrentItem}
                                        />
                                    </View>
                                )
                            })}   
                        </View>
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
        paddingHorizontal: 5,
        justifyContent: 'center',
    },

    section: {
       paddingHorizontal: 10,
       flex: 1
    },
    item: {
        paddingBottom: 5,
    }
})