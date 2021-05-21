import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';

const MainButton = props => (
  <TouchableOpacity activeOpacity={0.8} onPress={props.onClick}>
    <View
      style={[
        styles.button,
        props.type === 'warning' && styles.warningBtn,
        props.type === 'danger' && styles.dangerBtn,
        props.type === 'success' && styles.successBtn,
      ]}>
      <Text style={styles.buttonText}>{props.children}</Text>
    </View>
  </TouchableOpacity>
);

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
