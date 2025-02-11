import { RootState } from "@/state/store";
import { Category, Transaction } from "@/types"
import calculateMonthlyAmount from "@/utils/calcMonthlyAmount";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";


interface TransactionListItemProps{
    transaction: Transaction;
    categoryInfo: Category | undefined;
}

export default function TransactionListItem({ transaction}: TransactionListItemProps) {
    const { transactions } = useSelector(
        (state: RootState) => state.data
      );
    function calcMonthAmount() {
          const amount = (transaction.amount * transaction.interval) || 0;
          const frequency = transaction.frequency || 'Monthly';
          return calculateMonthlyAmount(amount, frequency);
      }
    const monthlyAmount = calcMonthAmount()
    
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
