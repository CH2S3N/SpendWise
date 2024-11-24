import { Category, Transaction } from "@/types";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import TransactionDetails from "./TransactionDetails";


export default function Essential({
    transactions,
    categories,
    deleteTransaction
}: {
    categories: Category[];
    transactions: Transaction[];
    deleteTransaction: (id: number) => void;
}) {
    const essentialTransactions = transactions.filter(
        (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
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
                                        <TouchableOpacity
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
    }
})