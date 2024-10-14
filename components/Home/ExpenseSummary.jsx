import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function ExpenseSummary() {
  return (
    <View style={styles.container}>
        <View>
          <Text style={styles.title}>Expense Summary</Text>
        </View>
        <View style={styles.items}>
          <View style={styles.item1}>
            <Text>Essentials</Text>
          </View>
          <View style={styles.item2}>
            <Text >Non Essentials</Text>
          </View>

        </View>

       
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'start',
      alignItems: 'center',
      padding: 5
      
    },
    items: {  
      paddingTop: 5,  
      flexDirection: 'row',

    },
    item1: {
      alignItems: 'center',
      flexGrow:1
     
      
    },
    item2: {
      alignItems: 'center',
      flexGrow:1
     
      
    },
    title:{

    }
})