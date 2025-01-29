import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native';
import loadDatabase from '@/context/db';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { useFetchData } from '@/hooks/useFetchData';


const _layout = () => {
  const [ isDbLoaded, setDbLoaded ] = React.useState<boolean>(false);
  // Load the database on initial load
  React.useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);

  const { fetchData } = useFetchData();
  useEffect(() => {
    fetchData();
  }, []); 

  // Show error screen if there is a loading error
  if (!isDbLoaded) {
    return (
      <View>
         <Text>Loading Database Error!</Text>
      </View>
    );
  }

  // Show loading screen until database is loaded
  if (!isDbLoaded) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Loading Database...</Text>
      </View>
    );
  }

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
        <Drawer
           screenOptions={{
            drawerStyle: {
              backgroundColor: colors.dark, 
            },
            drawerInactiveTintColor: colors.light,
            drawerActiveTintColor: colors.dark,
            drawerActiveBackgroundColor: colors.light,
           
          }}
        >
          <Drawer.Screen 
            name='home' 
            options={{
              drawerLabel: 'Home',
              headerTitle: ' SpendWise',
              drawerIcon: ({size, color,}) => (
                <Ionicons name='home-outline' size={size} color={color}/>
              ),
              headerStyle: {
                backgroundColor: colors.dark, 
              },
              headerTintColor: colors.light,
            }}
          />
          <Drawer.Screen 
            name='profile' 
            options={{
              drawerLabel: 'Profile',
              headerTitle: ' Profile',
              drawerIcon: ({size, color,}) => (
                <Ionicons name='person-outline' size={size} color={color}/>
              ),
              headerStyle: {
                backgroundColor: colors.dark, 
              },
              headerTintColor: colors.light,
            }}
          />
          <Drawer.Screen 
            name='settings' 
            options={{
              drawerLabel: 'Settings',
              headerTitle: ' Settings',
              drawerIcon: ({size, color,}) => (
                <Ionicons name='settings-outline' size={size} color={color}/>
              ),
              headerStyle: {
                backgroundColor: colors.dark, 
              },
              headerTintColor: colors.light,
            }}
          />
        </Drawer>
      </GestureHandlerRootView>

    </React.Suspense>
  )
}

export default _layout