import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Button, Switch } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/constants/colors';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setNeeds, setWants, setSavings, resetCat} from '@/state/budgetSlice';
import SubCatNeeds from './SubCatNeeds';
import SubCatWants from './SubCatWants';
import SubCatAll from './SubCatAll';

const Categories = ({ isAdvanceBtnTapped, setIsAdvanceBtnTapped }: { isAdvanceBtnTapped: boolean, setIsAdvanceBtnTapped: React.Dispatch<React.SetStateAction<boolean>>  }) => {
    const dispatch = useDispatch();
    const { needs, wants, savings} = useSelector((state: RootState) => state.budget); 
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    const [strat1, setStrat1] = useState(true);
    const [strat2, setStrat2] = useState(false);
    const [customStrat, setcustomStrat] = useState(false);
    
    // Function to handle slider change
    const handleCategorySliderChange = (sliderIndex: number, value: number) => {
      if (sliderIndex === 1) { // Needs slider
        const maxValue = needs + wants; // Max user can allocate to Needs
        const clampedValue = Math.min(Math.max(value, 0), maxValue);
        const newWants = maxValue - clampedValue;
    
        dispatch(setNeeds(clampedValue));
        dispatch(setWants(newWants));
      } else if (sliderIndex === 2) { // Wants slider
        const maxValue = needs + wants; // Max user can allocate to Wants
        const clampedValue = Math.min(Math.max(value, 0), maxValue);
        const newNeeds = maxValue - clampedValue;
    
        dispatch(setWants(clampedValue));
        dispatch(setNeeds(newNeeds));
      } else { // Savings slider
        const newSavings = Math.min(Math.max(value, 0), 100); // Clamp between 0-100
        const remainingBudget = 100 - newSavings;
    
        if (needs + wants > 0) {
          const needsRatio = needs / (needs + wants);
          const wantsRatio = wants / (needs + wants);
          
          const newNeeds = Math.round(needsRatio * remainingBudget);
          const newWants = remainingBudget - newNeeds; 
    
          dispatch(setNeeds(newNeeds));
          dispatch(setWants(newWants));
        } else {
          dispatch(setNeeds(Math.round(remainingBudget / 2)));
          dispatch(setWants(Math.round(remainingBudget / 2)));
        }
    
        dispatch(setSavings(newSavings));
      }
    };
    


    
  return (
      <View style={[styles.container]}>
        <Text style={styles.title}>BUDGETING STRATEGY</Text>
        <View style={styles.row}>
          <TouchableOpacity activeOpacity={.8} style={[styles.btn, strat1 && styles.selectedBtn]} onPress={()=> {
            setStrat1(true);
            setStrat2(false);
            setcustomStrat(false);
            dispatch(setNeeds(50));
            dispatch(setWants(30));
            dispatch(setSavings(20));
            setIsEnabled(true)
            }}>
            <Text style={styles.txt}>50/30/20 Rule</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity activeOpacity={.8} style={[styles.btn, strat2 && styles.selectedBtn]} onPress={()=> {
            setStrat2(true);
            setStrat1(false);
            setcustomStrat(false);
            dispatch(setNeeds(70));
            dispatch(setWants(0));
            dispatch(setSavings(30));
          }}>
            <Text style={styles.txt}>70/30 Rule </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity activeOpacity={.8} style={[styles.btn, customStrat && styles.selectedBtn]} onPress={()=> {
            setcustomStrat(true); 
            setStrat1(false);
            setStrat2(false);
          }}>
            <Text style={styles.txt}>Custom</Text>
          </TouchableOpacity>
        </View>
        {customStrat === true && (
              <>
                <View style={[styles.row, {justifyContent: "flex-end", alignItems: "center"}]}>
                        <Text style={styles.text}>Split Expense? </Text>
                        <Switch
                          trackColor={{false: '#767577', true: '#15B392'}}
                          thumbColor={isEnabled ? '#00FF9C' : '#f4f3f4'}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={toggleSwitch}
                          value={isEnabled}
                        />
                </View>
                {isEnabled === true ? (
                  <>
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
                      minimumValue={0}
                      onValueChange={(value) => handleCategorySliderChange(2, value)}
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
                    <View style={{ paddingTop: 10, alignItems: "flex-end"}}>
                      <TouchableOpacity style={{alignItems: 'flex-end'}} onPressOut={()=>  dispatch(resetCat())}><Text>Reset</Text></TouchableOpacity>
                    </View>
                  </>
                ): (
                  <>
                    <Text>Expenses: {needs}%</Text>
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
                    <View style={{ paddingTop: 10, alignItems: "flex-end"}}>
                      <TouchableOpacity style={{alignItems: 'flex-end'}} onPressOut={()=>  dispatch(resetCat())}><Text>Reset</Text></TouchableOpacity>
                    </View>          
                  </>
                )}
              </>
        )}
        {strat1 && (
          <View style={styles.descon}>
            <Text style={styles.description}>
              {"\t"} The <Text style={{color: colors.green, fontWeight: "bold"}}>50/30/20 BUDGETING RULE</Text> is a simple money management strategy that divides your income into three categories:{"\n"}
              🔹 50% Essentials (Basic Needs){"\n"}
              🔹 30% Non-Essentials (Wants & Optional Spending){"\n"}
              🔹 20% Savings{"\n\n"}
            </Text>
          </View>
        )}
        {strat2 && (
          <View style={styles.descon}>
            <Text style={styles.description}>
             {"\t"} The <Text style={{color: colors.green, fontWeight: "bold"}}>70/30 BUDGETING RULE</Text> splits income into 70% for expenses and lifestyle and 30% for savings, promoting financial stability while allowing flexibility.
            </Text>
          </View>
        )}

           
        {/* Slider */}
        {isAdvanceBtnTapped === true && (
            <>
              {strat2 === true || isEnabled === false ? (
                <View style={[styles.container, {flex: 2}]}>
                  <Text style={styles.title}>Sub-Category (Expenses)</Text>
                  <SubCatAll/>
                </View>
              ) : (
                <>
                <View style={[styles.container, {flex: 2}]}>
                  <View style={[styles.container, {flex: 0.6}]}>
                    <Text style={styles.title}>Sub-Category (Needs)</Text>
                    <SubCatNeeds/>
                  </View>
                  <View style={[styles.container, {flex: 0.6}]}>
                    <Text style={styles.title}>Sub-Category (Wants)</Text>
                    <SubCatWants/>
                  </View>
                </View>
                
                </>
              )}
            </>
        )}
      </View>


  )
}

export default Categories

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  descon:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5
  },
  btn:{
    flex: 1,
    backgroundColor: colors.dark,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  selectedBtn:{
    backgroundColor: colors.green,
    paddingVertical: 10,
    marginHorizontal: 0,

  },
  txt:{
    fontSize: 18,
    color: colors.light,
    textAlign: 'center'
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description:{
    fontSize: 15,
    color: colors.dark,
    textAlign: 'left',
    textAlignVertical: "center"
  },
  title:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5
  },
  col: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})