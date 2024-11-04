import { View,  StyleSheet, SafeAreaView, Modal, Text, Button, TouchableOpacity } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import React, { useState } from 'react';
import Header from '../../components/Home/Header';
import CircularChart from '../../components/Home/Chart/CircularChart';
import ExpenseSummary from '../../components/Home/ExpnseSummary/ExpenseSummary';
import Goals from '../../components/Home/Goal/Goals';
import DailyBudget from '../../components/Home/DailyBudget/DailyBudget';
import AddTransaction from '../../components/ui/AddTransaction';
import { Category, Transaction } from '@/types';
import GoalsInfo from '@/components/Home/Goal/GoalsInfo';
import DailyBudgetInfo from '@/components/Home/DailyBudget/DailyBudgetInfo';
import SummaryInfo from '@/components/Home/ExpnseSummary/SummaryInfo';
import ChartInfo from '@/components/Home/Chart/ChartInfo';
import MainContainer from '@/components/Containers/MainContainer';
import InfoContainer from '@/components/Containers/InfoContainer';
import BigText from '@/components/Texts/BigText';


export default function Home() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const db = useSQLiteContext();

  const [isGoalModalVisible, setGoalModalVisible] = useState(false);
  const [isDailyBudgetModalVisible, setDailyBudgetModalVisible] = useState(false);
  const [isSummaryModalVisible, setSummaryModalVisible] = useState(false);
  const [isChartModalVisible, setChartModalVisible] = useState(false);


  async function getData() {
    const result = await db.getAllAsync<Transaction>('SELECT * FROM Transactions');
    setTransactions(result);
    const categoriesResult = await db.getAllAsync<Category>('SELECT * FROM Categories');
    setCategories(categoriesResult);
  }

  async function insertTransaction(transaction: Transaction) {
    db.withTransactionAsync(async () => {
      await db.runAsync(
        `
        INSERT INTO Transactions (category_id, description, frequency, priotization, isfixedamount, amount, type) VALUES(?, ?, ?, ?, ?, ?, ?)
        `,
        [
          transaction.category_id,
          transaction.description,
          transaction.frequency,
          transaction.prioritization,
          transaction.isfixedamount,
          transaction.amount,
          transaction.type,
        ]
      );
      await getData();
    })
  }

  return (
      <MainContainer>
          <Header/>
          <View style={styles.container}>
              <View style={styles.container1}>

                <InfoContainer
                  title={<BigText content="Goal"/>}
                  content={
                    <TouchableOpacity onPress={() => setGoalModalVisible(true)}>
                      <Goals/>
                    </TouchableOpacity>
                    }
                />

                  <InfoContainer
                  title={<BigText content="Daily Budget"/>}
                  content={
                    <TouchableOpacity onPress={() => setDailyBudgetModalVisible(true)}>
                      <DailyBudget />
                    </TouchableOpacity>
                }
                />


                
              </View>
              
              <InfoContainer
                  title={<BigText content="Expense Summary"/>}
                  content={
                    <TouchableOpacity onPress={() => setSummaryModalVisible(true)}>
                      <ExpenseSummary />
                    </TouchableOpacity>
                  }
                />
              
              <InfoContainer
                  title={<BigText content="Goal"/>}
                  content={
                    <TouchableOpacity onPress={() => setChartModalVisible(true)}>
                      <CircularChart />
                    </TouchableOpacity>
                   
                  }
                />
          </View >

        <View style={styles.btn}>
          <AddTransaction insertTransaction={insertTransaction} />
        </View>

    {/* PopUp Screen */}
    <Modal visible={isGoalModalVisible} >
      <View style={styles.container}>
        <GoalsInfo/>
        <Button 
          title='Back' 
          color= 'black'
          onPress={() => setGoalModalVisible(false)}
        />
      </View>
    </Modal>
    <Modal visible={isDailyBudgetModalVisible} >
      <View style={styles.container}>
        <DailyBudgetInfo/>
        <Button 
          title='Back' 
          color= 'black'
          onPress={() => setDailyBudgetModalVisible(false)}
        />
      </View>
    </Modal>
    <Modal visible={isSummaryModalVisible} >
      <View style={styles.container}>
        <SummaryInfo/>
        <Button 
          title='Back' 
          color='black'
          onPress={() => setSummaryModalVisible(false)}
        />
      </View>
    </Modal>
    <Modal visible={isChartModalVisible} >
      <View style={styles.container}>
        <ChartInfo/>
        <Button 
          title='Back' 
          color='black'
          onPress={() => setChartModalVisible(false)}
        />
      </View>
    </Modal>
      </MainContainer>


  )

}

const styles= StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    gap: 15,
    justifyContent: 'space-evenly',
  },
  container1: {
    columnGap: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15
  },
  item: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    padding: 10
  },
  btn: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: 1,
    left: 0,
    right: 0
  }
})