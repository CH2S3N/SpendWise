import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setData } from "@/state/dataSlice"; 
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { UseTransactionService } from "@/hooks/editData/TransactionService";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "@/constants/colors";

export default function SubCatAll() {
  const { updateCategory } = UseTransactionService();
  const dispatch = useDispatch();
  const { categories, transactions, goals, user, incomes, varDataStates } = useSelector((state: RootState) => state.data);
  const [sliderValue, setSliderValue] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const initialSliderValues = categories.reduce((id, cat) => {
      id[cat.id] = cat.proportion;
      return id;
    }, {} as { [key: number]: number });
    
    setSliderValue(initialSliderValues); // Set initial slider values from Redux
  }, [categories]);

  const handleSliderChange = async (categoryId: number, value: number) => {
    const step = 5;
    const roundedValue = Math.round(value / step) * step;

    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return;

    const updatedCategories = categories.map((cat) =>
      cat.id === categoryId ? { ...cat, proportion: roundedValue } : cat
    );

    dispatch(setData({
      categories: updatedCategories, transactions, goals, user, incomes, varDataStates
    }));
    await updateCategory({ ...category, proportion: roundedValue });
  };

  const resetProportions = async () => {
    try {
      const updatedCategories = categories.map((cat) => {
        return { ...cat, proportion: cat.initialProp };
      });

      dispatch(setData({
        categories: updatedCategories, transactions, goals, user, incomes, varDataStates
      }));

      const initialSliderValues = updatedCategories.reduce((id, cat) => {
        id[cat.id] = cat.proportion;
        return id;
      }, {} as { [key: number]: number });

      setSliderValue(initialSliderValues);
      
      for (const category of updatedCategories) {
        await updateCategory(category);
      }
    } catch (error) {
      console.error("Error updating categories:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Sub-Type</Text>
      <ScrollView>
        {categories.map((category) => {
          const value = sliderValue[category.id] ?? category.proportion;
          return (
            <View key={category.id}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ paddingRight: 5 }}>{category.name}</Text>
                <Text style={{ paddingRight: 5 }}>{value.toFixed(0)}%</Text>
              </View>
              <Slider
                value={value}
                onValueChange={(val) => {
                  const step = 5;
                  const roundedVal = Math.round(val / step) * step;
                  setSliderValue((prev) => ({ ...prev, [category.id]: roundedVal }));
                }}
                onSlidingComplete={(val) => handleSliderChange(category.id, val)}
                minimumValue={0}
                maximumValue={100}
                step={5} // Ensures the slider moves in steps of 5
                minimumTrackTintColor={colors.green}
                maximumTrackTintColor={colors.green}
                thumbTintColor={colors.green}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={{ paddingTop: 10, alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => resetProportions()}>
          <Text style={{color:colors.green}}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.dark,

  },
});
