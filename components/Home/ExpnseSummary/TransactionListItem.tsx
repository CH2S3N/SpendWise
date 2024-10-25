import { Category, Transaction } from "@/types"
import { ScrollView, Text, View, StyleSheet } from "react-native";


interface TransactionListItemProps{
    transaction: Transaction;
    categoryInfo: Category | undefined;
}

export default function TransactionListItem({ transaction, categoryInfo}: TransactionListItemProps) {
    return (
        <View>  
                       
                        <Text>{transaction?.description} amount: {transaction.amount}</Text>
                         
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
