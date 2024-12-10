import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart';
import { Category, Transaction, User, IncomeCategory } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';


export default function IncomeChart () {
  const { categories, transactions, user, goals, incomes, loading, error } = useSelector(
    (state: RootState) => state.data);
    const widthAndHeight=150;
    const [values,setValues]= useState([1]);
    const [sliceColor,setSliceColor] = useState(['black']);
    const userBudget = user.length > 0 ? user[0].budget_Amount : 0;


    const allowance = incomes.filter(
      (income) => incomes.find((incomeCategory) => incomeCategory.id === income.incomeCategory_id)?.description ==="allowance"
    );  

  function calcTotalAllowance() {
    return allowance.reduce((total, income) => {
      return total + (income.amount || 0);
    }, 0)
  };
 

  const totalBudget = 300
  const totalAllowance = calcTotalAllowance();
  const totalSalary = 200
  const totalSavings = 100


  useEffect(() => {
    if (totalAllowance + totalSalary + totalSavings > 0) {
      setValues([totalAllowance, totalSalary, totalSavings]);
      setSliceColor(['#FA812F', '#FA4032', '#FAB12F']);
    } else {
      setValues([1]);
      setSliceColor(['#CCCCCC']);
    }
  },[totalAllowance, totalSalary])
  
  
  function calcTotal() {
    return totalAllowance + totalSalary + totalSavings
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
            <Text>Allowance: ₱{totalAllowance}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#FA4032' }]} />
            <Text>Salary: ₱{totalSalary}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#FAB12F' }]} />
            <Text>Others: ₱{totalSavings}</Text>
          </View>
        </View>
      </View>
      <View style={styles.total}>
          <Text style={styles.text}>Total ₱{calcTotal()}</Text>
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
    left: "17%",
    bottom: "45%",
  },
  text: {
    fontWeight: 'bold'
  }


})