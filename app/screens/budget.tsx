import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from '@rneui/base'
import MainContainer from '@/components/Containers/MainContainer';
import IncomeInfo from '@/components/Home/IncomeSummary/IncomeInfo';
import IncomeChart from '@/components/Home/Chart/IncomeChart ';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { colors } from '@/constants/colors';
import Card from '@/components/ui/Card';

const Budget = () => {
   return (
    <MainContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: "row",}}>
            <FontAwesome6 name="circle-user" size={30} color={colors.dark} />
            <Text style={{paddingLeft:10, fontSize:20, color: colors.dark}}>User</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center',}}>
            <FontAwesome6 name="gear" size={30} color={colors.dark} />
          </View>
        </View>
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
    header: {
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
   text: {
     fontWeight: 'bold',
     fontSize: 20,
     paddingBottom: 10,
     paddingHorizontal: 10
   },

  })
export default Budget

