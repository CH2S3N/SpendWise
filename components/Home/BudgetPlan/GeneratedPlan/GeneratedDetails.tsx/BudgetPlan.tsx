import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'


export default function BudgetPlan() {
  return (
    <ScrollView>
        <View style={styles.mainContainer}>
            <View style={styles.card}>
                
            </View>
            <View style={styles.card}>
                    
            </View>
            <View style={styles.card}>
                    
            </View>
            <View style={styles.card}>
                    
            </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: 'green'
    },
    card:{
        flex: 1,
        backgroundColor: 'green'
    }
})