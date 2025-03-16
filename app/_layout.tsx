import { SQLiteProvider } from 'expo-sqlite';
import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import loadDatabase from '@/context/db';
import { ActivityIndicator } from 'react-native-paper';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colors } from '@/constants/colors';

export default function RootLayout() {
    const [ isDbLoaded, setDbLoaded ] = React.useState<boolean>(false);
    const { width } = useWindowDimensions();
  
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
            <Image source={require("@/assets/images/Loading.gif")} style={[styles.image, { width, resizeMode: 'contain' }]} />
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 10,
    color: colors.green,
    textAlign: 'center',
    textShadowColor: 'black', 
    textShadowOffset: { width: .5, height: .5 }, 
    textShadowRadius: .5, 
  }
});
