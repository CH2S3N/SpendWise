import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainContainer from '@/components/Containers/MainContainer';
import GoalsInfo from '@/components/Home/Goal/GoalsDetails.tsx/GoalsInfo';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/constants/colors';


const Goal = () => {
  return (
    <MainContainer>
      <View style={styles.container}>
        <GoalsInfo/>
      </View>
   </MainContainer>
 )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginHorizontal: 15,
    
  },
})

export default Goal;

