import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { Divider } from '@rneui/base';
import BigText from '@/components/Texts/BigText';

export default function DailyBudgetInfo() {
  return (
    <MainContainer>
    <View style={styles.header}>
     <Text style={styles.text}>Budget Plan</Text>
    </View>
    
    <BigText content='Plan'/>
   <Divider/>
    <View style={styles.content}>
    <Text>Content</Text>
    </View>
    <BigText content='Plan'/>
    <Divider/>
    <View style={styles.content}>
    <Text>Content</Text>
    </View>
    <BigText content='Plan'/>
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
