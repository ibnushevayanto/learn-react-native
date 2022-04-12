import React, {useState} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import Input from './Input';
import Button from '../ui/Button';
import {GlobalStyles} from '../../constants/styles';

export default function ({
  navigation,
  confirmHandler,
  submittedButton,
  defaultValue,
}) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValue?.amount.toString() || '',
      isValid: true,
    },
    date: {
      value: defaultValue?.date.toISOString().slice(0, 10) || '',
      isValid: true,
    },
    description: {
      value: defaultValue?.description || '',
      isValid: true,
    },
  });
  const validateForm = () => {
    const expensesData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid =
      !isNaN(expensesData.amount) && expensesData.amount > 0;
    const dateIsValid = expensesData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expensesData.description.trim().length > 0;

    setInputValues(prevState => ({
      amount: {
        value: prevState.amount.value,
        isValid: amountIsValid,
      },
      date: {
        value: prevState.date.value,
        isValid: dateIsValid,
      },
      description: {
        value: prevState.description.value,
        isValid: descriptionIsValid,
      },
    }));

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      return false;
    } else {
      return expensesData;
    }
  };

  const inputChangeHandler = (props, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [props]: {value: value, isValid: prevState[props].isValid},
    }));
  };
  const submitHandler = () => {
    const expensesData = validateForm();

    if (expensesData) {
      confirmHandler(expensesData);
    } else {
      Alert.alert('Invalid input', 'Please check your input values');
      return;
    }
  };

  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>Your Expenses</Text>
        <View style={styles.inputsRow}>
          <Input
            label="Amount"
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: inputChangeHandler.bind(this, 'amount'),
              value: inputValues.amount.value,
            }}
            isValid={inputValues.amount.isValid}
            styleContainer={styles.growed}
          />
          <Input
            label="Date"
            textInputConfig={{
              placeholder: 'YYYY-MM-DD',
              maxLength: 10,
              onChangeText: inputChangeHandler.bind(this, 'date'),
              value: inputValues.date.value,
            }}
            isValid={inputValues.date.isValid}
            styleContainer={styles.growed}
          />
        </View>
        <Input
          label="Description"
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputValues.description.value,
          }}
          isValid={inputValues.description.isValid}
        />
      </View>
      {}
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          mode="flat"
          onPress={() => {
            navigation.goBack();
          }}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submittedButton}
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  growed: {
    flex: 1,
  },
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
