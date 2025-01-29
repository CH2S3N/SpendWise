import Card from "@/components/ui/Card";
import { Income, IncomeCategory } from "@/types";
import { Text, View, StyleSheet } from "react-native";

interface Props {
  income: Income;
  incomeCategoryInfo: IncomeCategory | undefined;
}

export default function IncomeDetails({ income, incomeCategoryInfo }: Props) {
  return (
    <Card
      content={
        <View style={styles.container}>
          <View style={styles.description}>
            <Text style={styles.text}>{income.description}</Text>
            <Text style={styles.text}>{incomeCategoryInfo?.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>{income.amount}</Text>
            <Text style={styles.text}>{income.frequency}</Text>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  description: {
    flex: 2,
    alignItems: 'flex-start',
  },
});
