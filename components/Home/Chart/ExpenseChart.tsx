import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import Budget from '../Budget/totalIncome';
import { colors } from '@/constants/colors';
import styles from './styles';
import { calculateTotalExpense } from '@/utils/calcTotalExpense';

export default function ExpenseChart() {
  const { categories, transactions, goals } = useSelector(
    (state: RootState) => state.data);
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState(['#CCCCCC']);

  const calcTotalGoal = () => goals.reduce((total, goal) => total + (goal.currentAmount || 0), 0);

  const totalIncome = Budget();
  const totalEssential = calculateTotalExpense(transactions, categories, "Essential",);
  const totalNonEssential = calculateTotalExpense(transactions, categories, "Non_Essential");
  const totalGoal = calcTotalGoal();
  const totalSavings = Math.max(0, totalIncome - (totalEssential + totalNonEssential));
  const totalExpenses = totalEssential + totalNonEssential;

  useEffect(() => {
    if (totalExpenses > 0) {
      setValues([totalEssential, totalNonEssential, totalSavings]);
      setSliceColor(['#FC2947', '#FE6244', '#FFD65A']);
    } else {
      setValues([1]);
      setSliceColor(['#CCCCCC']);
    }
  }, [totalEssential, totalNonEssential, totalSavings]);

  return (
    <View>
      <View style={styles.container}>
        {/* Chart */}
        <View style={styles.item1}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={values}
            sliceColor={sliceColor}
            coverRadius={0.60}
            coverFill={'#FFFFFF'}
          />
          {totalExpenses === 0 && <Text style={styles.placeholderText}>No Expense Data</Text>}
        </View>
        {/* Legends */}
        {totalExpenses > 0 && (
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.total}> 
              {totalEssential > 0 && (
                <View style={styles.legendItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#FC2947' }]} />
                  <Text>Needs: ₱ {totalEssential}</Text>
                </View>
              )}
              {totalNonEssential > 0 && (
                <View style={styles.legendItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#FE6244' }]} />
                  <Text>Wants: ₱ {totalNonEssential}</Text>
                </View>
              )}
              {totalSavings > 0 && (
                <View style={styles.legendItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#FFD65A' }]} />
                  <Text>Savings: ₱ {totalSavings}</Text>
                </View>
              )}


            </View>
            <View style={styles.total}>
              <Text style={[styles.text, { color: colors.red }]}>Total: <Text style={{}}>₱ {totalExpenses}</Text></Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}


