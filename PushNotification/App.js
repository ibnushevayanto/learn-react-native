import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {
  showNotification,
  handleScheduleNotification,
  handleCancel,
} from './notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('Name:', notification.data.userName);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
  {
    channelId: 'test-id', // (required)
    channelName: 'Test', // (required)
    channelDescription: 'A channel to categorise your notifications',
    playSound: true,
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  created => console.log(`createChannel returned '${created}'`),
);

export default function () {
  return (
    <View style={styles.screen}>
      <Button
        title="Click to get notification"
        style={styles.button}
        onPress={() => showNotification('Title', 'message')}
      />
      <Button
        title="Click to get notification after 5 second"
        style={styles.button}
        onPress={() => handleScheduleNotification('Title', 'message')}
      />
      <Button
        title="Click to cancel all notification"
        style={styles.button}
        onPress={handleCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 24,
  },
});
