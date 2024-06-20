import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight,TouchableOpacity,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import HomeDetailScreen from './src/screens/HomeDetailScreen';
import SettingScreen from './src/screens/SettingScreen';
import SettingDetailScreen from './src/screens/SettingDetailScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './src/stylesheets/styles'

import configureStore from './src/redux/store'
import {StoreContext} from 'redux-react-hook'

//全域變數
const store = configureStore()
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyHome(){

  return(
      <Stack.Navigator
        initialRouteName='HomeScreen'
        screenOptions={{
          headerStyle:{backgroundColor:'tomato'},
          headerTintColor:'white',
          headerBackTitle:'返回'
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HomeDetailScreen" component={HomeDetailScreen} />
      </Stack.Navigator>

  )
}

function MySetting(){
  return(

      <Stack.Navigator
        initialRouteName='SettingScreen'
        screenOptions={{
          headerStyle:{backgroundColor:'tomato'},
          headerTintColor:'white',
          headerBackTitle:'返回2'
        }}
      >
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="SettingDetailScreen" component={SettingDetailScreen} />
      </Stack.Navigator>

  )
}

function App() {
  //渲染
  return (
    <NavigationContainer>

      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused? 'information-circle': 'information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'list' : 'options';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}
      >
        <Tab.Screen name="Home" component={MyHome} />
        <Tab.Screen name="Settings" component={MySetting} />
      </Tab.Navigator>

    </NavigationContainer>
  );
}

export default function MyNewApp(){
  return(
    //StoreContext是redux功能
    <StoreContext.Provider value={store}>
      <App/>
    </StoreContext.Provider>
  )
}