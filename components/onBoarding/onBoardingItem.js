import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { colors } from '@/constants/colors';

const OnBoardingItem = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 10,
    color: colors.green,
    textAlign: 'center',
    textShadowColor: 'black', 
    textShadowOffset: { width: .5, height: .5 }, 
    textShadowRadius: .5, 
  },
  description: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.green,
    paddingHorizontal: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    // textShadowColor: 'black', 
    // textShadowOffset: { width: .5, height: .5 }, 
    // textShadowRadius: 1, 
  },
});
