import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Linking,
  Platform,
  PermissionsAndroid,
  Image,
  ToastAndroid,
  Text,
} from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';
import {Colors} from '../../constants/colors';
import Geolocation from 'react-native-geolocation-service';
import {getMapPreview, getAddress} from '../../util/location';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';

export default function ({onPickLocation}) {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocussed = useIsFocused();
  const [pickedLocation, setPickedLocation] = useState(null);
  const [imagePickedLocation, setImagePickedLocation] = useState(null);
  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };

    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(`Turn on Location Services to get your location.`, '', [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ]);
    }

    return false;
  };
  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };
  const getLocationHandler = async () => {
    const hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
      ({coords}) => {
        const coordinates = {lat: coords.latitude, lng: coords.longitude};
        setPickedLocation(coordinates);
        setImagePickedLocation(getMapPreview(...Object.values(coordinates)));
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  useEffect(() => {
    if (isFocussed && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };

      setPickedLocation(mapPickedLocation);
      setImagePickedLocation(
        getMapPreview(...Object.values(mapPickedLocation)),
      );
    }
  }, [route, isFocussed]);
  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(...Object.values(pickedLocation));
        onPickLocation({...pickedLocation, address});
      }
    };
    handleLocation();
  }, [pickedLocation, onPickLocation]);

  return (
    <View>
      <View style={styles.mapPreview}>
        {imagePickedLocation ? (
          <Image style={styles.image} source={{uri: imagePickedLocation}} />
        ) : (
          <Text>No location picked</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
