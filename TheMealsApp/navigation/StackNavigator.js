import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import FavoriteScreen from '../screens/FavoriteScreen';
import FiltersScreen from '../screens/FiltersScreen';
import {useDispatch} from 'react-redux';
import {toggleFavorite} from '../store/actions/meals';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  const dispatch = useDispatch();

  const toggleFavoriteHandler = id => {
    dispatch(toggleFavorite(id));
  };

  return (
    <Stack.Navigator
      screenOptions={{headerTitleStyle: {fontFamily: 'OpenSans-Regular'}}}>
      <Stack.Screen
        options={({navigation}) => ({
          title: 'Meal Categories',
          headerTintColor: Colors.accentColor,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}
              style={{marginLeft: 20}}>
              <Icon size={18} name="bars" color={Colors.accentColor} />
            </TouchableOpacity>
          ),
        })}
        name="CategoriesScreen"
        component={CategoriesScreen}
      />
      <Stack.Screen
        options={({route, navigation}) => ({
          title: route.params.categoryTitle,
          headerTintColor: Colors.accentColor,
        })}
        name="CategoryMealsScreen"
        component={CategoryMealsScreen}
      />
      <Stack.Screen
        options={({route, navigation}) => ({
          title: route.params.title,
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={toggleFavoriteHandler.bind(this, route.params.id)}>
              <Icon
                name="star"
                solid={route.params.isFavorite}
                size={15}
                color={Colors.accentColor}
              />
            </TouchableOpacity>
          ),
          headerTintColor: Colors.accentColor,
        })}
        name="MealDetailScreen"
        component={MealDetailScreen}
      />
    </Stack.Navigator>
  );
};

export const FavoriteStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{headerTitleStyle: {fontFamily: 'OpenSans-Regular'}}}>
    <Stack.Screen
      name="Favorite"
      options={({navigation}) => ({
        headerTintColor: Colors.accentColor,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
            style={{marginLeft: 20}}>
            <Icon size={18} name="bars" color={Colors.accentColor} />
          </TouchableOpacity>
        ),
      })}
      component={FavoriteScreen}
    />
  </Stack.Navigator>
);

export const FilterStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{headerTitleStyle: {fontFamily: 'OpenSans-Regular'}}}>
    <Stack.Screen
      name="Filter"
      component={FiltersScreen}
      options={({navigation, route}) => ({
        headerTintColor: Colors.accentColor,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
            style={{marginLeft: 20}}>
            <Icon size={18} name="bars" color={Colors.accentColor} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => route.params.save()}>
            <Icon size={18} name="save" color={Colors.accentColor} solid />
          </TouchableOpacity>
        ),
      })}
    />
  </Stack.Navigator>
);
