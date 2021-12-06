import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/styles';

const Header = props => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}>
      <Text style={{...DefaultStyles.title, ...styles.headerTitle}}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: Platform.OS === 'ios' ? Colors.primary : '#ffb246',
  },
  headerAndroid: {
    backgroundColor: Platform.OS === 'ios' ? Colors.primary : '#ffb246',
  },
  headerTitle: {
    color: 'white',
  },
});

export default Header;
