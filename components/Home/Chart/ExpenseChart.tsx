import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { colors } from '@/constants/colors';
import styles from './styles';
import { Income, Transaction } from '@/types';

export default function ExpenseChart() {
  const { categories, transactions, goals, incomes, budgetStratSplit } = useSelector(
    (state: RootState) => state.data);
  const { width } = useWindowDimensions();
  const widthAndHeight = width * 0.3;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState(['#CCCCCC']);

  const calcTotalGoal = () => goals.reduce((total, goal) => total + (goal.currentAmount || 0), 0);


    const totalIncome =  incomes.reduce((total: number, income: Income) => {
        return total + (income.amount * income.interval || 0 )
    }, 0);

    const essentialTransactions = transactions.filter(
        (transaction) => transaction.type === "Essential"
    );
    
    const nonEssentialTransactions = transactions.filter(
        (transaction) => transaction.type === "Non_Essential"
    );
    const totalEssential =  essentialTransactions.reduce((total: number, transaction: Transaction) => {
        return total + (transaction.amount * transaction.interval || 0)
    }, 0);
    const totalNonEssential =  nonEssentialTransactions.reduce((total: number, transaction: Transaction) => {
        return total + (transaction.amount * transaction.interval || 0)
    }, 0);


  const totalGoal = calcTotalGoal();
  const totalSavings = Math.max(0, totalIncome - (totalEssential + totalNonEssential));
  const totalExpenses = totalEssential + totalNonEssential;

  const needsRatio = totalIncome > 0 ? ((totalEssential / totalIncome) * 100).toFixed(0) : "0";
  const wantsRatio = totalIncome > 0 ? ((totalNonEssential / totalIncome) * 100).toFixed(0) : "0";
  const expenseRatio = totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(0) : "0";
  const savingsRatio = totalIncome > 0 ? ((totalSavings / totalIncome) * 100).toFixed(0) : "0";
  
  useEffect(() => {
    if (totalExpenses > 0 && budgetStratSplit === true) {
      setValues([totalEssential, totalNonEssential, totalSavings]);
      setSliceColor(['#FC2947', '#FE6244', '#FFD65A']);
    } else if (totalExpenses > 0 && budgetStratSplit === false) { // Fix here
      setValues([totalExpenses, totalSavings]);
      setSliceColor(['#FC2947', '#FFD65A']);
    } else {
      setValues([1]);
      setSliceColor(['#CCCCCC']);
    }
  }, [totalEssential, totalNonEssential, totalSavings, budgetStratSplit]);
  
  return (
    <View>
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
          {totalExpenses === 0 && <Text style={styles.placeholderText}>No Expense Data</Text>}
        </View>
        {/* Legends */}
        {budgetStratSplit === true ? (
          <>
            {totalExpenses > 0 && (
              <View style={[styles.item,{ justifyContent: 'center', alignItems: 'center'}]}>
                <View style={styles.legend}> 
                  {totalEssential > 0 && (
                    <View style={styles.legendItem}>
                      <View style={[styles.colorBox, { backgroundColor: '#FC2947' }]} />
                      <Text numberOfLines={1} ellipsizeMode="tail">Needs: ₱ {(totalEssential).toLocaleString()} <Text style={{color: '#FC2947'}}>({needsRatio}%)</Text></Text>
                    </View>
                  )}
                  {totalNonEssential > 0 && (
                    <View style={styles.legendItem}>
                      <View style={[styles.colorBox, { backgroundColor: '#FE6244' }]} />
                      <Text numberOfLines={1} ellipsizeMode="tail">Wants: ₱ {(totalNonEssential).toLocaleString()} <Text style={{color: '#FE6244'}}>({wantsRatio}%)</Text></Text>
                    </View>
                  )}
                  {totalSavings > 0 && (
                    <View style={styles.legendItem}>
                      <View style={[styles.colorBox, { backgroundColor: '#FFD65A' }]} />
                      <Text numberOfLines={1} ellipsizeMode="tail">Savings: ₱ {(totalSavings).toLocaleString()} <Text style={{color: '#FFD65A'}}>({savingsRatio}%)</Text></Text>
                    </View>
                  )}


                </View>
                <View style={styles.total}>
                  <Text style={[styles.totalTxt, { color: colors.red }]}>Total: <Text style={{}}>₱ {(totalExpenses).toLocaleString()}</Text></Text>
                </View>
              </View>
            )}
          </>
        ) : (
          <>
          {totalExpenses > 0 && (
            <View style={[styles.item,{ justifyContent: 'center', alignItems: 'center'}]}>
              <View style={styles.legend}> 
                {totalEssential > 0 && (
                  <View style={styles.legendItem}>
                    <View style={[styles.colorBox, { backgroundColor: '#FC2947' }]} />
                    <Text numberOfLines={1} ellipsizeMode="tail">Expense: ₱ {totalExpenses} <Text style={{color: '#FC2947'}}>({expenseRatio}%)</Text></Text>
                  </View>
                )}
                {totalSavings > 0 && (
                  <View style={styles.legendItem}>
                    <View style={[styles.colorBox, { backgroundColor: '#FFD65A' }]} />
                    <Text numberOfLines={1} ellipsizeMode="tail">Savings: ₱ {totalSavings} <Text style={{color: '#FFD65A'}}>({savingsRatio}%)</Text></Text>
                  </View>
                )}


              </View>
              <View style={styles.total}>
                <Text style={[styles.totalTxt, { color: colors.red }]}>Total: <Text style={{}}>₱ {totalExpenses}</Text></Text>
              </View>
            </View>
          )}
          </>
        )}
      </View>
    </View>
  );
}


