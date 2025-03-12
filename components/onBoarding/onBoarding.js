import { FlatList, StyleSheet, View, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import slides from './slides';
import OnBoardingItem from './onBoardingItem';
import Paginator from './Paginator';
import NextButton from './NextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setViewedOnboarding } from '@/state/dataSlice';
import { useDispatch } from 'react-redux';

const OnBoarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  const dispatch = useDispatch();
  
  
  const viewableItemChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await AsyncStorage.setItem('@viewedOnboarding', 'true');
        dispatch(setViewedOnboarding(true))
        console.log('Onboarding Viewed');
      } catch (err) {
        console.log('Error @setItem:', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <FlatList
          data={slides}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OnBoardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={{ flex: .9, justifyContent: 'center', alignItems: 'center' }}>
        <Paginator data={slides} scrollX={scrollX} />
        <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
