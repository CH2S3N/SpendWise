import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '@/constants/colors';
import GoalsInfo from '@/components/Home/Goal/GoalsInfo';
import MainContainer from '@/components/Containers/MainContainer';

const Goal = () => {
  return (
    <MainContainer 

    >
        <GoalsInfo/>
   </MainContainer>
 )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
  },
})

export default Goal;

