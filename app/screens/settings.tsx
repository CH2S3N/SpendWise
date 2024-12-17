import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from '@rneui/base'
import MainContainer from '@/components/Containers/MainContainer';

const settings = () => {
   return (
      <MainContainer>
      <View style={styles.header}>
       <Text style={styles.text}>Setting</Text>
      </View>
     <Divider/>
      <View style={styles.content}>
      <Text>User settings</Text>
      </View>
      <Divider/>
      <View style={styles.content}>
      <Text>User settings</Text>
      </View>
      <Divider/>
      <View style={styles.content}>
      <Text>User settings</Text>
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
export default settings

