import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/Colors';
import PieChart from 'react-native-pie-chart';


export default function CircularChart() {
    const widthAndHeight=150;
    const [values,setValues]= useState([1]);
    const [sliceColor,setSliceColor] = useState([Colors.PRIMARY]);
  return (
    <View>
      <View style={styles.container}>
          <Text style ={styles.text}>Circular Chart</Text>
          <PieChart
                  widthAndHeight={widthAndHeight}
                  series={values}
                  sliceColor={sliceColor}
                  coverRadius={0.45}
                  coverFill={'#FFF4EA'}
              />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor:Colors.DWHITE,
        padding:20,
        borderRadius: 15,
        elevation: 1
    },
    text: {
     marginLeft: 10,
     marginBottom: 10
    }

})