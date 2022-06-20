import PushNotification from 'react-native-push-notification';

const showNotification = (title, message) => {
  PushNotification.localNotification({
    title,
    message,
    channelId: 'test-id',
    data: {
        userName: 'ibnu'
    }
  });
};

const handleScheduleNotification = (title, message) => {
  PushNotification.localNotificationSchedule({
    title,
    message,
    channelId: 'test-id',
    date: new Date(Date.now() + 5 * 1000),
    data: {
        userName: 'ibnu'
    }
  });
};

const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {showNotification, handleScheduleNotification, handleCancel};
