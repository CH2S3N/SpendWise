import Card from "@/components/ui/Card";
import { Category, Transaction } from "@/types"
import { Text, View, StyleSheet } from "react-native";


interface Props{
    transaction: Transaction;
    categoryInfo: Category | undefined;
}

export default function TransactionDetails({ transaction, categoryInfo }: Props) {
    return (
        <Card content={
            <View style={styles.container}>  
                <View style={styles.description}>
                    <Text style={styles.text}>{transaction.description}</Text>
                    <Text style={styles.text}>{categoryInfo?.name}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.text}>{transaction.amount}</Text>
                    <Text style={styles.text}>{transaction.frequency}</Text>
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
        flex: 2,
        alignItems: 'flex-start'
    }
})
