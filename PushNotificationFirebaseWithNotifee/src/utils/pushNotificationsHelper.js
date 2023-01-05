import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';

export async function getFCMToken() {
  let fcmToken = await AsyncStorage.getItem('fcm_token');

  if (!fcmToken) {
    try {
      const token = await messaging().getToken();

      if (token) {
        await AsyncStorage.setItem('fcm_token', token);
        return token;
      }
    } catch (error) {
      console.log(error, 'error brooo');
      return false;
    }
  } else {
    return fcmToken;
  }
}

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission({
    provisional: true,
  });
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    const token = await getFCMToken();
    return token;
  } else {
    return false;
  }
}

export async function createLocalNotification(title, body) {
  // Display a notification
  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: 'rn-test-notification',
      sound: 'default',
    },
    ios: {
      sound: 'default',
    },
  });
}

export function NotificationListener() {
  // Event saat klik notifikasi di top bar hp
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    createLocalNotification(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
    );
  });
}
