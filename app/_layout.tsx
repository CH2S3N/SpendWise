import { SQLiteProvider } from 'expo-sqlite';
import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import loadDatabase from '@/context/db';
import { ActivityIndicator } from 'react-native-paper';
import { Text, View } from 'react-native';

export default function RootLayout() {
    const [ isDbLoaded, setDbLoaded ] = React.useState<boolean>(false);
  
    // Load the database on initial load
    React.useEffect(() => {
      loadDatabase()
        .then(() => setDbLoaded(true))
        .catch((e) => console.error(e));
    }, []);

      // Show loading screen until database is loaded
      if (!isDbLoaded) {
        return (
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
            <Text>Loading Database...</Text>
          </View>
        );
      }
  return (
      <Provider store={store}>
        <SQLiteProvider databaseName="mySQLiteDB.db" useSuspense>
          <Stack>
            <Stack.Screen name="screens" options={{ headerShown: false }} />
          </Stack>
        </SQLiteProvider>
      </Provider>
  );
}
