import { Category, Transaction } from "@/types"
import { Text, View, StyleSheet } from "react-native";


interface TransactionListItemProps{
    transaction: Transaction;
    categoryInfo: Category | undefined;
}

export default function TransactionListItem({ transaction}: TransactionListItemProps) {
    const monthlyAmount = transaction.amount * transaction.interval
    
    return (
        <View style={styles.container}>  
            <View>
                <Text style={styles.text}>{transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}</Text>
            </View>
            <View>
                <Text style={styles.text}>{monthlyAmount}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
