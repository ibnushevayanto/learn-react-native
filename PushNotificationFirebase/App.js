import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {
  requestUserPermission,
  NotificationListener,
  createLocalNotification,
} from './src/utils/pushNotificationsHelper';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

export default function () {
  const [token, settoken] = useState(null);

  NotificationListener();

  useEffect(() => {
    async function firstLoad() {
      // Create a channel (required for Android)
      await notifee.createChannel({
        id: 'rn-test-notification',
        name: 'TestNotificationApp',
        importance: AndroidImportance.HIGH,
      });

      const initialToken = await requestUserPermission();
      if (initialToken) {
        settoken(initialToken);
      }
    }

    firstLoad();

    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('user dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  return (
    <View style={styles.mainScreen}>
      <Text selectable style={{color: 'black'}}>
        {token || '-'}
      </Text>
      {/* <TextInput selectable>{token || '-'}</TextInput> */}
      <Button
        title="Send Notification"
        onPress={() =>
          createLocalNotification('local noti title', 'local noti body')
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
});
