import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

// const Drawer = createDrawerNavigator();
const Bottom = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Bottom.Navigator
        initialRouteName="User"
        screenOptions={{
          headerStyle: {backgroundColor: '#3c0a6b'},
          headerTintColor: 'white',
          tabBarActiveTintColor: '#3c0a6b',
        }}>
        <Bottom.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            tabBarIcon: ({size, color}) => (
              <Ionicons size={size} color={color} name="home" />
            ),
          }}
        />
        <Bottom.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons size={size} color={color} name="person" />
            ),
          }}
        />
      </Bottom.Navigator>
      {/* <Drawer.Navigator
        initialRouteName="User"
        screenOptions={{
          headerStyle: {backgroundColor: '#3c0a6b'},
          headerTintColor: 'white',
          drawerActiveBackgroundColor: '#f0e1ff',
          drawerActiveTintColor: '#3c0a6b',
          drawerStyle: {backgroundColor: '#ccc'},
        }}>
        <Drawer.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            drawerLabel: 'Welcome Screen',
            drawerIcon: ({color, size}) => (
              <Ionicons size={size} color={color} name="home" />
            ),
          }}
        />
        <Drawer.Screen
          name="User"
          component={UserScreen}
          options={{
            drawerIcon: ({color, size}) => (
              <Ionicons size={size} color={color} name="person" />
            ),
          }}
        />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
}
