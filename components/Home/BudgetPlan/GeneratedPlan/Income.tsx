import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import styles from './styles';
import { Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function InitialIncome() {
  const { incomes } = useSelector((state: RootState) => state.data);

  return (
    <View style={styles.mainContainer}>
      {incomes.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {incomes.map((income) => (
            <View key={income.id} >
              <View style={styles.container}>
                <View style={styles.item}>
                  <Text style={styles.title}>
                    {income.description.charAt(0).toUpperCase() + income.description.slice(1)}
                  </Text>
                  <Text style={styles.subTitle}>{income.type}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.text}>{income.frequency}</Text>
                </View>
              </View>
              <Divider style={styles.dvd} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="cash-remove" size={50} color="gray" />
          <Text style={styles.emptyText}>No Income Data!</Text>
          <Text style={styles.emptySubText}>Please add your income sources.</Text>
        </View>
      )}
    </View>
  );
}

