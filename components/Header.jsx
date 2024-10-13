import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.circular}/>
        <Text style={styles.itemText}>USER</Text>
      </View>
      <Ionicons name="notifications" size={24} color="white" />
    </View>
  )
};

const styles= StyleSheet.create({
  circular: {
    width: 50,
    height: 50,
    backgroundColor:Colors.DWHITE,
    borderRadius: 90,
    marginRight: 15
  },
  item: {
    height: 150,
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  itemText: {
    fontFamily: 'montserrat-bold',
    fontSize: 20,
    color: Colors.DWHITE

  },
   
});