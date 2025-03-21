import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { colors } from '@/constants/colors';
import styles from './styles';
import { calculateTotalIncome } from '@/utils/calcTotalIncome';



export default function IncomeChart () {
  const { incomes } = useSelector((state: RootState) => state.data);
  const { width } = useWindowDimensions();
  const widthAndHeight = width * 0.3;
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

  const allowanceRatio = total > 0 ? ((totalAllowance / total) * 100).toFixed(0) : "0";
  const salaryRatio = total > 0 ? ((totalSalary / total) * 100).toFixed(0) : "0";
  const othersRatio = total > 0 ? ((totalOthers / total) * 100).toFixed(0) : "0";

  useEffect(() => {
    if (total > 0) {
      const newValues = [];
      const newColors = [];

      if (totalAllowance > 0) {
        newValues.push(totalAllowance);
        newColors.push('#5F939A');
      }
      if (totalSalary > 0) {
        newValues.push(totalSalary);
        newColors.push('#54C392');
      }
      if (totalOthers > 0) {
        newValues.push(totalOthers);
        newColors.push('#73EC8B');
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
        <View style={styles.item}>
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
          <View style={[styles.item, { justifyContent: 'center', alignItems: 'center'}]}>
            <View style={styles.legend}>
              {totalAllowance > 0 && (
                <View style={styles.legendItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#5F939A' }]} />
                  <Text numberOfLines={1} ellipsizeMode="tail">Allowance: ₱ {totalAllowance} <Text style={{color: '#5F939A'}}>({allowanceRatio}%)</Text></Text>
                </View>
              )}
              {totalSalary > 0 && (
                <View style={styles.legendItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#54C392' }]} />
                  <Text numberOfLines={1} ellipsizeMode="tail">Salary: ₱ {totalSalary} <Text style={{color: '#54C392'}}>({salaryRatio}%)</Text></Text>
                </View>
              )}
              {totalOthers > 0 && (
                <View style={styles.legendItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#73EC8B' }]} />
                  <Text numberOfLines={1} ellipsizeMode="tail">Others: ₱ {totalOthers} <Text style={{color: '#73EC8B'}}>({othersRatio}%)</Text></Text>
                </View>
              )}
            </View>
            <View style={styles.total}>
              <Text style={[styles.totalTxt, {color: colors.green}]}>Total: <Text style={{}}>₱ {total}</Text></Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}


