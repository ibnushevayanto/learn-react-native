import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

export default function () {
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 6.2088,
          longitude: 106.8456,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
