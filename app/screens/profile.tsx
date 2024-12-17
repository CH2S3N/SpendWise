import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Divider } from '@rneui/base';
import MainContainer from '@/components/Containers/MainContainer';


const profile = () => {
  return (
    <MainContainer>
    <View style={styles.header}>
     <Text style={styles.text}>User Profile</Text>
    </View>
   <Divider/>
    <View style={styles.content}>
    <Text>User Information</Text>
    </View>
    <Divider/>
    <View style={styles.content}>
    <Text>User Information</Text>
    </View>
    <Divider/>
    <View style={styles.content}>
    <Text>User Information</Text>
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

export default profile

