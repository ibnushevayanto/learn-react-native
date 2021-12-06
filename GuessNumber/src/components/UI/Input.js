import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = props => {
  return <TextInput {...props} style={{...style.input, ...props.style}} />;
};

const style = StyleSheet.create({
  input: {
    height: 30,
    padding: 0,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    fontFamily: 'NotoSans-Regular',
    marginVertical: 10,
  },
});

export default Input;
