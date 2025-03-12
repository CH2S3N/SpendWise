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
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: colors.dark,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.dark,
    paddingHorizontal: 30,
    textAlign: 'center',
    textAlignVertical: 'center'

  },
});
