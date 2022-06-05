import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import PlaceItem from './PlaceItem';
import {useNavigation} from '@react-navigation/native';

export default function ({places}) {
  const navigation = useNavigation();

  return places.length > 0 ? (
    <FlatList
      data={places}
      style={styles.list}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <PlaceItem
          place={item}
          onSelect={() =>
            navigation.navigate('PlaceDetail', {placeId: item.id})
          }
        />
      )}
    />
  ) : (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>
        No places added yet - start adding some!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    margin: 24,
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
