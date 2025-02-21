import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setData } from "@/state/dataSlice"; 
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { UseTransactionService } from "@/hooks/editData/TransactionService";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "@/constants/colors";



export default function SubCatWants() {
  const { updateCategory } = UseTransactionService();
  const dispatch = useDispatch();
  const { categories, transactions, incomeCategories, goals, user, incomes, recurrence } = useSelector((state: RootState) => state.data);
  const nonEssentialSubCat = categories.filter((category) => category.type === "Non_Essential");
  const [sliderValue, setSliderValue] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const initialSliderValues = categories.reduce((id, cat) => {
      id[cat.id] = cat.proportion;
      return id;
    }, {} as { [key: number]: number });
    
    setSliderValue(initialSliderValues); // Set the initial slider values from Redux
  }, [categories]);

  const handleSliderChange = async (categoryId: number, value: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return;
    const updatedCategories = categories.map((cat) =>
      cat.id === categoryId ? { ...cat, proportion: value } : cat
    );
    dispatch(setData({ categories: updatedCategories, transactions, incomeCategories, goals, user, incomes, recurrence }));
    await updateCategory({ ...category, proportion: value });
  };

  const resetProportions = async () => {
    try {
      const updatedCategories = nonEssentialSubCat.map((cat) => {
        return { ...cat, proportion: cat.initialProp };
      });

      dispatch(setData({ categories: updatedCategories, transactions, incomeCategories, goals, user, incomes, recurrence }));

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
    <View style={{flex:1, paddingHorizontal: 10}}>
      
      <ScrollView>
      {nonEssentialSubCat.map((category) => {
        const value = sliderValue[category.id] ?? category.proportion; // Use slider value if available
        return (
          <View key={category.id}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ paddingRight: 5 }}>{category.name}</Text>
              <Text style={{ paddingRight: 5 }}>{value.toFixed(0)}%</Text>
            </View>
            <Slider
              value={value}
              onValueChange={(val) => setSliderValue((prev) => ({ ...prev, [category.id]: val }))}
              onSlidingComplete={(val) => handleSliderChange(category.id, val)}
              minimumValue={0}
              maximumValue={100}
              step={1}
              minimumTrackTintColor= {colors.green}
              maximumTrackTintColor= {colors.green}
              thumbTintColor= {colors.green}
            />
          </View>
        );
      })}
      </ScrollView>
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity  onPress={() => resetProportions()}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View >
    </View>
  );
}

const styles = StyleSheet.create({});
