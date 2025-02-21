import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { calculateTotalIncome } from '@/utils/calcTotalIncome';
import { colors } from '@/constants/colors';

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
                  <Text>Allowance: ₱{totalAllowance}</Text>
                </View>
              )}
              {totalSalary > 0 && (
                <View style={styles.legendItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#06D001' }]} />
                  <Text>Salary: ₱{totalSalary}</Text>
                </View>
              )}
              {totalOthers > 0 && (
                <View style={styles.legendItem}>
                  <View style={[styles.colorBox, { backgroundColor: '#9BEC00' }]} />
                  <Text>Others: ₱{totalOthers}</Text>
                </View>
              )}
            </View>
            <View style={styles.total}>
              <Text style={styles.text}>Total: <Text style={{color: colors.green}}>{total}</Text></Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 15,
  },
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
