import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput, TouchableWithoutFeedback, Animated } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tabs, useFocusEffect } from 'expo-router';
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
  const [isWelcomeModalVisible, setWelcomeModalVisible] = useState(false);
  const [isUserModalVisible, setUserModalVisible] = useState(false);

  const firstUser = user?.[0];  
  const userName = firstUser?.userName || "";
  const userId = firstUser?.id ?? 1;
  const data = firstUser?.hasData ?? "False";

  const [input, setInput] = useState(userName);

  // load data
  useEffect(() => { 
    const initializeData = async () => {
      try {
        //  fetching data and AsyncStorage calls
        fetchData();
        // await AsyncStorage.removeItem('@viewedOnboarding');
        // await AsyncStorage.removeItem('stratSplitted');
        // await AsyncStorage.removeItem('@hasNamesetted');
        // await AsyncStorage.removeItem('@firstOpen');

        // await AsyncStorage.setItem('@viewedOnboarding', 'false');
        // await AsyncStorage.setItem('stratSplitted', 'false');
        // await AsyncStorage.setItem('@hasNamesetted', 'false');
        // await AsyncStorage.setItem('@firstOpen', 'true');
        const [onboardingVal, stratVal, setNameVal, firstOpenVal] = await Promise.all([

          
          AsyncStorage.getItem('@viewedOnboarding'),
          AsyncStorage.getItem('stratSplitted'),
          AsyncStorage.getItem('@hasNamesetted'),
          AsyncStorage.getItem('@firstOpen'),
        ]);
  

        // Process AsyncStorage values
        if (onboardingVal !== null) {
          const parsedValue = JSON.parse(onboardingVal);
          console.log('Onboarding Viewed: ', parsedValue);
          dispatch(setViewedOnboarding(parsedValue));
        }
  
        if (stratVal !== null) {
          const parsedValue = JSON.parse(stratVal);
          console.log('HasStratSplit: ', parsedValue);
          dispatch(setBudgetStratSplit(parsedValue));
        }
  
        if (setNameVal !== null) {
          const parsedValue = JSON.parse(setNameVal);
          console.log('@hasNamesetted: ', parsedValue);
          dispatch(setHasName(parsedValue));
        }
  
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

  useEffect(() => {
    setUserModalVisible(!nameSetted && viewed);
    setWelcomeModalVisible(nameSetted && viewed);
  }, [nameSetted, viewed]);

  async function handleUpdateUser() {
    try {
      await updateUser({
        id: userId,
        userName: input,
        hasData: data,
      });
      await AsyncStorage.multiSet([
        ['@hasNamesetted', 'true'],
        ['@firstOpen', 'false']
      ]);
      dispatch(setHasName(true))
      dispatch(setWelcomed(true));
      console.log("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }
  function validateFields() {
    if (!input || input.length < 3 )  {
      return false;
    }
    
    return true;
  }

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
            unmountOnBlur: true,
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
            // unmountOnBlur: true,
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
            unmountOnBlur: true,
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

      {/* Welcome Modal */}
      <Modal isOpen={isWelcomeModalVisible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => {
              setWelcomeModalVisible(false)
              
              }}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                  <View style={[styles.welcomeModalContent, {borderRadius:30}]}>
                    { welcomed === true  ? (
                      <>
                        <Image
                          source={require("./../../assets/images/onboardingImge/Spendwise.gif")} 
                          style={[styles.image, { width: '100%', resizeMode: 'cover' }]} 
                        />    
                        <View style={[styles.overlay, {bottom: 200}]}>
                          <Text style={[styles.Wtitle, {fontSize: 30, textAlign:'center', color: colors.green,}]}>Welcome {userName}! To</Text>
                        </View>                
                      </>
                    ):(
                      <>
                        
                          <Image
                            source={require('./../../assets/images/WelcomeBack.gif')}
                            style={styles.image}
                          />
                          <View style={[styles.overlay, {top: 60}]}>
                            <Text style={styles.Wtitle}>{userName}</Text>
                          </View>
                      
                      </>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
      </Modal>
        

      <Modal isOpen={isUserModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
            <View style={[styles.welcomeModalContent, {borderRadius:15}]}>
              <Text style={[styles.title, {
                      fontSize: 20,
                      textAlign:'center',
                      color: colors.green, 
                      fontWeight: '900',    
                    }]}>Please set a Username</Text>
              <TextInput
              
                placeholder="Enter Username"
                style={[styles.modalSubTitle,{width: '80%', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: colors.green, textAlign: 'center', color: colors.green, fontSize: 20 }]}
                value={input}
                onChangeText={(txt)=>{
                  setInput(
                    txt
                      .toLowerCase()
                      .replace(/\b\w/g, (char) => char.toUpperCase())
                  )
                }}
                maxLength={12}
              />
              <TouchableOpacity 
              disabled={!validateFields()}
              onPress={() => {
                setInput(input)
                dispatch(setUsername(input));
                handleUpdateUser();
                setUserModalVisible(false)
                setWelcomeModalVisible(true);
                
              }}
              style={[
                styles.btn,
                (!validateFields()) && styles.disabledButton
              ]}
              >
                <Text style={{ color:colors.light}}>Save</Text>
              </TouchableOpacity>
            </View>
        </View>
      </Modal> 

      
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
  welcomeModalContent: {
    width: '80%',
    borderWidth:1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 200,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
  title:{
    fontSize: 20,
    fontWeight:'bold',
    textAlign: 'center'
    
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Wtitle: {
    fontSize: 40,
    color: colors.green,
    fontWeight: '900',
    textTransform: 'uppercase',
    textShadowColor: 'black', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 1, 
  }, 
  btn:{
    marginHorizontal: 10,
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    borderRadius: 45,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10
  },
  disabledButton: {
    backgroundColor: colors.green,
    opacity: .5
  },
})