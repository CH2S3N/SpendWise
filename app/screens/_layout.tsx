import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';import { useFetchData } from '@/hooks/useFetchData';
import { colors } from '@/constants/colors';

const _layout = () => {
  const { fetchData } = useFetchData();

  // Load the database on initial load
  React.useEffect(() => {
    fetchData()
      .catch((e) => console.error(e));
  }, []);

  return (
    <React.Suspense
    fallback={
      <View>
        <ActivityIndicator size="large" />
        <Text>Loading Database...</Text>
      </View>
    }
    >
      <GestureHandlerRootView>
        <Tabs
              screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: { 
                  backgroundColor: colors.dark, 
                  height: 80,
                  borderBottomWidth: 2, 
                  elevation: 5, 
                },
                headerTitle: 'SpendWise',
                headerTintColor: 'white',
                headerTitleStyle: { 
                  fontWeight: 'bold',
                  fontSize: 18, 
                },
                
                tabBarStyle: { 
                  backgroundColor: colors.dark,
                  paddingBottom: 10,
                  paddingTop: 10,
                  height: 70,
                  marginHorizontal: 10,
                  borderRadius: 10,
                  marginBottom: 10
                
                }, 
                tabBarActiveTintColor: colors.green, 
                tabBarInactiveTintColor: 'white', 
              }}
        >
          <Tabs.Screen 
          name='goal' 
          
          options={{ 
            title: "GOALS",
            tabBarIcon: ({ color }) => <AntDesign name="plussquareo" size={24} color={color} />, 
          }}
          />
          <Tabs.Screen 
          name='dashboard' 
          options={{ title: "TRANSACTIONS",
            tabBarIcon: ({ color }) => <AntDesign name="profile" size={24} color={color} />,
          }}
          />
          <Tabs.Screen 
          name='budget' 
          options={{ title: "WALLET",
            tabBarIcon: ({ color }) => <AntDesign name="wallet" size={24} color={color} />,
          }}
          />
        </Tabs>
      </GestureHandlerRootView>

    </React.Suspense>
  )
}

export default _layout