import React, {useEffect, useState, useCallback, useLayoutEffect} from 'react';
import {ScrollView, Image, View, Text, StyleSheet} from 'react-native';
import OutlinedButton from '../components/UI/OutlinedButton';
import {Colors} from '../constants/colors';
import {useIsFocused} from '@react-navigation/native';
import {fetchDetailPlaces} from '../util/databases';

export default function ({route, navigation}) {
  const selectedPlaceId = route.params.placeId;
  const isFocussed = useIsFocused();
  const [dataSelected, setDataSelected] = useState(null);
  const showOnMapHandler = useCallback(() => {
    navigation.navigate('Map', {
      selectedLocation: {
        latitude: dataSelected?.lat,
        longitude: dataSelected?.lng,
      },
    });
  }, [dataSelected]);

  useEffect(() => {
    if (isFocussed) {
      fetchDetailPlaces(selectedPlaceId).then(res => {
        if (res?.length) {
          setDataSelected(res[0]);
        }
      });
    }
  }, [selectedPlaceId]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: dataSelected?.title || '-',
    });
  }, [dataSelected]);

  return (
    <ScrollView>
      {dataSelected && (
        <Image style={styles.image} source={{uri: dataSelected.imageUri}} />
      )}
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>
            {dataSelected?.address || 'Not Found'}
          </Text>
        </View>
        {dataSelected && (
          <OutlinedButton icon="map" onPress={showOnMapHandler}>
            View On Map
          </OutlinedButton>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
