import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './navigation/TabNavigator';
import {FilterStackNavigator} from './navigation/StackNavigator';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import Colors from './constants/Colors';
import mealsReducer from './store/reducers/meals';

const Drawer = createDrawerNavigator();

const rootReducers = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducers);

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: Colors.accentColor,
            labelStyle: {fontFamily: 'OpenSans-Regular'},
          }}
          initialRouteName="Home">
          <Drawer.Screen name="Favorite" component={TabNavigator} />
          <Drawer.Screen name="Filters" component={FilterStackNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
