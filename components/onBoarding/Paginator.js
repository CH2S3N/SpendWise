import { StyleSheet, View, Animated, useWindowDimensions } from 'react-native';
import React from 'react';
import { colors } from '@/constants/colors';

const Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i.toString()}
            style={[styles.dot, { width: dotWidth, opacity }]}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', height: 30, justifyContent: 'center', alignItems: 'center' 
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.green,
    marginHorizontal: 8,
  },
});
