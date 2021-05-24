import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackNavigator, FavoriteStackNavigator} from './StackNavigator';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const TabNavigator = props => (
  <Tab.Navigator tabBarOptions={{activeTintColor: Colors.accentColor}}>
    <Tab.Screen
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="utensils" color={color} size={15} />
        ),
      }}
      name="Meals"
      component={MainStackNavigator}
    />
    <Tab.Screen
      name="Favorite"
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="star" color={color} size={15} solid />
        ),
      }}
      component={FavoriteStackNavigator}
    />
  </Tab.Navigator>
);

export default TabNavigator;
