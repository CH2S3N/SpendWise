import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { Income, Transaction } from '@/types'
import { colors } from '@/constants/colors'

const Overview = () => {
    const { incomes, transactions } = useSelector((state: RootState) => state.data);
    

    const totalIncome =  incomes.reduce((total: number, income: Income) => {
        return total + (income.amount * income.interval || 1 )
    }, 0);
    const totalExpense =  transactions.reduce((total: number, transaction: Transaction) => {
        return total + (transaction.amount || 0)
    }, 0);
    const income = totalIncome;
    const expense = totalExpense;
    const savings = income - expense;
    const expenseRatio = income > 0 ? ((expense / income) * 100).toFixed(2) : "0";
    const savingsRatio = income > 0 ? ((savings / income) * 100).toFixed(2) : "0";
    
    return (
        <View style={styles.mainContainer}>
            {transactions.length > 0 && incomes.length > 0 ? (
                <>
                    <View style={styles.item}>
                        <Text style={{flex: 1, textAlign: 'left'}}>Income</Text>
                        <Text style={{flex: 1, textAlign: 'right', color: '#00d000'}}> + ₱{income}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={{flex: 1, textAlign: 'left'}}>Expenses</Text>
                        <Text style={{flex: 1, textAlign: 'right', color: '#fc2b46'}}>- ₱{expense} ({expenseRatio}%)</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={{flex: 1, textAlign: 'left', }}>Savings</Text>
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
        fontSize: 20
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
