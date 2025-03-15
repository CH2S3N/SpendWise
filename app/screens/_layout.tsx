import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFetchData } from '@/hooks/useFetchData';
import { colors } from '@/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoarding from '@/components/onBoarding/onBoarding';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setHasName, setViewedOnboarding, setWelcomed } from '@/state/dataSlice';
import { Image } from 'react-native';
import { setBudgetStratSplit } from '@/state/dataSlice'
import { UseTransactionService } from '@/hooks/editData/TransactionService';
import { Modal } from '@/components/Modal';
import { setUsername } from '@/state/userSlice';

const _layout = () => {
  const { fetchData } = useFetchData();
  const dispatch = useDispatch();
    const { updateUser } = UseTransactionService(); 
  
  const { viewed, nameSetted, welcomed, user } = useSelector((state: RootState) => state.data);
  const [isSetUserModalVisible, setSetUserModalVisible] = useState(true);
  const [isWelcomeModalVisible, setWelcomeModalVisible] = useState(false);

  const firstUser = user?.[0];  
  const userName = firstUser?.userName || "";
  const userId = firstUser?.id ?? 1;
  const data = firstUser?.hasData ?? "False";

  const [input, setInput] = useState(userName);

  // load data
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch data
        await fetchData().catch((e) => console.error(e));
        
        // Check Onboarding
        // await AsyncStorage.removeItem('@viewedOnboarding');
        const onboardingVal = await AsyncStorage.getItem('@viewedOnboarding');
        if (onboardingVal !== null) {
          const parsedValue = JSON.parse(onboardingVal); 
          console.log('Onboarding Viewed: ', parsedValue);
          dispatch(setViewedOnboarding(parsedValue));
        }

        // Load StratSplit
        // await AsyncStorage.removeItem('stratSplitted');
        const stratVal = await AsyncStorage.getItem('stratSplitted');
        if (stratVal !== null) {
          const parsedValue = JSON.parse(stratVal);
          console.log('HasStratSplit: ', parsedValue);
          dispatch(setBudgetStratSplit(parsedValue));
        }
        // await AsyncStorage.removeItem('@hasNamesetted');
        const setNameVal = await AsyncStorage.getItem('@hasNamesetted');
        if (setNameVal !== null) {
          const parsedValue = JSON.parse(setNameVal);
          console.log('@hasNamesetted: ', parsedValue);
          dispatch(setHasName(parsedValue));
        }
        // await AsyncStorage.removeItem('@firstOpen');
        const firstOpenVal = await AsyncStorage.getItem('@firstOpen');
        if (firstOpenVal !== null) {
          const parsedValue = JSON.parse(firstOpenVal);
          console.log('@firstOpen: ', parsedValue);
          dispatch(setWelcomed(parsedValue));
        }


      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, []);


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


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    width: '80%',
    borderWidth:1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
  modalTitle:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  modalSubTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 3
  },
})