import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { colors } from '@/constants/colors';
import styles from './styles';
import { Income } from '@/types';
import { calculateTotalIncome } from '@/utils/calcTotalIncome';



export default function IncomeChart () {
  const { incomes } = useSelector((state: RootState) => state.data);

  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState(['black']);
  
  // Filter Income Types
  const allowance = incomes.filter((income) => income.type === "Allowance");
  const salary = incomes.filter((income) => income.type === "Salary");
  const others = incomes.filter((income) => income.type === "Others");
  
  
  const totalAllowance = calculateTotalIncome(allowance, "Allowance");
  const totalSalary = calculateTotalIncome(salary, "Salary");
  const totalOthers = calculateTotalIncome(others, "Others");
  const total = totalAllowance + totalSalary + totalOthers;

  useEffect(() => {
    if (total > 0) {
      const newValues = [];
      const newColors = [];

      if (totalAllowance > 0) {
        newValues.push(totalAllowance);
        newColors.push('#059212');
      }
      if (totalSalary > 0) {
        newValues.push(totalSalary);
        newColors.push('#06D001');
      }
      if (totalOthers > 0) {
        newValues.push(totalOthers);
        newColors.push('#9BEC00');
      }

      setValues(newValues);
      setSliceColor(newColors);
    } else {
      setValues([1]);
      setSliceColor(['#CCCCCC']);
    }
  }, [totalAllowance, totalSalary, totalOthers]);

  return (
    <View style={styles.mainContainer}>
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
          {total === 0 && <Text style={styles.placeholderText}>No Income Data</Text>}
        </View>
        {/* Legends */}
        {total > 0 && (
          <View style={[styles.item1, { justifyContent: 'center', alignItems: 'center'}]}>
            <View style={styles.total}>
              {totalAllowance > 0 && (
                <View style={styles.legendItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#059212' }]} />
                  <Text>Allowance: ₱ {totalAllowance}</Text>
                </View>
              )}
              {totalSalary > 0 && (
                <View style={styles.legendItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#06D001' }]} />
                  <Text>Salary: ₱ {totalSalary}</Text>
                </View>
              )}
              {totalOthers > 0 && (
                <View style={styles.legendItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#9BEC00' }]} />
                  <Text>Others: ₱ {totalOthers}</Text>
                </View>
              )}
            </View>
            <View style={styles.total}>
              <Text style={styles.text}>Total: <Text style={{color: colors.green}}>₱ {total}</Text></Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}


