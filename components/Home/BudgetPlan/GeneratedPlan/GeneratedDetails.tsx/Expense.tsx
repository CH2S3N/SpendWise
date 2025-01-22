import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import Card from '@/components/ui/Card';
import { Divider } from 'react-native-paper';


export default function InitialExpense() {
  const { categories, transactions } = useSelector(
    (state: RootState) => state.data
  );

    const essentialTransactions = transactions.filter((transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential");
    const nonEssentialTransactions = transactions.filter((transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential");

  return (
     <View style={styles.mainContainer}>
        <ScrollView>
            {essentialTransactions.map((transaction) => {
                const categoryForCurrentItem = categories.find(
                    (category) => category.id === transaction.category_id
                )
                return (
                    <View key={transaction.id}>
                        <View style={styles.container}>  
                            <View style={styles.item}>
                                <View style={styles.itemA}>
                                    <Text style={styles.title}>{transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}</Text>
                                    <Text style={styles.subTitle}>{categoryForCurrentItem?.name}</Text>
                                </View>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.text}>{transaction.amount}</Text>
                            </View>
                        </View>
                        <Divider style={styles.dvd}/>
                    </View>
                )
            })}   
        </ScrollView>
        <ScrollView>
            {nonEssentialTransactions.map((transaction) => {
                const categoryForCurrentItem = categories.find(
                    (category) => category.id === transaction.category_id
                )
                return (
                    <View key={transaction.id}>
                        <View style={styles.container}>  
                            <View style={styles.item}>
                                <View style={styles.itemA}>
                                    <Text style={styles.title}>{transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}</Text>
                                    <Text style={styles.subTitle}>{categoryForCurrentItem?.name}</Text>
                                </View>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.text}>{transaction.amount}</Text>
                            </View>
                        </View>
                        <Divider style={styles.dvd}/>
                    </View>
                )
            })}   
        </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row'
},
container: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  paddingHorizontal: 20,
},
text: {
  fontSize: 10,
},
title: {
  fontWeight: 'bold',
  fontSize: 15,
},
subTitle: {
  fontSize: 10,
},
item: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
itemA: {
  justifyContent: 'center',
  alignItems: 'center'
},
description: {
  flex: 1,
  alignItems: 'flex-start'
},
dvd:{
  marginHorizontal: 30
}
})
