import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import Card from '@/components/ui/Card';
import styles from './styles';
import { Divider } from 'react-native-paper';


export default function InitialExpense() {
  const { categories, transactions } = useSelector(
    (state: RootState) => state.data
  );


  return (
     <View style={styles.mainContainer}>
        <ScrollView>
            {transactions.map((transaction) => {
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
                                <Text style={styles.text}>{transaction.frequency}</Text>
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

