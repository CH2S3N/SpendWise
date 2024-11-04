import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart';



export default function CircularChart() {
    const widthAndHeight=150;
    const [values,setValues]= useState([1]);
    const [sliceColor,setSliceColor] = useState(['black']);
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.item1}>
          <Text>Circular Chart</Text>
          <PieChart
                  widthAndHeight={widthAndHeight}
                  series={values}
                  sliceColor={sliceColor}
                  coverRadius={0.45}
                  coverFill={'#FFFFFF'}
              />

        </View>
        <View style={styles.item2}>
          <Text>Legend</Text>
          <Text>Lorem ipsum</Text>
          <Text>"Lorem ipsum</Text>
          <Text>"Lorem ipsum</Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  item1: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  item2: {
    justifyContent: 'center',
    alignItems: 'center',

  },


})