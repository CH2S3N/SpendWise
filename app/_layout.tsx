import { SQLiteProvider } from 'expo-sqlite/next';
import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/state/store';

export default function RootLayout() {
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
