import React from 'react'
import { Stack } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { ActivityIndicator, Text, View } from 'react-native';
import loadDatabase from '@/context/db';


const _layout = () => {
  const dispatch = useDispatch();
  const { isDbLoaded, loadingError } = useSelector((state: RootState) => state.db);

  // Load the database on initial load
  React.useEffect(() => {
    loadDatabase(dispatch);
  }, [dispatch]);

  // Show error screen if there is a loading error
  if (loadingError) {
    return (
      <View>
        <Text>Error loading database: {loadingError}</Text>
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