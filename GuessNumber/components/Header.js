import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DefaultStyles from '../constants/defaultStyles';

const Header = props => (
  <View style={styles.header}>
    <Text style={[DefaultStyles.whiteText, {fontSize: 18}]}>{props.title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    paddingBottom: 20,
    elevation: 12,
    justifyContent: 'flex-end',
  },
});

export default Header;
