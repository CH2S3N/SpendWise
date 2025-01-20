import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
},
container: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  paddingHorizontal: 20,
},
text: {
  fontSize: 10,
},
title: {
  fontWeight: 'bold',
  fontSize: 15,
},
subTitle: {
  fontSize: 10,
},
item: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
itemA: {
  justifyContent: 'center',
  alignItems: 'center'
},
description: {
  flex: 1,
  alignItems: 'flex-start'
},
dvd:{
  marginHorizontal: 30
}
})

export default styles;