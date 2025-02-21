import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import Budget from '../Budget/totalIncome';
import { colors } from '@/constants/colors';

export default function ExpenseChart() {
  const { categories, transactions, goals } = useSelector(
    (state: RootState) => state.data);
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState(['#CCCCCC']);

  // Filter Expense Type
  const essentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
  );
  const nonEssentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential"
  );

  const calcTotal = (items: any[]) => items.reduce((total, item) => total + (item.amount || 0), 0);
  const calcTotalGoal = () => goals.reduce((total, goal) => total + (goal.currentAmount || 0), 0);

  const totalIncome = Budget();
  const totalEssential = calcTotal(essentialTransactions);
  const totalNonEssential = calcTotal(nonEssentialTransactions);
  const totalGoal = calcTotalGoal();
  const totalSavings = Math.max(0, totalIncome - (totalEssential + totalNonEssential));
  const totalExpenses = totalEssential + totalNonEssential + totalSavings;

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
        {totalExpenses > 0 && (
          <View style={styles.item2}>
            <View style={styles.legendItem}>
              <View style={[styles.colorBox, { backgroundColor: '#FC2947' }]} />
              <Text>Needs: ₱{totalEssential}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.colorBox, { backgroundColor: '#FE6244' }]} />
              <Text>Wants: ₱{totalNonEssential}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.colorBox, { backgroundColor: '#FFD65A' }]} />
              <Text>Savings: ₱{totalSavings}</Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.text}>Total: <Text style={{ color: colors.red }}>{totalExpenses}</Text></Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 15,
  },
  item1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item2: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  colorBox: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderRadius: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.dark,
  },
  total: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.dark,
    opacity: 0.5,
  },
});
