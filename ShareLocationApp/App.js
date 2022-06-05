import React, {useState, useEffect} from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlaces from './screens/AddPlaces';
import IconButton from './components/UI/IconButton';
import {Colors} from './constants/colors';
import {enableLatestRenderer} from 'react-native-maps';
import Map from './screens/Map';
import {init} from './util/databases';
import PlaceDetail from './screens/PlaceDetail';

enableLatestRenderer();
const Stack = createNativeStackNavigator();

export default function () {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  if (!dbInitialized) {
    return <ActivityIndicator size={24} />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {backgroundColor: Colors.gray700},
          }}>
          <Stack.Screen
            name="AllPlace"
            component={AllPlaces}
            options={({navigation}) => ({
              title: 'Your Favorite Places',
              headerRight: ({tintColor}) => (
                <IconButton
                  size={24}
                  onPress={() => navigation.navigate('AddPlace')}
                  color={tintColor}
                  icon="add"
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlaces}
            options={{
              title: 'Add a new place',
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
