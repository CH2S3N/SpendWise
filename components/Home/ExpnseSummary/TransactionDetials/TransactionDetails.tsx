import Card from "@/components/ui/Card";
import { Category, Transaction } from "@/types"
import { ScrollView, Text, View, StyleSheet } from "react-native";


interface TransactionListItemProps{
    transaction: Transaction;
    categoryInfo: Category | undefined;
}

export default function TransactionDetails({ transaction}: TransactionListItemProps) {
    return (
        <Card content={
            <View style={styles.container}>  
                <View style={styles.description}>
                    <Text style={styles.text}>{transaction.description}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.text}>{transaction.frequency}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.text}>{transaction.prioritization}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.text}>{transaction.amount}</Text>
                </View>
            </View>
        }/>
    )
}

const styles = StyleSheet.create({
    text: {
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
        flex: 1,
        alignItems: 'flex-start'
    }
})
