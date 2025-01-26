import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { calculateTotalIncome } from '@/utils/calcTotalIncome';



export default function IncomeChart () {
  const { incomes } = useSelector(
    (state: RootState) => state.data);

    const widthAndHeight=150;
    const [values,setValues]= useState([1]);
    const [sliceColor,setSliceColor] = useState(['black']);

    // Filtter Income Types
    const allowance = incomes.filter((income) => income.type === "Allowance");
    const salary = incomes.filter((income) => income.type === "Salary");
    const others = incomes.filter((income) => income.type === "Others");
    
    
    const totalAllowance = calculateTotalIncome(allowance, "Allowance")
    const totalSalary = calculateTotalIncome(salary, "Salary")
    const totalOthers = calculateTotalIncome(others, "Others")
 

    useEffect(() => {
      if (totalAllowance + totalSalary + totalOthers > 0) {
        setValues([totalAllowance, totalSalary, totalOthers]);
        setSliceColor(['#059212', '#06D001', '#9BEC00']);
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
            <View style={[styles.colorBox, { backgroundColor: '#059212' }]} />
            <Text>Allowance: ₱{totalAllowance}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#06D001' }]} />
            <Text>Salary: ₱{totalSalary}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#9BEC00' }]} />
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