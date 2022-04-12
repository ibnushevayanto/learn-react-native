import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

export default function ({label, styleContainer, textInputConfig, isValid}) {
  return (
    <View style={[styles.inputContainer, styleContainer]}>
      <Text style={[styles.label, !isValid ? styles.invalidLabel : null]}>
        {label}
      </Text>
      <TextInput
        {...textInputConfig}
        style={[
          styles.input,
          textInputConfig && textInputConfig.multiline
            ? styles.inputMultiline
            : null,
          !isValid ? styles.invalidInput : null,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
