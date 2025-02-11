import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from '@rneui/base'
import MainContainer from '@/components/Containers/MainContainer';
import IncomeInfo from '@/components/Home/IncomeSummary/IncomeInfo';
import IncomeChart from '@/components/Home/Chart/IncomeChart ';
import { colors } from '@/constants/colors';

const Budget = () => {
   return (
    <MainContainer>
      <View style={styles.container}>
        <IncomeChart/>
        <Text style={styles.text}>My Source of Income</Text>
        <IncomeInfo/>
     </View>
    </MainContainer>
   )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 15,
    },
   text: {
     fontWeight: 'bold',
     fontSize: 20,
     paddingBottom: 5
   },

  })
export default Budget

