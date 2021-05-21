import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = props => {
  return <View style={[styles.card, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 30,
    elevation: 8,
  },
});

export default Card;
