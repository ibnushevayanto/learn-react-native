import React, {useState, useLayoutEffect, useCallback, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, Alert} from 'react-native';
import IconButton from '../components/UI/IconButton';
import {useIsFocused} from '@react-navigation/native';

export default function ({navigation, route}) {
  const paramsSelectedLocation = route.params?.selectedLocation;
  const region = {
    latitude: paramsSelectedLocation ? paramsSelectedLocation.latitude : 37.78,
    longitude: paramsSelectedLocation
      ? paramsSelectedLocation.longitude
      : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const isFocussed = useIsFocused();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const selectLocationHandler = useCallback(
    event => {
      if (!paramsSelectedLocation) {
        const latitude = event.nativeEvent.coordinate.latitude;
        const longitude = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({
          latitude,
          longitude,
        });
      }
    },
    [paramsSelectedLocation],
  );
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.Alert(
        'No location picked!',
        'You have to pick a location (by tapping on the map) first!',
      );
      return;
    }
    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.latitude,
      pickedLng: selectedLocation.longitude,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (paramsSelectedLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, paramsSelectedLocation]);
  useEffect(() => {
    if (isFocussed) {
      if (paramsSelectedLocation) {
        setSelectedLocation(paramsSelectedLocation);
      }
    }
  }, [isFocussed, paramsSelectedLocation]);

  return (
    <MapView
      style={styles.map}
      onPress={selectLocationHandler}
      initialRegion={region}>
      {selectedLocation && (
        <Marker title="Picked Location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
