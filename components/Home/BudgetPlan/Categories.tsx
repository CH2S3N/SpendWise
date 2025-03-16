import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Button, Switch, FlatList, ScrollView, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '@/constants/colors';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setNeeds, setWants, setSavings, resetCat} from '@/state/budgetSlice';
import SubCatAll from './SubCatAll';
import { AntDesign } from '@expo/vector-icons';
import { TextStyle } from 'react-native';



interface DropdownProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({ selectedValue, onValueChange }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const options = [
    { label: "50/30/20 Rule", value: "50/30/20 Rule" },
    { label: "70/30 Rule", value: "70/30 Rule" },
    { label: "Custom", value: "Custom" },
  ];

  const handleSelect = (value: string) => {
    onValueChange(value);
    setIsDropdownVisible(false);
  };

  return (
    <View style={[{justifyContent: "flex-start", }]}>
      {/* Dropdown Box */}
      <TouchableOpacity 
        style={[styles.dropdown, {backgroundColor: colors.green, borderWidth:1}]} 
        onPress={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        <Text style={styles.selectedText}>{selectedValue ? (selectedValue) : (<Text style={{color: colors.gray,}}>Select a Stragtegy</Text>)}</Text>
        <AntDesign name={isDropdownVisible ? "up" : "down"} size={16} color="#333" />
      </TouchableOpacity>
      {/* Dropdown List */}
      {isDropdownVisible && (
        <View style={[styles.dropdownList, {backgroundColor: colors.ligthGreen, borderWidth:1}]}>
          {options.map((item) => (
            <TouchableOpacity key={item.value} style={styles.dropdownItem} onPress={() => handleSelect(item.value)}>
              <Text style={styles.itemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};


const Categories = ({
   isAdvanceBtnTapped,stratSplit, setIsAdvanceBtnTapped, setHasBudgetStrat, setStratSplit 
  }: { 
    isAdvanceBtnTapped: boolean, 
    setIsAdvanceBtnTapped: React.Dispatch<React.SetStateAction<boolean>>  ,
    setHasBudgetStrat: React.Dispatch<React.SetStateAction<boolean>>  ,
    stratSplit: boolean,
    setStratSplit: React.Dispatch<React.SetStateAction<boolean>>  
  }) => {
    const dispatch = useDispatch();
    const { needs, wants, savings, } = useSelector((state: RootState) => state.budget); 
    
    const [isEnabled, setIsEnabled] = useState(true);
    useEffect(() => {
      setIsEnabled(stratSplit);
    }, [stratSplit]);
        


    const [customStrat, setcustomStrat] = useState(false);
    const [strat, setstrat] = useState(false);
    const [strat1, setStrat1] = useState(false);
    const [strat2, setStrat2] = useState(false);
    

    
    // Function to handle slider change
    const handleCategorySliderChange = (sliderIndex: number, value: number) => {
      if (sliderIndex === 1) { // Needs slider
        const maxValue = needs + wants;
        const step = 5;
        const clampedValue = Math.min((Math.round(value / step) * step), maxValue);
        const newWants = maxValue - clampedValue;
    
        dispatch(setNeeds(clampedValue));
        dispatch(setWants(newWants));
      } else if (sliderIndex === 2) { // Wants slider
        const maxValue = needs + wants;
        const step = 5;
        const clampedValue = Math.min((Math.round(value / step) * step), maxValue);
        const newNeeds = maxValue - clampedValue;
    
        dispatch(setWants(clampedValue));
        dispatch(setNeeds(newNeeds));
      } else { // Savings slider
        const step = 10;
        const newSavings = Math.min((Math.round(value / step) * step), 100);
        const remainingBudget = 100 - newSavings;
    
        let newNeeds = 0;
        let newWants = 0;
    
        if (needs > 0 || wants > 0) {
          const total = needs + wants;
          newNeeds = Math.round((needs / total) * remainingBudget);
          newWants = remainingBudget - newNeeds;
        } else {
          newNeeds = Math.round(remainingBudget / 2);
          newWants = remainingBudget - newNeeds;
        }
    
        dispatch(setNeeds(newNeeds));
        dispatch(setWants(newWants));
        dispatch(setSavings(newSavings));
      }
    };
    
    


    const [selectedStrategy, setSelectedStrategy] = useState("Select a Strategy");

    const handleStrategyChange = (strategy: string) => {
      setSelectedStrategy(strategy);
      
      switch (strategy) {
        case "Select a Strategy":
          setstrat(true)
          setcustomStrat(false); 
          setStrat1(false);
          setStrat2(false);
          setStratSplit(true)
          break;
        case "50/30/20 Rule":
          setStrat1(true);
          setStrat2(false);
          setcustomStrat(false);
          dispatch(setNeeds(50));
          dispatch(setWants(30));
          dispatch(setSavings(20));
          setIsEnabled(true)
          setStratSplit(true)
          break;
        case "70/30 Rule":
          setStratSplit(false)
          setStrat2(true);
          setStrat1(false);
          setcustomStrat(false);
          dispatch(setNeeds(70));
          dispatch(setWants(0));
          dispatch(setSavings(30));
          break;
        case "Custom":
          setcustomStrat(true); 
          setStrat1(false);
          setStrat2(false);
          break;

      }
    };

    const handleReset = () => {
      if (isEnabled) {
        dispatch(setNeeds(50));
        dispatch(setWants(30));
        dispatch(setSavings(20));
      } else {
        dispatch(setNeeds(70));
        dispatch(setWants(0));
        dispatch(setSavings(30));
      }
    };

    useEffect(() => {
      setHasBudgetStrat(strat1 || strat2 || customStrat);
    }, [strat1, strat2, customStrat]);
    useEffect(() => {
      handleReset();
    }, [isEnabled])
  return (
      <View style={[styles.container]}>
        <Text style={[styles.title, {paddingBottom: 10}]}>BUDGETING STRATEGY</Text>
        <View style={[ { zIndex: 1, justifyContent: "center", }]}>
          <CustomDropdown 
            selectedValue={selectedStrategy} 
            onValueChange={handleStrategyChange} 
          />
        </View>
        {customStrat === true && (
              <>
              {/* Switch */}
              <View style={[styles.container, {flex: 1}]}>
                <View style={[styles.row, {justifyContent: "flex-end", alignItems: "center"}]}>
                        <Text style={styles.text}>Split Expense? </Text>
                        <Switch
                          trackColor={{false: colors.darkGreen, true: colors.light}}
                          thumbColor={isEnabled ? colors.green : colors.ligthGreen}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={(value) => {
                            setStratSplit(value);
                          }}
                          value={isEnabled}
                        />
                </View>
                {isEnabled === true ? (
                  <View style={{}}>
                    <View style={styles.row}>
                      <Text>Needs: {needs}%</Text>
                      {needs === 0 && (
                        <BlinkingText children={<Text style={styles.lowVal}>(value too low!)</Text>} condition={needs === 0}/>
                      )}
                    </View>
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
                    <View style={styles.row}>
                      <Text>Wants: {wants}% </Text>
                      {wants === 0 && 
                      <BlinkingText children={<Text style={styles.lowVal}>(value too low!)</Text>} condition={wants === 0}/>
                      }
                    </View>
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
    
                    <View style={styles.row}>
                      <Text>Wants: {savings}% </Text>
                      {savings === 0 && 
                      <BlinkingText children={<Text style={styles.lowVal}>(value too low!)</Text>} condition={savings === 0}/>
                      }
                    </View>
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
                  </View>
                ): (
                  <>
                    <View style={styles.row}>
                      <Text>Expenses: {needs}% </Text>
                      {needs === 0 && 
                        <BlinkingText children={<Text style={styles.lowVal}>(value too low!)</Text>} condition={needs === 0}/>
                        }
                    </View>
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
    
                    <View style={styles.row}>
                      <Text>Savings: {savings}% </Text>
                      {savings === 0 && 
                        <BlinkingText children={<Text style={styles.lowVal}>(value too low!)</Text>} condition={savings === 0}/>
                        }
                    </View>
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
                      <TouchableOpacity style={{alignItems: 'flex-end', }} onPressOut={()=>  handleReset()}><Text style={{color:colors.green}}>Reset</Text></TouchableOpacity>
                    </View>          
                  </>
                )}
              </View>
              </>
        )}
        <View style={{flex:2, justifyContent: "center", alignItems: "center"}}>
          { isAdvanceBtnTapped === true ? (
            <View  style={{flex: 1, justifyContent: "center",}}>
             {strat1 === false && strat2 === false && customStrat === false && (
              <Text style={[styles.description]}>
                Pick a <Text style={{ color: colors.green, fontWeight: "bold" }}>Budgeting Strategy</Text> to manage spending, control expenses, and grow savings effectively.
              </Text>
            )}
            {strat1 && (
              <Text style={[styles.description, { textAlign: "center" }]}>
                The <Text style={{ color: colors.green, fontWeight: "bold" }}>50/30/20 BUDGETING RULE</Text> is a simple money management strategy that divides your income into three categories:{"\n\n"}
                <Text style={{ color: colors.green, fontWeight: "bold" }}>50%</Text> Essentials (Basic Needs),{" "}
                <Text style={{ color: colors.green, fontWeight: "bold" }}>30%</Text> Non-Essentials (Wants & Optional Spending) &{" "}
                <Text style={{ color: colors.green, fontWeight: "bold" }}>20%</Text> Savings
              </Text>
            )}
            {strat2 && (
              <Text style={[styles.description]}>
                The <Text style={{ color: colors.green, fontWeight: "bold" }}>70/30 BUDGETING RULE</Text> splits income into{" "}
                <Text style={{ color: colors.green, fontWeight: "bold" }}>70%</Text> for expenses and lifestyle and{" "}
                <Text style={{ color: colors.green, fontWeight: "bold" }}>30%</Text> for savings, promoting financial stability while allowing flexibility.
              </Text>
            )}

            </View >
          ) : (
            <>
              {strat1 === false && strat2 === false && customStrat === false && (
                  <Text style={[styles.description, ]}>
                   Pick a  <Text style={{color: colors.green, fontWeight: "bold", }}>Budgeting Strategy</Text> to manage spending, control expenses, and grow savings effectively.
                  </Text>     
              )}
              {strat1 && (
                <Text style={[styles.description, { textAlign: "center" }]}>
                The <Text style={{ color: colors.green, fontWeight: "bold" }}>50/30/20 BUDGETING RULE</Text> is a simple money management strategy that divides your income into three categories:{"\n\n"}
                <Text style={{ color: colors.green, fontWeight: "bold" }}>50%</Text> Essentials (Basic Needs),{" "}
                <Text style={{ color: colors.green, fontWeight: "bold" }}>30%</Text> Non-Essentials (Wants & Optional Spending) &{" "}
                <Text style={{ color: colors.green, fontWeight: "bold" }}>20%</Text> Savings
                </Text>       
              )}
              {strat2 && (
                <Text style={[styles.description]}>
                The <Text style={{ color: colors.green, fontWeight: "bold" }}>70/30 BUDGETING RULE</Text> splits income into{" "}
                <Text style={{ color: colors.green, fontWeight: "bold" }}>70%</Text> for expenses and lifestyle and{" "}
                <Text style={{ color: colors.green, fontWeight: "bold" }}>30%</Text> for savings, promoting financial stability while allowing flexibility.
                </Text>
              )}
            </>
          )}
        </View>
        


           
        {/* Slider */}
        {isAdvanceBtnTapped === true  && (
            <>
             {customStrat || strat1 || strat2 ? (
                <View style={[styles.container, {flex: 5,}]}>
                  <Text style={styles.title}>Sub-Type</Text>
                  <SubCatAll/>
                </View>
             ): (
               null
             )}
              
            </>
        )}
      </View>


  )
}






export default Categories

interface BlinkingTextProps {
  condition: boolean;
  children: React.ReactNode;
  style?: TextStyle;
}

const BlinkingText: React.FC<BlinkingTextProps> = ({ condition, children, style }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animation = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (condition) {
      animation.current = Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      animation.current.start();
    } else {
      animation.current?.stop(); 
      fadeAnim.setValue(1); 
    }

    return () => {
      animation.current?.stop(); 
    };
  }, [condition, fadeAnim]);

  return <Animated.Text style={[style, { opacity: fadeAnim }]}>{children}</Animated.Text>;
};



const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  descon:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
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
  lowVal:{
    color: colors.red
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
    fontSize: 17,
    color: colors.dark,
    textAlign: 'center',
    textAlignVertical: "center"
  },
  title:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.dark,

  },
  row: {
    flexDirection: "row",
    marginBottom: 5
  },
  col: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    
    borderColor: colors.dark,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  selectedText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.light,
    textAlign: "center",
    textAlignVertical: "center"
  },
  dropdownList: {
    position: "absolute",
    top: 50, 
    left: 0,
    width: "100%",
    backgroundColor: colors.ligthGreen,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    zIndex: 1000,
    elevation: 5,
  },
  dropdownItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: colors.green,
    borderLeftWidth:1,
    borderRightWidth:1
  },
  itemText: {
    fontSize: 16,
    color: colors.green,
    textShadowColor: 'black', 
    textShadowOffset: { width: .5, height: .5 }, 
    textShadowRadius: .5,
  },
})