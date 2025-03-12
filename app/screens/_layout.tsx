import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFetchData } from '@/hooks/useFetchData';
import { colors } from '@/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoarding from '@/components/onBoarding/onBoarding';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setViewedOnboarding } from '@/state/dataSlice';
import { Image } from 'react-native';
import { setBudgetStratSplit } from '@/state/dataSlice'

const _layout = () => {
  const { fetchData } = useFetchData();
  const dispatch = useDispatch();
  const { viewed } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    fetchData().catch((e) => console.error(e));
  }, []);


    useEffect(() => {
        const loadStratSplit = async () => {
          try {
            const storedValue = await AsyncStorage.getItem('stratSplitted'); 
            if (storedValue !== null) {
              const parsedValue = JSON.parse(storedValue);
              setBudgetStratSplit(parsedValue);
              dispatch(setBudgetStratSplit(parsedValue)); 
              console.log('is Strat Splitted? ', parsedValue);
            }
          } catch (error) {
            console.error("Error loading stratSplit:", error);
          }
        };
        loadStratSplit();
      }, [dispatch]); 

    const checkOnboarding = async () => {
      // await AsyncStorage.removeItem('@viewedOnboarding');
      try {
        const value = await AsyncStorage.getItem('@viewedOnboarding');
        if (value !== null) {
          dispatch(setViewedOnboarding(true))
        }
      } catch (err) {
        console.log('Error @checkOnboarding:', err);
      }
    };


  useEffect(() => {
    checkOnboarding();

  }, [])

  useEffect(() => {
    console.log('viewed state updated:', viewed);
  }, [viewed]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {viewed === true ? (
        <Tabs
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: colors.background,
              height: 80,
            },
            headerTitle: () => (
              <Image
                source={require("./../../assets/images/Logo/Spendwise.gif")}
                style={{ width: 120, height: 40, resizeMode: 'cover' }}
                />
            ),

            tabBarStyle: {
              backgroundColor: colors.green,
              paddingBottom: 10,
              paddingTop: 10,
              height: 70,
              marginHorizontal: 10,
              borderRadius: 10,
              marginBottom: 10,
            },
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              
            },
            tabBarActiveTintColor: colors.light,
            tabBarInactiveTintColor: colors.light,
          }}
        >
          <Tabs.Screen
            name="goal"
            options={{
              title: 'GOALS',
              tabBarIcon: ({ color }) => <AntDesign name="plussquareo" size={24} color={color} />,
              tabBarLabel: ({ focused, color }) => (
                <Text style={{ fontSize: focused ? 15 : 10, fontWeight: 'bold', color }}>
                  GOALS
                </Text>
              ),

            }}
          />
          <Tabs.Screen
            name="dashboard"
            options={{
              title: 'TRANSACTIONS',
              tabBarIcon: ({ color }) => <AntDesign name="profile" size={24} color={color} />,
              tabBarLabel: ({ focused, color }) => (
                <Text style={{ fontSize: focused ? 15 : 10, fontWeight: 'bold', color }}>
                  TRANSACTIONS
                </Text>
              ),

            }}
          />
          <Tabs.Screen
            name="budget"
            options={{
              title: 'WALLET',
              tabBarIcon: ({ color }) => <AntDesign name="wallet" size={24} color={color} />,
              tabBarLabel: ({ focused, color }) => (
                <Text style={{ fontSize: focused ? 15 : 10, fontWeight: 'bold', color }}>
                  WALLET
                </Text>
              ),

            }}
          />
        </Tabs>
      ) : (
        <View style={{ flex: 1 }}>
          <OnBoarding />
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default _layout;
