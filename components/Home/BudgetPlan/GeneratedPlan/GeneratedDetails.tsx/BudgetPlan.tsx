import { View, Text, ScrollView, StyleSheet, Button } from 'react-native'
import React from 'react'
import { Divider } from '@rneui/base'
import InitialExpense from './Expense'
import InitialIncome from './Income'
import { Income } from '@/types'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import calculateMonthlyAmount from '@/utils/calcMonthlyAmount'
import Generate from '@/hooks/generateBudgetplan/Generate'
import GenerateService from '@/hooks/generateBudgetplan/Generate'

export default function BudgetPlan() {


const { handleSaveExpense } = GenerateService();
    



  return (
        <View style={styles.mainContainer}>
            <View style={styles.card}>

                <Divider/>
                {/* Income */}
                <View style={styles.title}>
                    <Text style={styles.txt}>Income</Text>
                </View>
                <View style={styles.container}>
                    <InitialIncome/>
                </View>


                <Divider/>
                {/* Expense */}
                <View style={styles.title}>
                    <Text style={styles.txt}>Expense</Text>
                </View>
                <View style={styles.container}>
                    <InitialExpense/>
                </View>


                <Divider/>
                {/* Savings */}
                <View style={styles.title}>
                    <Text style={styles.txt}>Savings</Text>
                </View>
                <View style={styles.container}>
                <Button
        title='Generate'
        onPress={handleSaveExpense}
        />
                </View>


                <Divider/>
                {/* Summary */}
                <View style={styles.title}>
                    <Text style={styles.txt}>Summary</Text>
                </View>
                <View style={styles.container}>
                    <Text>Content</Text>
                </View>
                <Divider/>
                
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
    },
    card:{
        flex: 1,
        marginBottom: 5
    },
    container:{
        flex: 1,
       
    },
    container1:{
        flex: 1,
        flexDirection: 'row'
    },
    title:{
        paddingLeft: 5,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    txt:{
        fontWeight: 'bold'
    }
})