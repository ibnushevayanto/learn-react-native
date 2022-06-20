import PushNotification from '@react-native-community/push-notification-ios';

const showNotification = (title, message) => {
  PushNotification.addNotificationRequest({
    id: 'test-id',
    title,
    body: message,
    category: 'userAction',
    userInfo: {
      userName: 'ibnu',
    },
  });
};

const handleScheduleNotification = (title, message) => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + 5);

  PushNotification.addNotificationRequest({
    title,
    body: message,
    id: 'test-id',
    fireDate: date,
    userInfo: {
      userName: 'ibnu',
    },
  });
};

const handleCancel = () => {
  PushNotification.removeAllDeliveredNotifications();
};

export {showNotification, handleScheduleNotification, handleCancel};
