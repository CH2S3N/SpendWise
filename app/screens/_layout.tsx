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

  // set Onboarding
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
                style={{ width: 200, height: 80, resizeMode: 'center'}}
                />
            ),

            tabBarStyle: {
              marginTop:2,
              borderWidth:1,
              backgroundColor: colors.green,
              paddingBottom: 10,
              paddingTop: 10,
              height: 70,
              borderTopWidth: 1,
              marginHorizontal: 10,
              borderRadius: 10,
              marginBottom: 10,
              justifyContent:'center',
              alignItems: 'center',
              borderColor: 'black',
            },
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              color: colors.dark,
              textShadowColor: 'black', 
              textShadowOffset: { width: 1, height: 1 }, 
              textShadowRadius: .1, 
              
            },
            tabBarActiveTintColor: colors.light,
            tabBarInactiveTintColor: colors.light,
          }}
        >
          <Tabs.Screen
            name="goal"
            options={{
              title: 'GOALS',
              tabBarIcon: ({ focused, color }) => <AntDesign name="plussquareo" size={focused ? 30:24} color={color} 
              style={{
                textShadowColor: 'black', 
                textShadowOffset: { width: .2, height: .2 }, 
                textShadowRadius: .2,
              }}
              />,
              tabBarLabel: ({ focused, color }) => (
                <Text style={{ 
                  fontSize: focused ? 15 : 13, fontWeight: 'bold', 
                  color,   
                  textShadowColor: 'black', 
                  textShadowOffset: { width:.5, height:.5 }, 
                  textShadowRadius:.5,  
                  }}>
                  GOALS
                </Text>
              ),

            }}
          />
          <Tabs.Screen
            name="dashboard"
            options={{
              title: 'TRANSACTIONS',
              tabBarIcon: ({ focused, color }) => <AntDesign name="profile" size={focused ? 30:24} color={color} 
              style={{
                textShadowColor: 'black', 
                textShadowOffset: { width: .2, height: .2 }, 
                textShadowRadius: .2,
              }}
              />,
              tabBarLabel: ({ focused, color }) => (
                <Text style={{ 
                  fontSize: focused ? 15 : 13, fontWeight: 'bold', 
                  color,   
                  textShadowColor: 'black', 
                  textShadowOffset: { width: .5, height: .5 }, 
                  textShadowRadius: .5,  
                  }}>
                  TRANSACTIONS
                </Text>
              ),
            }}
          />
          <Tabs.Screen
            name="budget"
            options={{
              title: 'WALLET',
              tabBarIcon: ({ focused, color }) => <AntDesign name="wallet" size={ focused ? 30:24} color={color} 
              style={{
                textShadowColor: 'black', 
                textShadowOffset: { width: .2, height: .2 }, 
                textShadowRadius: .2,
              }}
              />,
              tabBarLabel: ({ focused, color }) => (
                <Text style={{ 
                  fontSize: focused ? 15 : 13, fontWeight: 'bold', 
                  color,   
                  textShadowColor: 'black', 
                  textShadowOffset: { width: .5, height: .5 }, 
                  textShadowRadius: .5,  
                  }}>
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
