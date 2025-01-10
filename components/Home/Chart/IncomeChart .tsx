import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { calculateTotal } from '@/utils/calcTotal';
import { calculateTotalIncome } from '@/utils/calcTotalIncome';



export default function IncomeChart () {
  const { incomeCategories,  incomes } = useSelector(
    (state: RootState) => state.data);
    const widthAndHeight=150;
    const [values,setValues]= useState([1]);
    const [sliceColor,setSliceColor] = useState(['black']);


    // Filtter Income Types
    const allowance = incomes.filter(
      (income) =>
        incomeCategories.find((incomeCategory) => incomeCategory.id === income.incomeCategory_id)
          ?.name === 'allowance'
    );
    const salary = incomes.filter(
      (income) =>
        incomeCategories.find((incomeCategory) => incomeCategory.id === income.incomeCategory_id)
          ?.name === 'salary'
    );
    const others = incomes.filter(
      (income) =>
        incomeCategories.find((incomeCategory) => incomeCategory.id === income.incomeCategory_id)
          ?.name === 'others'
    );
  

    
  
    const totalAllowance = calculateTotalIncome(allowance, incomeCategories, "Allowance")
    const totalSalary = calculateTotalIncome(salary, incomeCategories, "Salary")
    const totalOthers = calculateTotalIncome(others, incomeCategories, "Others")
 

    useEffect(() => {
      if (totalAllowance + totalSalary + totalOthers > 0) {
        setValues([totalAllowance, totalSalary, totalOthers]);
        setSliceColor(['#FA812F', '#FA4032', '#FAB12F']);
      } else {
        setValues([1]);
        setSliceColor(['#CCCCCC']);
      }
    }, [totalAllowance, totalSalary, totalOthers]);
  

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
            <Text>Others: ₱{totalOthers}</Text>
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
    left: "25%",
    bottom: "45%",
  },
  text: {
    fontWeight: 'bold'
  }


})