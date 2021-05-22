import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import colors from '../constants/colors';

const MainButton = props => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <ButtonComponent activeOpacity={0.8} onPress={props.onClick}>
      <View
        style={[
          styles.button,
          props.type === 'warning' && styles.warningBtn,
          props.type === 'danger' && styles.dangerBtn,
          props.type === 'success' && styles.successBtn,
        ]}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </ButtonComponent>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.grey,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  warningBtn: {
    backgroundColor: colors.yellow,
  },
  dangerBtn: {
    backgroundColor: colors.red,
  },
  successBtn: {
    backgroundColor: colors.green,
  },
  buttonText: {
    fontFamily: 'OpenSans-Regular',
    color: 'white',
    width: '100%',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default MainButton;
