import React from 'react';
import {StyleSheet, Text} from 'react-native';

const BodyText = props => (
  <Text style={{...styles.default, ...props.style}}>{props.children}</Text>
);

const styles = StyleSheet.create({
  default: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 14,
    color: '#40414f',
  },
});

export default BodyText;
