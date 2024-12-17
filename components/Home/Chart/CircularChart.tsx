import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart';
import { Category, Transaction, User } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { colors } from '@/constants/colors';


export default function CircularChart() {
  const { categories, transactions, user, goals, incomes, loading, error } = useSelector(
    (state: RootState) => state.data);
    const widthAndHeight=150;
    const [values,setValues]= useState([1]);
    const [sliceColor,setSliceColor] = useState(['black']);
    const userBudget = user.length > 0 ? user[0].budget_Amount : 0;

  
  const essentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
  );
  const nonEssentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential"
  );

  function calcTotalEssentialExpense() {
    return essentialTransactions.reduce((total, transaction) => {
      return total + (transaction.amount || 0);
    }, 0);
  };
  function calcTotalNonEssentialExpense() {
    return nonEssentialTransactions.reduce((total, transaction) => {
      return total + (transaction.amount || 0);
    }, 0);
  };
  function calcTotalGoal() {
    return goals.reduce((total, goals) => {
      return total + (goals.amount || 0);
    }, 0)
  };

  function calcTotalBudget() {
    return incomes.reduce((total, incomes) => {
      return total + calcTotalGoal() + (incomes.amount || 0);
    }, 0)
  };

  const totalBudget = calcTotalBudget()
  const totalEssential = calcTotalEssentialExpense();
  const totalNonEssential = calcTotalNonEssentialExpense();
  const totalSavings = totalBudget - (totalEssential + totalNonEssential)
  const totalGoals = calcTotalGoal()

  useEffect(() => {
    if (totalEssential + totalNonEssential + totalSavings + totalGoals > 0) {
      setValues([totalEssential, totalNonEssential, totalSavings, totalGoals]);
      setSliceColor(['#FA812F', '#FA4032', '#FAB12F', 'pink']);
    } else {
      setValues([1]);
      setSliceColor(['#CCCCCC']);
    }
  },[totalEssential, totalNonEssential])
  
  
  function calcTotal() {
    return totalEssential + totalNonEssential + totalSavings
  }
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
        </View>
        <View style={styles.item2}>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#FA812F' }]} />
            <Text>Essential: ₱{totalEssential}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#FA4032' }]} />
            <Text>Non-Essential: ₱{totalNonEssential}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#FAB12F' }]} />
            <Text>Savings: ₱{totalSavings}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: 'pink' }]} />
            <Text>Goals: ₱{totalGoals}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: colors.dark }]} />
            <Text>Funds: ₱{totalBudget}</Text>
          </View>
        </View>
      </View>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  item1: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  item2: {
    alignItems: 'flex-start',
        justifyContent: 'center'

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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  total:{
    position: 'absolute',
    left: "20%",
    bottom: "45%",
  

  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  }


})