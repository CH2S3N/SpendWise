import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { Income, Transaction } from '@/types'
import { colors } from '@/constants/colors'

const Overview = () => {
    const { incomes, transactions, categories } = useSelector((state: RootState) => state.data);
    

    const totalIncome =  incomes.reduce((total: number, income: Income) => {
        return total + (income.amount  || 0 )
    }, 0);
    const essentialTransactions = transactions.filter(
        (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
    );
    const nonEssentialTransactions = transactions.filter(
        (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential"
    );
    const totalEssentialExpense =  essentialTransactions.reduce((total: number, transaction: Transaction) => {
        return total + (transaction.amount || 0)
    }, 0);
    const totalNonEssentialExpense =  nonEssentialTransactions.reduce((total: number, transaction: Transaction) => {
        return total + (transaction.amount || 0)
    }, 0);
    const income = totalIncome;
    const needsExpense = totalEssentialExpense;
    const wantsExpense = totalNonEssentialExpense;
    const expense = totalEssentialExpense + totalNonEssentialExpense
    const savings = income - expense;
    const needsRatio = income > 0 ? ((needsExpense / income) * 100).toFixed(0) : "0";
    const wantsRatio = income > 0 ? ((wantsExpense / income) * 100).toFixed(0) : "0";
    const expenseRatio = income > 0 ? ((expense / income) * 100).toFixed(0) : "0";
    const savingsRatio = income > 0 ? ((savings / income) * 100).toFixed(0) : "0";
    
    return (
        <View style={styles.mainContainer}>
            {transactions.length > 0 && incomes.length > 0 ? (
                <>
                    <View style={styles.item}>
                        <Text style={styles.title}>Income</Text>
                        <Text style={{flex: 1, textAlign: 'right', color: '#00d000'}}> + ₱{income}</Text>
                    </View>
                    {essentialTransactions.length > 0 && nonEssentialTransactions.length > 0 ? (
                        <>
                            {essentialTransactions.length > 0 && (
                                <View style={styles.item}>
                                    <Text style={styles.title}>Expenses (Needs)</Text>
                                    <Text style={{flex: 1, textAlign: 'right', color: '#fc2b46'}}>- ₱{needsExpense} ({needsRatio}%)</Text>
                                </View>
                            )}
                            {nonEssentialTransactions.length > 0 && (
                                <View style={styles.item}>
                                    <Text style={styles.title}>Expenses (Wants)</Text>
                                    <Text style={{flex: 1, textAlign: 'right', color: '#fc2b46'}}>- ₱{wantsExpense} ({wantsRatio}%)</Text>
                                </View>
                            )}
                        </>
                    ) : (
                        <View style={styles.item}>
                        <Text style={styles.title}>Expenses (Needs)</Text>
                        <Text style={{flex: 1, textAlign: 'right', color: '#fc2b46'}}>- ₱{expense} ({expenseRatio}%)</Text>
                    </View>
                    )}
                    <View style={styles.item}>
                        <Text style={styles.title}>Savings</Text>
                        <Text style={{flex: 1, textAlign: 'right', }}>₱{savings} ({savingsRatio}%)</Text>
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.noData}>
                    <Text style={styles.noDataTxt}>No Transaction Data</Text>
                    </View>
                
                </>
            )}
          
        </View>
    );
}

export default Overview;

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start',  
        paddingHorizontal: 10      
    },
    item:{
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    title:{
        fontWeight: 'bold',
    },
    data:{


    },
      noData:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      noDataTxt:{
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.dark,
        opacity: 0.5
      },
});
