import { Stack } from "expo-router";
import { SQLiteProvider} from 'expo-sqlite/next';
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import loadDatabase from './../context/db'


export default function RootLayout() {
  const [dbLoaded,setDbLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);

  // Loadin screen while database is loading
    if (!dbLoaded)
    return (
      <View>
        <ActivityIndicator size={"large"}/>
        <Text> Loading Database...</Text>
      </View>
    )

  return (
    <React.Suspense
    fallback={
      <View>
        <ActivityIndicator size={"large"}/>
        <Text> Loading Database...</Text>
      </View>
    }
    >
      <SQLiteProvider databaseName="mySQLiteDB.db" useSuspense>
        <Stack>
          <Stack.Screen name="(tabs)" 
            options={{
              headerShown: false,
            }}
            />
        </Stack>
      </SQLiteProvider>
    </React.Suspense>


  );
}
