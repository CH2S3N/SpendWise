import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GoalsInfo from '@/components/Home/Goal/GoalsDetails.tsx/GoalsInfo';
import { colors } from '@/constants/colors';

const Goal = () => {
  return (
    <View style={styles.container}>
        <GoalsInfo/>
   </View>
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

