import { Category, Transaction } from "@/types"
import { ScrollView, Text, View, StyleSheet } from "react-native";


interface TransactionListItemProps{
    transaction: Transaction;
    categoryInfo: Category | undefined;
}

export default function TransactionListItemNonEssential({ transaction, categoryInfo}: TransactionListItemProps) {
    return (
        <View>  
                    {categoryInfo?.type === "Non_Essential" && (
                    <Text> {transaction?.description} amount: {transaction.amount}</Text>
                    )} 
        </View>

    )
}


