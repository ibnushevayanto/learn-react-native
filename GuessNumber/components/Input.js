import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const Input = props => {
  return <TextInput {...props} style={{...styles.input, ...props.style}} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#acacac',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontFamily: 'OpenSans-Regular',
  },
});

export default Input;
