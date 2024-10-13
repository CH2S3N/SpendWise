import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

export default function Goals() {
  return (
    <View>
        <View style={styles.container}>
            <Text>Goals</Text>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor:Colors.DWHITE,
        padding:20,
        borderRadius: 15,
        elevation: 1
    }
})