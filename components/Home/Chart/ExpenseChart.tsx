import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { calculateTotalExpense } from '@/utils/calcTotalExpense';




export default function ExpenseChart() {
  const { categories, transactions, incomes, goals } = useSelector(
    (state: RootState) => state.data);
    const widthAndHeight=150;
    const [values,setValues]= useState([1]);
    const [sliceColor,setSliceColor] = useState(['black']);

  // Filter Expense Type
  const essentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Essential"
  );
  const nonEssentialTransactions = transactions.filter(
    (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential"
  );
  

  function calcTotalGoal() {
    return goals.reduce((total, goals) => {
      return total + (goals.currentAmount || 0);
    }, 0)

  };


  const totalGoal = calcTotalGoal()
  const totalEssential = calculateTotalExpense(essentialTransactions, categories, "Essential");
  const totalNonEssential = calculateTotalExpense(nonEssentialTransactions, categories, "Non_Essential");
  


  useEffect(() => {
    if (totalEssential + totalNonEssential + totalGoal  > 0) {
      setValues([totalEssential, totalNonEssential, totalGoal ]);
      setSliceColor(['#FC2947', '#FE6244', '#FFDEB9']);
    } else {
      setValues([1]);
      setSliceColor(['#CCCCCC']);
    }
  },[totalEssential, totalNonEssential, totalGoal])
  
  

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
            <View style={[styles.colorBox, { backgroundColor: '#FC2947' }]} />
            <Text>Needs: ₱{totalEssential}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#FE6244' }]} />
            <Text>Wants: ₱{totalNonEssential}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#FFDEB9' }]} />
            <Text>Goals: ₱{totalGoal}</Text>
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