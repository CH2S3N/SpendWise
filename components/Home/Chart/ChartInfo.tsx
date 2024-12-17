import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import CircularChart from './CircularChart';
import BigText from '@/components/Texts/BigText';
import IncomeChart from './IncomeChart ';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Divider } from '@rneui/base';

export default function ChartInfo() {
  const [frequency, setFrequency] = React.useState<string>("Daily");
  return (
    <MainContainer>
     <View style={styles.header}>
      <Text style={styles.text}>Statistical Report</Text>
     </View>
       {/* FREQUENCY */}
          <SegmentedControl
            values={["Daily", "Weekly", "Monthly", "Yearly"]}
            style={{ marginBottom: 15 }}
            selectedIndex={["Daily", "Weekly", "Monthly", "Yearly"].indexOf(frequency)}
            onChange={(event) => {
              setFrequency(["Daily", "Weekly", "Monthly", "Yearly"][event.nativeEvent.selectedSegmentIndex]);
            }}
          />
     <BigText content='User Transactions'/>
    <Divider/>
     <View style={styles.content}>
      <CircularChart/>
     </View>
     <BigText content='Source of Income'/>
     <Divider/>
     <View style={styles.content}>
      <IncomeChart/>
     </View>
     <BigText content='Future Prediction'/>
     <Divider/>
     <View style={styles.content}>
     <Text>Content</Text>
     </View>
     <Divider/>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30
  }
})
