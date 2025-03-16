import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GoalsInfo from '@/components/Home/Goal/GoalsDetails.tsx/GoalsInfo';
import { colors } from '@/constants/colors';
import Animated, { BounceIn, BounceOut, FadeIn, FadeOut, SlideInLeft, SlideInRight, SlideInUp, SlideOutDown, SlideOutLeft, SlideOutRight } from 'react-native-reanimated';

const Goal = () => {
  return (
    <Animated.View 
      // entering={SlideInUp.duration(300)}
      // exiting={SlideOutDown.duration(300)}
      style={styles.container}
    >
        <GoalsInfo/>
   </Animated.View>
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

