import React from 'react'
import { Stack } from 'expo-router'
import { ActivityIndicator, Text, View } from 'react-native';
import loadDatabase from '@/context/db';


const _layout = () => {
  const [ isDbLoaded, setDbLoaded ] = React.useState<boolean>(false);
  // Load the database on initial load
  React.useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);

  // Show error screen if there is a loading error
  if (!isDbLoaded) {
    return (
      <View>
        
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
      <Stack>
        <Stack.Screen name="home" options={{headerShown: false}}/>
      </Stack>
    </React.Suspense>
  )
}

export default _layout