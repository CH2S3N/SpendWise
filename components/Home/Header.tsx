import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@/constants/colors';



export default function Header() {
  return (
    <View  style={{
      padding: 20,
      backgroundColor: colors.dark,
      height: 150,
      }}>
      <View style={styles.container}>
        <View style={styles.item}></View>
        <View style={styles.item}>
          <Text style={styles.itemText}>SpendWise</Text>
        </View>
        <View style={styles.item}>
          <Ionicons name="notifications" size={35} color="white" />
        </View>
      </View>

    </View>
  )
};

const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  item: {
    
    
   
  },
  itemText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold'

  },
   
});