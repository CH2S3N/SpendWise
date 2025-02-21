import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import styles from './styles';
import { Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function InitialExpense() {
  const { categories, transactions } = useSelector(
    (state: RootState) => state.data
  );


  return (
     <View style={styles.mainContainer}>
        {transactions.length > 0 ? (
            <ScrollView>
                {transactions.map((transaction) => {
                    const categoryForCurrentItem = categories.find(
                        (category) => category.id === transaction.category_id
                    )
                    return (
                        <View key={transaction.id}>
                            <View style={styles.container}>  
                                <View style={styles.item}>
                                    <Text style={styles.title}>{transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}</Text>
                                    <Text style={styles.subTitle}>{categoryForCurrentItem?.name}</Text>
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
        ) : (
            <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="cash-remove" size={50} color="gray" />
            <Text style={styles.emptyText}>No Expense Data!</Text>
            <Text style={styles.emptySubText}>Please add your Expenses.</Text>
          </View>
        )}
    </View>
  )
}

