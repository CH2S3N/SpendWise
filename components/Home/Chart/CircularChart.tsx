import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart';
import { Category, Transaction } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';


export default function CircularChart({
    transactions,
    categories,
} : {
    categories: Category[];
    transactions: Transaction[];
    
}) {
    const widthAndHeight=150;
    const [values,setValues]= useState([1]);
    const [sliceColor,setSliceColor] = useState(['black']);
    const { loading, error } = useSelector(
      (state: RootState) => state.data
    );

  

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
  }
  function calcTotalNonEssentialExpense() {
    return nonEssentialTransactions.reduce((total, transaction) => {
      return total + (transaction.amount || 0);
    }, 0);
  }
 
  // need the greedy algorithm to calculate the savings
  const totalSavings = 525 
  
  const totalEssential = calcTotalEssentialExpense();
  const totalNonEssential = calcTotalNonEssentialExpense();
  
  useEffect(() => {
    if (totalEssential + totalNonEssential + totalSavings> 0) {
      setValues([totalEssential, totalNonEssential, totalSavings]);
      setSliceColor(['#FA812F', '#FA4032', '#FAB12F']);
    } else {
      setValues([1]);
      setSliceColor(['#CCCCCC']);
    }
    },[totalEssential, totalNonEssential])

    
  // If loading, show a loading text
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // If error occurs, display error message
  if (error) {
    return <Text>Error: {error}</Text>;
  }

  function calcTotal() {
    return transactions.reduce((total, transaction, totalSavings) => {
      return total + totalSavings + (transaction.amount || 0);
    }, 0);
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