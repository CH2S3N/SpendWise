import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import GenerateService from '@/hooks/generateBudgetplan/Generate';
import { colors } from '@/constants/colors';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setNeeds, setWants, setSavings, resetCat} from '@/state/budgetSlice';
import { ScrollView } from 'react-native-gesture-handler';
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import { useFetchData } from '@/hooks/useFetchData';

const Categories = () => {
    const dispatch = useDispatch();
    const { needs, wants, savings} = useSelector((state: RootState) => state.budget); 
  
    // Function to handle slider change
    const handleCategorySliderChange = (sliderIndex: number, value: number) => {
      if (sliderIndex === 1) {
        const newSlider2 = 100 - value - savings;
        dispatch(setNeeds(value));  
        dispatch(setWants(newSlider2 >= 0 ? newSlider2 : 0));  
        dispatch(setSavings(newSlider2 >= 0 ? savings : 0));  
      } else if (sliderIndex === 2) {
        const newSlider1 = 100 - value - savings;
        dispatch(setWants(value));  
        dispatch(setNeeds(newSlider1 >= 0 ? newSlider1 : 0));  
        dispatch(setSavings(newSlider1 >= 0 ? savings : 0));  
      } else {
        const newSlider1 = 100 - value - wants;
        dispatch(setSavings(value));  
        dispatch(setNeeds(newSlider1 >= 0 ? newSlider1 : 0)); 
        dispatch(setWants(newSlider1 >= 0 ? wants : 0)); 
      }
    };
  return (
    <View style={{flex:1, paddingHorizontal: 10}}>
      <ScrollView>
        <Text>Needs: {needs}%</Text>
        <Slider
          value={needs}
          onValueChange={(value) => handleCategorySliderChange(1, value)}
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor= {colors.green}
          maximumTrackTintColor= {colors.green}
          thumbTintColor= {colors.green}
        />

        <Text>Wants: {wants}%</Text>
        <Slider
          value={wants}
          onValueChange={(value) => handleCategorySliderChange(2, value)}
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor= {colors.green}
          maximumTrackTintColor= {colors.green}
          thumbTintColor= {colors.green}
        />

        <Text>Savings: {savings}%</Text>
        <Slider
          value={savings}
          onValueChange={(value) => handleCategorySliderChange(3, value)}
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor= {colors.green}
          maximumTrackTintColor= {colors.green}
          thumbTintColor= {colors.green}
        />
      </ScrollView>
    <TouchableOpacity style={{alignItems: 'flex-end'}} onPressOut={()=>  dispatch(resetCat())}><Text>Reset</Text></TouchableOpacity>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({})