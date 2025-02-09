import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Budget from '../Budget/totalIncome'
import TotalExpense from '../Budget/totalExpense'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'

const Overview = () => {
    const { goals } = useSelector((state: RootState) => state.data);
    
    function calcTotalGoal() {
        return goals.reduce((total, goal) => total + (goal.currentAmount || 0), 0);
    }

    const income = Budget();
    const expense = TotalExpense();
    const goal = calcTotalGoal();
    const total = income - expense - goal;
    const expenseRatio = ((expense / income) * 100).toFixed(2); 
    const savingsRatio = ((total / income) * 100).toFixed(2);

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Text style={{flex: 1, textAlign: 'left'}}>Total Income</Text>
                <Text style={{flex: 1, textAlign: 'right', color: '#00d000'}}> + ₱{income}</Text>
            </View>
            <View style={styles.item}>
                <Text style={{flex: 1, textAlign: 'left'}}>Total Expenses</Text>
                <Text style={{flex: 1, textAlign: 'right', color: '#fc2b46'}}>- ₱{expense} ({expenseRatio}%)</Text>
            </View>
            <View style={styles.item}>
                <Text style={{flex: 1, textAlign: 'left'}}>Accumulated Goals</Text>
                <Text style={{flex: 1, textAlign: 'right', color: '#79c0ff'}}>- ₱{goal}</Text>
            </View>
            <View style={styles.item}>
                <Text style={{flex: 1, textAlign: 'left', }}>Remaining Budget</Text>
                <Text style={{flex: 1, textAlign: 'right', }}>₱{total} ({savingsRatio}%)</Text>
            </View>
        </View>
    );
}

export default Overview;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start',        
    },
    item:{
        width: '100%',
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    }
});
