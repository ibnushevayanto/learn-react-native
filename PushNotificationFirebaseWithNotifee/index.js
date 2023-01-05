/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {createLocalNotification} from './src/utils/pushNotificationsHelper';
import notifee from '@notifee/react-native';

notifee.onBackgroundEvent(event => {
  console.log(event);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  createLocalNotification(
    remoteMessage.notification.title,
    remoteMessage.notification.body,
  );
});

AppRegistry.registerComponent(appName, () => App);
