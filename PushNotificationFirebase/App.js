import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  requestUserPermission,
  NotificationListener,
} from './utils/notificationServices';

export default function () {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const firstLoad = async () => {
      const initialToken = await requestUserPermission();
      console.log(initialToken);
      setToken(initialToken);
    };
    firstLoad();
    NotificationListener();
  }, []);

  return (
    <View style={styles.mainScreen}>
      <Text selectable>{token || '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
